using 中文包;

/** C# 中文命名样例 */

namespace Simple
{
    class Program
    {
        public static void 中文函数(string 参数)
        {
            Console.WriteLine($"喜欢的颜色: {颜色枚举.红色}");

            学生元组 学生 = new("李四", 17, "高二一班");
            Console.WriteLine($"学生信息: {学生.姓名}, {学生.年龄}岁, {学生.班级}");

            Console.WriteLine(参数);
        }
        static void Main(string[] args)
        {
            Program.中文函数(参数: "中文命名样例测试");
        }
    }
}