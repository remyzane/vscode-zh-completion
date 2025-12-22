package 中文包;

/**
 * 中文命名样例 - Java版本
 * 使用Java现代特性：record、enum、sealed接口、switch表达式等
 */

// 枚举示例 - 使用Java enum
enum 颜色枚举 {
    红色, 绿色, 蓝色;

    public String get描述() {
        return switch (this) {
            case 红色 -> "热情的颜色";
            case 绿色 -> "自然的颜色";
            case 蓝色 -> "宁静的颜色";
        };
    }
}

// Record示例 (替代Python的namedtuple) - Java 14+
record 学生记录(String 姓名, int 年龄, String 班级) {
    public String toString() {
        return String.format("学生信息: %s, %d岁, %s", 姓名, 年龄, 班级);
    }
}

// 动物类示例 (替代继承)
class 动物 {
    protected String 名称;

    public 动物(String 名称) {
        this.名称 = 名称;
    }

    public String get名称() {
        return 名称;
    }

    public void 发出声音() {
        System.out.println(名称 + "发出了声音");
    }
}

class 狗 extends 动物 {
    public 狗(String 名称) {
        super(名称);
    }

    @Override
    public void 发出声音() {
        System.out.println(名称 + "汪汪叫");
    }
}

class 猫 extends 动物 {
    public 猫(String 名称) {
        super(名称);
    }

    @Override
    public void 发出声音() {
        System.out.println(名称 + "喵喵叫");
    }
}

// 自定义异常
class 除数不能为零异常 extends RuntimeException {
    public 除数不能为零异常(String 消息) {
        super(消息);
    }
}

public class 中文模块 {

    // 基本函数示例
    public static void 中文函数() {
        // 枚举示例
        System.out.println("喜欢的颜色: " + 颜色枚举.红色.name());
        System.out.println("颜色描述: " + 颜色枚举.红色.get描述());

        // Record示例
        var 学生 = new 学生记录("李四", 17, "高二一班");
        System.out.println(学生.toString());

        // Stream API示例
        var 颜色列表 = java.util.Arrays.stream(颜色枚举.values())
            .filter(颜色 -> 颜色 != 颜色枚举.红色)
            .map(颜色 -> "我喜欢" + 颜色.name())
            .toList();

        颜色列表.forEach(System.out::println);
    }

    // 循环遍历示例
    public static void 遍历列表() {
        var 水果列表 = java.util.List.of("苹果", "香蕉", "橙子", "葡萄");

        // 增强for循环
        for (var 水果 : 水果列表) {
            System.out.println("我喜欢吃" + 水果);
        }

        // 使用索引和Stream
        水果列表.stream()
            .map(水果 -> "第" + (水果列表.indexOf(水果) + 1) + "个水果是" + 水果)
            .forEach(System.out::println);
    }

    // Switch表达式示例 (Java 14+)
    public static String 匹配示例(int 值) {
        if (值 == 0) {
            return "零";
        } else if (值 >= 1 && 值 <= 3) {
            return "小数字";
        } else if (值 > 10) {
            return "大数字";
        } else {
            return "其他类型";
        }
    }

    // 函数重载和可变参数
    public static double 计算面积(String 形状, Object... 参数) {
        return switch (形状) {
            case "圆形" -> {
                var 半径 = 参数.length > 0 ? (double) 参数[0] : 1.0;
                yield 3.14159 * 半径 * 半径;
            }
            case "矩形" -> {
                if (参数.length >= 2) {
                    yield (double) 参数[0] * (double) 参数[1];
                }
                yield 0.0;
            }
            default -> 0.0;
        };
    }

    // 异常处理示例
    public static Double 除法运算(double 被除数, double 除数) {
        try {
            if (除数 == 0) {
                throw new 除数不能为零异常("除数不能为零");
            }
            return 被除数 / 除数;
        } catch (除数不能为零异常 e) {
            System.out.println("错误: " + e.getMessage());
            return null;
        }
    }

    // Stream和Lambda示例 - 替代列表推导式
    public static java.util.List<Integer> 生成平方数列表() {
        var 数字列表 = java.util.List.of(1, 2, 3, 4, 5);
        return 数字列表.stream()
            .filter(数字 -> 数字 % 2 == 1)  // 奇数
            .map(数字 -> 数字 * 数字)        // 平方
            .toList();
    }

    // 多态示例
    public static void 动物演示() {
        var 动物列表 = java.util.List.of(
            new 狗("旺财"),
            new 猫("咪咪")
        );

        for (var 动物 : 动物列表) {
            System.out.print(动物.get名称() + ": ");
            动物.发出声音();
        }
    }

    // 主方法 - 演示所有功能
    public static void main(String[] args) {
        System.out.println("=== 中文命名Java样例 ===\n");

        System.out.println("1. 基本函数演示:");
        中文函数();

        System.out.println("\n2. 遍历列表演示:");
        遍历列表();

        System.out.println("\n3. 匹配示例:");
        System.out.println("匹配0: " + 匹配示例(0));
        System.out.println("匹配2: " + 匹配示例(2));
        System.out.println("匹配15: " + 匹配示例(15));

        System.out.println("\n4. 面积计算:");
        System.out.println("圆形面积(半径3): " + 计算面积("圆形", 3.0));
        System.out.println("矩形面积(4x5): " + 计算面积("矩形", 4.0, 5.0));

        System.out.println("\n5. 除法运算:");
        System.out.println("10/2 = " + 除法运算(10, 2));
        System.out.println("10/0 = " + 除法运算(10, 0));

        System.out.println("\n6. 平方数列表:");
        System.out.println("奇数平方: " + 生成平方数列表());

        System.out.println("\n7. 动物演示:");
        动物演示();
    }
}