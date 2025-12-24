package 中文包;

/**
 * 学生元组类
 */
public class 学生元组 {
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