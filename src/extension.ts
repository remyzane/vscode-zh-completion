import * as vsc from './接口封装';
import { 补全器实现 } from './补全实现';
import { env } from './环境配置';

// 扩展激活时调用
export function activate(context: vsc.ExtensionContext) {
	try {
		context.subscriptions.push(
			vsc.languages.registerCompletionItemProvider(
				[
					{ scheme: 'file', language: '*' },
					{ scheme: 'untitled', language: '*' },
					{ scheme: 'file', language: '*', notebookType: '*' },
					{ scheme: 'untitled', language: '*', notebookType: '*' },
				],
				{ provideCompletionItems: 补全器实现, resolveCompletionItem: () => null }
			)
		);
		env.加载配置();
		// 当配置修改时刷新配置
		vsc.workspace.onDidChangeConfiguration(async () => {
			env.加载配置();
		});
		vsc.log('中文代码补全: 插件已启动');
	} catch (e) {
		console.error(e);
		vsc.window.showInformationMessage(`中文代码补全: 启动失败：` + e);
	}
}

// 扩展停用时调用
export function deactivate() { }
