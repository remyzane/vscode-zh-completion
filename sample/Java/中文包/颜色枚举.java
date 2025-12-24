package 中文包;

/**
 * 颜色枚举
 */
public enum 颜色枚举 {
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