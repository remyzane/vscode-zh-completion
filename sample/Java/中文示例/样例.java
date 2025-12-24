package 中文示例;

import 中文包.颜色枚举;
import 中文包.学生元组;

/**
 * Java 中文命名样例
 */
public class 样例 {

    public static void 中文函数(String 参数1, String... 参数N) {
        // 枚举示例
        System.out.println("喜欢的颜色: " + 颜色枚举.红色.name());

        学生元组 学生 = new 学生元组("李四", 17, "高二一班");
        System.out.println("学生信息: " + 学生.toString());

        System.out.println(参数1);

        // 打印其他参数
        for (String 参数 : 参数N) {
            System.out.println(参数);
        }
    }

    public static void main(String[] args) {
        // 调用中文包中的函数
        样例.中文函数("xxx", "yyy");
    }
}
