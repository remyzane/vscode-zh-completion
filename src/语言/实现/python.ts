import * as vsc from '../../接口封装';
import { 语言基类 } from '../基类';


export class 语言实现 extends 语言基类 {
    private 补全缓存类型?: 'from' | 'super';
    private 补全缓存KEY?: string;
    private 补全缓存内容?: vsc.CompletionList<vsc.CompletionItem>;

    需要缓存(行文本: string, 光标位置: number): boolean {
        // 输入 from . 或 from .. 或 from ..xx. 时，可以获得补全项（先缓存起来）
        if (行文本.startsWith('from ') && 行文本[光标位置 - 1] === '.') {
            this.补全缓存类型 = 'from';
            return true;
        }
        // 输入 super(). 时，可以获得补全项（先缓存起来）
        if (行文本.endsWith('super().')) {
            this.补全缓存类型 = 'super';
            return true;
        }
        return false;
    }

    无需使用缓存(行文本: string, 光标位置: number): boolean {
        // 输入 from .xx import 时，可以正常获取系统补全了，无需使用缓存
        if (this.补全缓存类型 === 'from' && 行文本.substring(0, 光标位置).includes(' import ')) {
            return true;
        }
        // 输入 super().xxx )、super().xxx(yyy 或 super().xxx.yyy 等时，可以正常获取系统补全了，无需使用缓存
        if (this.补全缓存类型 === 'super') {
            const 前后文本 = 行文本.split('super().');

            if (前后文本.length > 1) {
                const 后文本 = 前后文本[1];
                if (后文本.includes(' ') || 后文本.includes(')') || 后文本.includes('(') || 后文本.includes('.') || 后文本.includes(',')) {
                    return true;
                }
            }
        }
        // vsc.log(`使用缓存: ${行文本}`)
        return false;
    }

    async 获得系统补全(
        文档: vsc.TextDocument, 光标位置: vsc.Position, 补全锚点: vsc.Position
    ): Promise<vsc.CompletionList<vsc.CompletionItem>> {
        const 系统补全 = await super.获得系统补全(文档, 光标位置, 补全锚点);
        // 获取当前行的文本
        const 行文本 = 文档.lineAt(光标位置.line).text;
        //
        if (this.需要缓存(行文本, 光标位置.character)) {
            this.补全缓存KEY = 行文本.substring(0, 光标位置.character);
            this.补全缓存内容 = 系统补全;
            return { items: [] };   // 为了避免重复输出（from . 或 super(). 时，展现系统补全项就可以了（还没开始过滤））
        } else {
            if (this.补全缓存KEY) {
                // 输入 from .xx 时，使用 from . 时缓存的补全项
                if (行文本.startsWith(this.补全缓存KEY)) {
                    if (!this.无需使用缓存(行文本, 光标位置.character)) {
                        return this.补全缓存内容 as vsc.CompletionList<vsc.CompletionItem>;
                    }
                } else { // 已经切换到其他行（非导入行），则清除缓存
                    this.补全缓存KEY = undefined;
                    this.补全缓存内容 = undefined;
                }

            }
        }
        return 系统补全;
    }

    constructor() {
        super();
        this.触发字符 = [
            '.',    // 成员访问（最核心）（如 obj.）
            ':',    // 类型注解（如 x: int）或字典值上下文（如 {'k': ）
            ',',    // 参数或元素分隔后继续补全（如 func(a, b, )）
            '(',    // 函数调用参数提示（如 func(），常与签名帮助协同
            '[',    // 索引或切片补全（如 arr[ 或 df['col']）
            '{',    // 字典/集合字面量键补全（如 {'status': ）
            '=',    // 关键字参数赋值（如 func(timeout=)）
            ' ',    // 类静态成员或Model字段定义
        ];
        this.补全锚点配置 = {
            是否标识符字符: (字符) => /[a-zA-Z0-9_]/.test(字符),
            最大回退距离: 30
        };
    }
}

export default new 语言实现();
