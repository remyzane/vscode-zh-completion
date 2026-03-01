import * as vsc from './接口封装';
import { 补全码编码器, 载入编码器 } from './码表';
import { 注册已知语言补全器, 注册未知语言补全器 } from './补全实现';
import { 已知语言, 已配置的语言, 语言基类, 语言配置表, 通用语言实现 } from './语言';

class Env {
    // 调用'获得系统补全'时会调用'提供补全'函数, 这会导致无限循环，为了避免此问题，添加此变量用于标识
    public 获得系统补全中: boolean = false;

    public 编码器!: 补全码编码器;

    public 语言实现: { [语言: string]: 语言基类 } = {};

    // 配置项
    public 输入习惯!: string; // 用户习惯的输入法

    async 加载配置() {
        this.输入习惯 = vsc.workspace.getConfiguration('中文代码补全').get('输入习惯') || '拼音';
        if (this.输入习惯 === '声笔简拼' || this.输入习惯 === '声笔简码') { // 兼容旧配置
            this.输入习惯 = '声笔';
        }
        this.编码器 = await 载入编码器(this.输入习惯);
    }

    注册语言(context: vsc.ExtensionContext) {
        for (const 语言 of 已配置的语言) {
            const 语言实现 = (语言配置表 as { [key: string]: 语言基类 })[语言];
            注册已知语言补全器(context, 语言, 语言实现.触发字符);
        }
        // 各语言单独注册，以便提高补全器等级（等级太低会被 VSCode 忽略）
        for (const 语言 of 已知语言) {
            if (!已配置的语言.has(语言)) {
                注册已知语言补全器(context, 语言, 通用语言实现.触发字符, true);
            }
        }
        注册未知语言补全器(context);
    }
}

export const env = new Env();
