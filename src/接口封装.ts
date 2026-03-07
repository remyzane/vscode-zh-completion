/** VSCode 接口封装 */
import * as vsc from 'vscode';
// import { 语言基类, 语言配置表, 通用语言实现, 锚点配置T } from './语言';
import { 语言基类, 语言配置表, 通用语言实现 } from './语言';

export { CancellationToken, commands, CompletionContext, CompletionItem, CompletionItemKind, CompletionList, ExtensionContext, languages, Position, TextDocument, window, workspace } from 'vscode';

// 如果超过这个距离，则不再向前搜索「触发字符」了
export const 补全锚点最大矫正距离 = 40;  // 正常 40 就足够了（一般都能在40个字母内筛选出候选）（如有需要可以调大，性能影响不大）

const outputChannel = vsc.window.createOutputChannel('中文代码补全');

/** 调试输出（调试控制台输出（开发环境））（用户不可见，不内存占用）  */
export function debug(message?: any, ...optionalParams: any[]) {
    console.debug(`[${new Date().toLocaleString()}] ${message}`, ...optionalParams);
}

/** 插件输出（用户可见，少量内存占用） */
export function 输出(msg: string, args?: { 显示输出面板: boolean }) {
    outputChannel.appendLine(`[${new Date().toLocaleString()}] ${msg}`);
    if (args?.显示输出面板) {
        outputChannel.show(true);
    }
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
    const 语言 = (语言配置表 as { [key: string]: 语言基类 })[语言标识] || 通用语言实现;

    let 当前索引 = 矫正前锚点 - 1; // 锚点所在位置为空光标，前一位才是最后字符所在位置
    let 已回退步数 = 0;

    while (当前索引 >= 0 && 已回退步数 < 补全锚点最大矫正距离) {
        const 字符 = 行文本[当前索引];
        if (语言.触发字符.includes(字符)) {
            // 找到触发字符，锚点移到其后
            let 矫正后锚点 = 当前索引 + 1;
            while (矫正后锚点 < 矫正前锚点 && /\s/.test(行文本[矫正后锚点])) {
                矫正后锚点++;
            }
            return new vsc.Position(位置.line, 矫正后锚点);
        }
        当前索引--;
        已回退步数++;
    }
    return new vsc.Position(位置.line, 矫正前锚点);
}
