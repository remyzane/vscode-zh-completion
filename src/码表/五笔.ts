import * as vsc from '../接口封装';
import { 补全码编码器 } from '.';

export abstract class 五笔编码器 extends 补全码编码器 {
    // unicode码表 19968 ~ 40869 所有汉字的五笔首笔画代码
    abstract 码表: string;

    生成补全码(中文内容: string): string {
        let 补全码组: string[];

        if (中文内容.length > 4) {
            补全码组 = this.生成短句码组(中文内容);    // 声笔简码：最长4位，1、2、3 + 最后一位
        } else {
            补全码组 = [];
            for (let i = 0; i < 中文内容.length; i++) {
                let unicode = 中文内容.charCodeAt(i);
                let char = 中文内容.charAt(i);
                if (unicode >= 19968 && unicode <= 40869) {
                    char = this.码表.charAt(unicode - 19968);
                }
                补全码组.push(char);
            }
        }
        return 补全码组.join("");
        // return 中文内容;
    }

    生成短句码组(中文内容: string): string[] {
        // 长度大于4时，取：1、2、3 + 最后一位
        let 汉字位数 = 0;
        let 最后一位汉字: string | undefined;
        const 补全码组: string[] = [];
        for (let i = 0; i < 中文内容.length; i++) {
            let unicode = 中文内容.charCodeAt(i);
            let char = 中文内容.charAt(i);
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
        return 补全码组;
    }
}
