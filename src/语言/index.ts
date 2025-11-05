export interface 补全锚点配置 {
    /** 判断一个字符是否属于标识符（如变量名中的字符） */
    是否标识符字符: (字符: string) => boolean;

    /** 构成语法边界的字符集合（遇到这些符号可作为锚点参考） */
    语法边界字符: Set<string>;

    /** 是否支持模板字符串中的表达式（如 f-string、${}） */
    支持模板表达式?: boolean;

    /** 最大回退距离，防止向左扫描过远影响性能 */
    最大回退距离?: number;
}

export interface 语言 {
    补全锚点配置?: 补全锚点配置
}

export const 语言通用配置: 语言 = {
    补全锚点配置: {
        是否标识符字符: (字符) => /[a-zA-Z0-9_$\u4e00-\u9fa5]/.test(字符),
        语法边界字符: new Set(['.', ',', '(', '[', '{']),
        最大回退距离: 20
    }
};

import { html } from './html';
import { java } from './java';
import { javascript } from './javascript';
import { python } from './python';
import { typescript } from './typescript';

export const 语言配置表: { [key: string]: 语言 } = {
    html,
    java,
    javascript,
    python,
    typescript,
};
