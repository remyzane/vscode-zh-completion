// 枚举示例 (使用对象模拟枚举)
const 颜色枚举 = {
    红色: 1,
    绿色: 2,
    蓝色: 3
} as const;

// 命名元组示例 (使用类模拟)
class 学生元组 {
    姓名: string;
    年龄: number;
    班级: string;

    constructor(姓名: string, 年龄: number, 班级: string) {
        this.姓名 = 姓名;
        this.年龄 = 年龄;
        this.班级 = 班级;
    }
}

// for 循环示例
function 遍历列表(): void {
    const 水果列表 = ['苹果', '香蕉', '橙子', '葡萄'];

    for (const 水果 of 水果列表) {
        console.log(`我喜欢吃${水果}`);
    }

    // 使用索引
    for (let 索引 = 0; 索引 < 水果列表.length; 索引++) {
        console.log(`第${索引 + 1}个水果是${水果列表[索引]}`);
    }
}

// switch 语句示例 (对应 match)
function 匹配示例(值: number): void {
    switch (值) {
        case 0:
            console.log('零');
            break;
        case 1:
        case 2:
        case 3:
            console.log('小数字');
            break;
        default:
            console.log('其他类型');
    }
}

// 函数定义和调用示例
interface 计算面积参数 {
    半径?: number;
}

function 计算面积(形状: string, 参数: 计算面积参数 = {}): number {
    switch (形状) {
        case '圆形':
            const 半径 = 参数.半径 || 1;
            return 3.14159 * 半径 ** 2;
        default:
            return 0;
    }
}

// 类的继承示例
class 动物类 {
    static 类型: string = '未知';
    名称: string;

    constructor(名称: string) {
        this.名称 = 名称;
    }

    发出声音(): void {
        console.log(`${this.名称}发出了声音`);
    }
}

class 犬类 extends 动物类 {
    发出声音(): void {
        console.log(`${this.名称}汪汪叫`);
    }
}

// 异常处理示例
class 除数不能为零异常 extends Error {
    constructor(message: string = '除数不能为零') {
        super(message);
        this.name = '除数不能为零异常';
    }
}

function 除法运算(被除数: number, 除数: number): number | null {
    try {
        if (除数 === 0) {
            throw new 除数不能为零异常();
        }
        const 结果 = 被除数 / 除数;
        return 结果;
    } catch (error) {
        if (error instanceof 除数不能为零异常) {
            console.log('错误：除数不能为零');
            return null;
        }
        throw error;
    }
}

// 数组方法示例 (对应列表推导式)
function 生成平方数列表(): number[] {
    const 数字列表 = [1, 2, 3, 4, 5];
    const 平方数列表 = 数字列表.filter(数字 => 数字 % 2 === 1).map(数字 => 数字 ** 2);
    return 平方数列表;
}

export default {
    颜色枚举,
    学生元组,
    遍历列表,
    匹配示例,
    计算面积,
    动物类,
    犬类,
    除数不能为零异常,
    除法运算,
    生成平方数列表
};

export type {
    计算面积参数
};