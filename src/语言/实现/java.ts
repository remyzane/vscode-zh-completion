import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {

    constructor() {
        super();
        this.触发字符 = [
            '.',    // 成员访问（最核心）（如 obj.method() 或 System.out）
            ',',    // 参数、泛型参数或数组元素分隔（如 func(a, ) 或 Map<K, >）
            '(',    // 方法调用或构造器（如 new ArrayList<>(），常与签名帮助协同
            '[',    // 数组索引或数组字面量（如 arr[0] 或 new int[]{1, ]）
            '<',    // 泛型类型参数（如 List<String> 或 Map<K, V>）
            '{',    // 初始化块、数组字面量或 Lambda 表达式（如 new int[]{1, } 或 () -> {）
            ':',    // Switch 标签（case x:）或 Lambda（x -> x: 不适用，但保留兼容性）
            '@',    // 注解开始（如 @Override 或 @RequestMapping(）
            ' ',    // 计算、赋值或箭头（如 x * y = z、 x = 1 或 () -> x）
        ];
    }
}

export default new 语言实现();
