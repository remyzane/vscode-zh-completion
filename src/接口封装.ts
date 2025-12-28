/** VSCode 接口封装 */
import * as vsc from 'vscode';
import { 语言基类, 语言配置表, 通用语言实现, 锚点配置T } from './语言';

export { window, workspace, languages, commands, TextDocument } from 'vscode';
export { Position, ExtensionContext, CancellationToken } from 'vscode';
export { CompletionContext, CompletionItem, CompletionList, CompletionItemLabel, CompletionItemKind } from 'vscode';

const outputChannel = vsc.window.createOutputChannel('中文代码补全');

export function log(msg: string) {
    outputChannel.appendLine(`[${new Date().toLocaleString()}] ${msg}`);
}

export function 获得输入值(): string {
    const 编辑器 = vsc.window.activeTextEditor;
    if (!编辑器) {
        return '';
    }
    const 光标位置 = 编辑器.selections[0].anchor;
    // log(`获得输入值基准点：line: ${光标位置.line}，character: ${光标位置.character}`)
    const 文件 = 编辑器.document;
    const 范围 = 文件.getWordRangeAtPosition(光标位置);
    if (范围 === null) {
        return '';
    }
    return 文件.getText(范围);
}

/**
 * 矫正补全锚点
 * c、c++、python 的语言服务器会根据输入过滤（要取得所有补全项，必须更改补全锚点位置）
 * 根据当前光标位置，智能推断最合适的“补全建议触发位置”
 * 策略：向左跳过当前标识符 → 检查是否紧邻语法边界 → 返回边界后或词首位置
 * @param 文档 当前编辑的文档
 * @param 位置 当前光标位置
 * @returns 推荐的补全锚点位置
 */
export function 矫正补全锚点(文档: vsc.TextDocument, 位置: vsc.Position): vsc.Position {
    const 行文本 = 文档.lineAt(位置.line).text;
    const 语言标识 = 文档.languageId;
    const 矫正前锚点 = 位置.character;
    // 获取该语言的补全锚点配置，若无则使用默认配置
    const 语言 = (语言配置表 as { [key: string]: 语言基类 })[语言标识] || 通用语言实现;
    const 配置 = 语言.补全锚点配置 as 锚点配置T;
    const 最大回退距离 = 配置.最大回退距离 || 20;
    let 当前索引 = 矫正前锚点 - 1; // 锚点所在位置为空光标，前一位才是最后字符所在位置
    let 已回退步数 = 0;
    // 步骤一：向左跳过所有属于“标识符”的字符（如变量名的一部分）
    while (当前索引 > 0 && 已回退步数 < 最大回退距离) {
        const 字符 = 行文本[当前索引];
        if (配置.是否标识符字符(字符)) {
            当前索引--;
            已回退步数++;
        } else {
            break;
        }
    }
    // 步骤二：检查当前位置前一个字符是否是语法边界
    if (当前索引 >= 0 && 语言.触发字符.includes(行文本[当前索引])) {
        // 跳过边界后的空白字符，定位到第一个有效字符
        let 矫正后锚点 = 当前索引 + 1;
        while (矫正后锚点 < 矫正前锚点 && /\s/.test(行文本[矫正后锚点])) {
            矫正后锚点++;
        }
        // log(`矫正补全锚点a：${矫正前锚点} -> ${矫正后锚点}`);
        return new vsc.Position(位置.line, 矫正后锚点);
    }
    // 步骤三：未找到语法边界，则返回当前标识符的起始位置
    const 矫正后锚点 = 当前索引 === 0 ? 0 : 当前索引 + 1;
    // log(`矫正补全锚点b：${矫正前锚点} -> ${矫正后锚点}`);
    return new vsc.Position(位置.line, 矫正后锚点);
}
