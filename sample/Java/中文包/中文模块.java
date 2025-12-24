package 中文包;

import java.util.ArrayList;
import java.util.List;

/**
 * Java 中文命名样例
 */

public class 中文模块 {

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