import { 语言 } from '.';

export const javascript: 语言 = {
    补全锚点配置: undefined,    // 无需配置，js 语言服务器不做输入过滤（executeCompletionItemProvider 会返回所有补全候选项）

    // 补全锚点配置: {
    //     是否标识符字符: (字符) => /[a-zA-Z0-9_$]/.test(字符),
    //     语法边界字符: new Set(['.', ',', '(', '[', '{']),
    //     支持模板表达式: true,
    //     最大回退距离: 30
    // }
};
