import { 语言T } from '.';

export const javascript: 语言T = {
    补全锚点配置: undefined,    // 无需配置，js 语言服务器不做输入过滤（executeCompletionItemProvider 会返回所有补全项）
    触发字符: [
        // '.', ':', ',', '(', '[', '{', '<', '=',
        '.',    // 成员访问（如 obj.）
        ':',    // 对象属性（{ key: ）、类型注解（TS: x: string）
        ',',    // 参数或对象/数组元素分隔（func(a, ) 或 { a, })
        '(',    // 函数调用（func(）
        '[',    // 索引或数组字面量（arr[ 或 [1, ]）
        '{',    // 对象字面量（{ key: ）
        '<',    // JSX 标签（<Comp）或泛型（func<T>）
        '=',    // 默认参数或解构赋值（{ a = 1 }）
    ],
};
