import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    constructor() {
        super();
        this.触发字符 = [
            '<',    // 标签名开始（<div）
            ' ',    // 标签内属性分隔（<div cla）
            '"',    // 属性值开始（class="）
            "'",    // 单引号属性值（class='）
            '/',    // 自闭合标签（<img /）
        ];
        // this.补全锚点配置 = {
        //     是否标识符字符: (字符) => /[a-zA-Z0-9_-]/.test(字符), // 属性名允许 - 和 _
        //     补全锚点最大矫正距离: 0,
        // };
    }
}

export default new 语言实现();
