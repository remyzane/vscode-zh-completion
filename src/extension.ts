import * as vsc from './接口封装';
import { 专项补全器, 通用补全器, 通用补全器实现 } from './补全实现';
import { 语言T, 语言配置表, 已配置语言列表, 通用语言配置 } from './语言';
import { env } from './环境配置';

// 扩展激活时调用
export function activate(context: vsc.ExtensionContext) {
	try {
		vsc.log(`中文代码补全 ${JSON.stringify([...已配置语言列表])}`);
		for (const 语言 of 已配置语言列表) {
			vsc.log(`中文代码补全: 配置语言：${语言}, 触发字符：${(语言配置表 as { [key: string]: 语言T })[语言].触发字符}`);
			专项补全器(context, 语言, (语言配置表 as { [key: string]: 语言T })[语言].触发字符);
		}
		vsc.log(`中文代码补全: 配置语言：其他, 触发字符：${通用语言配置.触发字符}`);
		通用补全器(context);

		env.加载配置().then();
		// 当配置修改时刷新配置
		vsc.workspace.onDidChangeConfiguration(async () => {
			env.加载配置().then();
		});

		vsc.log('中文代码补全: 插件已启动');
	} catch (e) {
		console.error(e);
		vsc.window.showInformationMessage(`中文代码补全: 启动失败：` + e);
	}
}

// 扩展停用时调用
export function deactivate() { }
