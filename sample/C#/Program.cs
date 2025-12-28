
using 中文包;

namespace Simple
{
    class Program
    {
        /** C# 中文命名示例 */
        public static void 样例(string 参数)
        {
            Console.WriteLine($"喜欢的颜色: {颜色枚举.红色}");

            学生元组 学生 = new("小明", 17, "高二一班");
            Console.WriteLine($"学生信息: {学生.姓名}, {学生.年龄}岁, {学生.班级}");

            Console.WriteLine(参数);
        }
        static void Main(string[] args)
        {
            Program.样例(参数: "中文命名示例");
        }
    }
}
