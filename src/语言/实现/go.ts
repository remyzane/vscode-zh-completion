import * as vsc from '../../接口封装';
import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    constructor() {
        super();
        this.触发字符 = [
            '.',    // 成员访问（最核心）（如 s.Field、pkg.Func、var.Method()）
            '(',    // 函数/方法调用（如 fmt.Println(）
            '[',    // 数组/切片/映射索引（如 arr[0]、slice[:]）、泛型类型参数（Go 1.18+）
            '{',    // 结构体/数组/切片/映射字面量、代码块（如 User{Name: "}、if {）
            ',',    // 参数、数组/映射元素、结构体字段分隔（如 func(a, )、[]int{1, }）
            ':',    // 结构体字段标签、switch case、类型断言（如 field:"json"、x.(string)）
            '`',    // 原始字符串字面量、结构体字段标签开始（如 `json:"name"`）
            '"',    // 字符串字面量、包导入路径（如 import "fmt"、str := "hello"）
            '=',    // 变量赋值、常量声明（如 var x = 、const Pi = ）
            ':',    // 短变量声明的一部分（:=），但通常输入:时不会单独触发
            ' ',    // 关键字后（如 func 、type 、var 、const 、import ）
            '\n',   // 新行（在某些IDE中，换行后根据上下文可能触发补全）
            '/',    // 注释开始（部分IDE在文档注释中提供补全）
            '*',    // 指针类型或乘法（如 *int、var *User）
            '&',    // 取地址符（如 &User{}）
            '<',    // 泛型类型参数、通道接收（Go 1.18+，如 make(chan<- int)、func[T any]()）
            '-',    // 减号或箭头符号的一部分（如 <-chan，但通常输入<时已处理）
        ];
    }

    获取补全项文本(补全项: vsc.CompletionItem): string {
        // 不使用 补全项.filterText
        let 补全项文本;
        // label.label
        补全项文本 = 补全项文本 || (补全项.label as vsc.CompletionItemLabel).label;
        // label
        补全项文本 = 补全项文本 || 补全项.label as string;
        // 如果补全项文本以 T 开头，且第二位为中文，则去掉 T
        if (补全项文本 && 补全项文本.length > 1 && 补全项文本[0] === 'T' && /[\u4e00-\u9fa5]/.test(补全项文本[1])) {
            补全项文本 = 补全项文本.substring(1);
        }
        return 补全项文本;
    }
}

export default new 语言实现();
