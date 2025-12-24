package 中文包;

/**
 * 中文包初始化文件
 * 导出中文模块中的主要功能
 */

// 从中文模块导入主要功能
import static 中文包.中文模块.*;

public class 中文包 {

    /**
     * 中文函数 - 接受可变参数
     * @param 参数1 第一个参数
     * @param 参数N 其他参数
     */
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
}