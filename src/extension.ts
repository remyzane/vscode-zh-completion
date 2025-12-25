import * as vsc from './接口封装';
import { env } from './环境配置';

// 扩展激活时调用
export function activate(context: vsc.ExtensionContext) {
	try {
		vsc.log('中文代码补全');

		env.加载配置().then();
		vsc.workspace.onDidChangeConfiguration(async () => {
			env.加载配置().then();  // 当配置修改时刷新配置
		});

		env.注册语言(context);

		vsc.log('插件已启动');
	} catch (e) {
		console.error(e);
		vsc.window.showInformationMessage('启动失败：' + e);
	}
}

// 扩展停用时调用
export function deactivate() { }
