import * as vsc from '../../接口封装';
import { 补全码编码器 } from '../../码表';
import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    // 设置补全码(补全项: vsc.CompletionItem, 编码器: 补全码编码器) {
    //     补全项.filterText = 编码器.生成补全码(补全项.filterText);
    // }

    constructor() {
        super();
        this.无需矫正补全锚点 = true;
        this.触发字符 = [
            '<',    // 开始标签（如 <学生>）或闭合标签起始（</）
            '/',    // 闭合标签中的斜杠（输入 </ 后触发可闭合标签补全）
            ':',    // 命名空间分隔符（如 ns:element，触发该命名空间下的元素建议）
            '=',    // 属性赋值（如 lang=，若 XSD 定义了枚举值可触发值补全）
            ' ',    // 属性分隔符（在标签内输入空格后可能触发新属性建议）
            '\n',   // 换行（在标签内部换行后可能触发子元素补全）
            '\r',   // 回车（兼容 Windows 换行，作用同 \n）
        ];
    }

}

export default new 语言实现();
