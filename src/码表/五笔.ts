import * as vsc from '../接口封装';
import { 补全码编码器 } from '.';

export abstract class 五笔编码器 extends 补全码编码器 {
    // unicode码表 19968 ~ 40869 所有汉字的五笔首笔画代码
    abstract 码表: string;

    生成补全码(补全项: vsc.CompletionItem) {
        const 补全项文本 = 补全项.label.toString();
        const 补全码组: string[] = [];

        if (补全项文本.length > 4) {
            this.生成短句码(补全项文本, 补全码组);    // 声笔简码：最长4位，1、2、3 + 最后一位
        } else {
            for (let i = 0; i < 补全项文本.length; i++) {
                let unicode = 补全项文本.charCodeAt(i);
                let char = 补全项文本.charAt(i);
                if (unicode >= 19968 && unicode <= 40869) {
                    char = this.码表.charAt(unicode - 19968);
                }
                补全码组.push(char);
            }
        }
        const 补全码 = 补全码组.join("");
        补全项.filterText = 补全码;
        补全项.insertText = 补全项文本;
    }

    生成短句码(补全项文本: string, 补全码组: string[]) {
        // 长度大于4时，取：1、2、3 + 最后一位
        let 汉字位数 = 0;
        let 最后一位汉字: string | undefined;

        for (let i = 0; i < 补全项文本.length; i++) {
            let unicode = 补全项文本.charCodeAt(i);
            let char = 补全项文本.charAt(i);
            if (unicode >= 19968 && unicode <= 40869) {
                char = this.码表.charAt(unicode - 19968);
                汉字位数 += 1;
                if (汉字位数 < 4) {
                    补全码组.push(char);
                } else {
                    最后一位汉字 = char;
                }
            } else {
                汉字位数 = 0;
                if (最后一位汉字) {
                    补全码组.push(最后一位汉字);
                    最后一位汉字 = undefined;
                }
                补全码组.push(char);
            }
        }
        if (最后一位汉字) {
            补全码组.push(最后一位汉字);
        }
    }
}
