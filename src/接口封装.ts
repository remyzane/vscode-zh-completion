/** VSCode 接口封装 */
import * as vsc from 'vscode';
import { 语言T, 语言配置表, 通用语言配置, 补全锚点配置 } from './语言';

export * from 'vscode';

const outputChannel = vsc.window.createOutputChannel('中文代码补全');

export function log(msg: string) {
    outputChannel.appendLine(`[${new Date().toLocaleString()}] ${msg}`);
}

export async function 获得系统补全(
    document: vsc.TextDocument, position: vsc.Position
): Promise<vsc.CompletionList<vsc.CompletionItem>> {
    var 系统补全 = await vsc.commands.executeCommand<vsc.CompletionList>(
        'vscode.executeCompletionItemProvider',
        document.uri,
        position
        // 矫正补全锚点(document, position)
    );
    return 系统补全;
}

export function 获得输入值(): string {
    var 编辑器 = vsc.window.activeTextEditor;
    if (!编辑器) {
        return '';
    }
    var 光标位置 = 编辑器.selections[0].anchor;
    var 文件 = 编辑器.document;
    var 范围 = 文件.getWordRangeAtPosition(光标位置);
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
    log(`位置：${位置.line}, ${位置.character}`)
    const 行文本 = 文档.lineAt(位置.line).text;
    const 当前字符索引 = 位置.character;
    const 语言标识 = 文档.languageId;
    // ts、js 语言服务器不做输入过滤，无须更改补全锚点（executeCompletionItemProvider 会返回所有补全项）
    if (语言标识 === 'typescript' || 语言标识 === 'javascript') {
        return 位置;
    }
    // 获取该语言的补全锚点配置，若无则使用默认配置
    const 语言 = (语言配置表 as { [key: string]: 语言T })[语言标识];
    const 配置 = 语言.补全锚点配置 || (通用语言配置.补全锚点配置 as 补全锚点配置);
    log(`语言：${JSON.stringify(语言)}  `);
    log(`配置：${JSON.stringify(配置)}  `);
    /**
    [2025/11/9 01:18:02] 语言：{"补全锚点配置":{"语法边界字符":{},"最大回退距离":30},"触发字符":[".",":",",","(","[","{","="]}
    [2025/11/9 01:18:02] 配置：{"语法边界字符":{},"最大回退距离":30}
     */
    const 最大回退距离 = 配置.最大回退距离 || 20;
    let 当前索引 = 当前字符索引 - 1;
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
    if (当前索引 >= 0 && 配置.语法边界字符.has(行文本[当前索引])) {
        // 跳过边界后的空白字符，定位到第一个有效字符
        let 探测位置 = 当前索引 + 1;
        while (探测位置 < 当前字符索引 && /\s/.test(行文本[探测位置])) {
            探测位置++;
        }
        log(`矫正补全锚点后位置 x：${位置.line}, ${探测位置}`);
        return new vsc.Position(位置.line, 探测位置);
    }
    // 步骤三：未找到语法边界，则返回当前标识符的起始位置
    log(`矫正补全锚点后位置：${位置.line}, ${当前索引 + 1}`);
    return new vsc.Position(位置.line, 当前索引 + 1);
}
