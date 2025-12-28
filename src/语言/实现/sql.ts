import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    constructor() {
        super();
        this.触发字符 = [
            '.',    // 表字段引用（table.column）
            '(',    // 函数调用（COUNT(）
            ',',    // 参数或列分隔（SELECT col1, col2）
            '=',    // 条件等于（WHERE id = 1）
            '>',    // 大于比较（age > 18）
            '<',    // 小于比较（price < 100）
            '!',    // 不等于（!= 或 <>）
            '+',    // 加法运算
            '-',    // 减法运算
            '*',    // 乘法运算/通配符（SELECT * FROM）
            '/',    // 除法运算
            '%',    // 取模运算
            ' ',    // 空格分隔关键字
        ];
        // this.补全锚点配置 = {
        //     是否标识符字符: (字符) => /[a-zA-Z0-9_]/.test(字符),
        //     补全锚点最大矫正距离: 50,
        // };
    }
}

export default new 语言实现();
