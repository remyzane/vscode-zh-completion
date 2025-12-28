import * as vsc from '../../接口封装';
import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    constructor() {
        super();
        this.无需矫正补全锚点 = true;
        this.触发字符 = [
            '.',    // 成员访问（如 obj.）
            ':',    // 对象属性（{ key: ）、类型注解（TS: x: string）
            ',',    // 参数或对象/数组元素分隔（func(a, ) 或 { a, })
            '(',    // 函数调用（func(）
            '[',    // 索引或数组字面量（arr[ 或 [1, ]）
            '{',    // 对象字面量（{ key: ）
            '<',    // JSX 标签（<Comp）或泛型（func<T>）
            '=',    // 默认参数或解构赋值（{ a = 1 }）
        ];
    }
}

export default new 语言实现();
