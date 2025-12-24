package 中文包;

import java.util.ArrayList;
import java.util.List;

/**
 * Java 中文命名样例
 */

// 学生类示例
class 学生元组 {
    private final String 姓名;
    private final int 年龄;
    private final String 班级;

    public 学生元组(String 姓名, int 年龄, String 班级) {
        this.姓名 = 姓名;
        this.年龄 = 年龄;
        this.班级 = 班级;
    }

    public String get姓名() {
        return 姓名;
    }

    public int get年龄() {
        return 年龄;
    }

    public String get班级() {
        return 班级;
    }

    @Override
    public String toString() {
        return 姓名 + ", " + 年龄 + "岁, " + 班级;
    }
}

// 枚举示例
enum 颜色枚举 {
    红色(1),
    绿色(2),
    蓝色(3);

    private final int 值;

    颜色枚举(int 值) {
        this.值 = 值;
    }

    public int get值() {
        return 值;
    }
}

public class 中文模块 {

    public static void 中文函数(String 参数1, String 参数2) {
        // 枚举示例
        System.out.println("喜欢的颜色: " + 颜色枚举.红色.name());

        学生元组 学生 = new 学生元组("李四", 17, "高二一班");
        System.out.println("学生信息: " + 学生.toString());

        System.out.println(参数1);
        System.out.println(参数2);
    }

    // for 循环示例
    public static void 遍历列表() {
        List<String> 水果列表 = new ArrayList<>();
        水果列表.add("苹果");
        水果列表.add("香蕉");
        水果列表.add("橙子");
        水果列表.add("葡萄");

        for (String 水果 : 水果列表) {
            System.out.println("我喜欢吃" + 水果);
        }

        // 使用索引
        for (int 索引 = 0; 索引 < 水果列表.size(); 索引++) {
            System.out.println("第" + (索引 + 1) + "个水果是" + 水果列表.get(索引));
        }
    }

    // switch 语句示例
    public static void 匹配示例(int 值) {
        switch (值) {
            case 0:
                System.out.println("零");
                break;
            case 1:
            case 2:
            case 3:
                System.out.println("小数字");
                break;
            default:
                System.out.println("其他类型");
        }
    }

    // 函数定义和调用示例
    public static double 计算面积(String 形状, double 半径) {
        switch (形状) {
            case "圆形":
                return 3.14159 * 半径 * 半径;
            default:
                return 0;
        }
    }

    // 类的继承示例
    static class 动物类 {
        protected String 类型 = "未知";
        protected String 名称;

        public 动物类(String 名称) {
            this.名称 = 名称;
        }

        public void 发出声音() {
            System.out.println(名称 + "发出了声音");
        }
    }

    static class 犬类 extends 动物类 {
        public 犬类(String 名称) {
            super(名称);
        }

        @Override
        public void 发出声音() {
            System.out.println(名称 + "汪汪叫");
        }
    }

    // 异常处理示例
    static class 除数不能为零异常 extends Exception {
        public 除数不能为零异常(String message) {
            super(message);
        }
    }

    public static Double 除法运算(double 被除数, double 除数) {
        try {
            if (除数 == 0) {
                throw new 除数不能为零异常("除数不能为零");
            }
            return 被除数 / 除数;
        } catch (除数不能为零异常 e) {
            System.out.println("错误：" + e.getMessage());
            return null;
        }
    }

    // 列表操作示例
    public static List<Integer> 生成平方数列表() {
        List<Integer> 数字列表 = new ArrayList<>();
        数字列表.add(1);
        数字列表.add(2);
        数字列表.add(3);
        数字列表.add(4);
        数字列表.add(5);

        List<Integer> 平方数列表 = new ArrayList<>();
        for (int 数字 : 数字列表) {
            if (数字 % 2 == 1) {
                平方数列表.add(数字 * 数字);
            }
        }
        return 平方数列表;
    }
}