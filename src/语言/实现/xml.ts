import * as vsc from '../../接口封装';
import { 补全码编码器 } from '../../码表';
import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    设置补全码(补全项: vsc.CompletionItem, 文本标签: string, 编码器: 补全码编码器) {
        补全项.filterText = 编码器.生成补全码(补全项.filterText || 文本标签);
    }

    constructor() {
        super();
        this.触发字符 = ['<', ' ', '"', "'", '/'];
        this.补全锚点配置 = {
            是否标识符字符: (字符) => /[a-zA-Z0-9_-]/.test(字符), // 属性名允许 - 和 _
            语法边界字符: new Set([
                '<',    // 标签名开始（<div）
                ' ',    // 标签内属性分隔（<div cla）
                '"',    // 属性值开始（class="）
                "'",    // 单引号属性值（class='）
                '/',    // 自闭合标签（<img /）
            ]),
            最大回退距离: 0,
        };
    }

}

export default new 语言实现();
