import * as vsc from '../接口封装';
import { 补全码编码器 } from '.';

export class 编码器 extends 补全码编码器 {
    // unicode码表 19968 ~ 40869 所有汉字的五笔98版首笔画代码
    private 码表: string = "";

    配置(输入习惯: string) {
        this.输入习惯 = 输入习惯;
    };

    生成补全码(补全项: vsc.CompletionItem) {

    }
}

export default new 编码器();
