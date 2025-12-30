import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    constructor() {
        super();
        this.触发字符 = [
            '.',    // 方法/字段（obj.method()）
            ':',    // 路径分隔（std::collections::）或类型注解（x: i32）
            '(',    // 函数调用（println!(）
            '[',    // 索引或数组（arr[）
            '{',    // 块或结构体（S { field: ）
            ',',    // 参数或元组/结构体字段分隔
            '<',    // 泛型（Vec<T>）
            ' ',    // 计算、赋值或箭头（如 x * y = z、 x = 1 或 () -> x）
        ];
        // this.补全锚点配置 = {
        //     是否标识符字符: (字符) => /[a-zA-Z0-9_]/.test(字符),
        // };
    }
}

export default new 语言实现();

