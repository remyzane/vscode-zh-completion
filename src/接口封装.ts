/** VSCode 接口封装 */
import * as vsc from 'vscode';
// import { 语言基类, 语言配置表, 通用语言实现, 锚点配置T } from './语言';
// import { 语言基类, 语言配置表, 通用语言实现 } from './语言';

export { CancellationToken, commands, CompletionContext, CompletionItem, CompletionItemKind, CompletionList, ExtensionContext, ExtensionMode, languages, Position, TextDocument, window, workspace } from 'vscode';

const outputChannel = vsc.window.createOutputChannel('中文代码补全');

/** 开发【调试控制台】输出（用户不可见，也不占用用户内存）  */
export function 输出给开发(message?: any, ...optionalParams: any[]) {
    console.debug(`[${new Date().toLocaleString()}] ${message}`, ...optionalParams);
}

/** 用户【输出】面板输出（用户可见，会少量占用用户内存） */
export function 输出给用户(msg: string, args?: { 显示输出面板: boolean }) {
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
