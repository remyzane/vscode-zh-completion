import * as vsc from 'vscode';
import { 补全码编码器, 载入编码器 } from './码表';

class Env {
    // 调用'获得系统补全'时会调用'提供补全'函数, 这会导致无限循环，为了避免此问题，添加此变量用于标识
    public 获得系统补全中: boolean = false;

    public 编码器!: 补全码编码器;

    // 配置项
    public 输入习惯!: string; // 用户习惯的输入法

    async 加载配置() {
        this.输入习惯 = vsc.workspace.getConfiguration('中文代码补全').get('输入习惯') as string;
        this.编码器 = await 载入编码器(this.输入习惯);
    }
}

export const env = new Env();
