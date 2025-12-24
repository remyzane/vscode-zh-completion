using System;
using System.Collections.Generic;

namespace 中文包
{
    /// <summary>
    /// 中文包的主类，对应Python的__init__.py
    /// </summary>
    public static class 中文包
    {
        public static void 中文函数(string 参数1, string 参数2 = "", Dictionary<string, object>? 参数N = null)
        {
            // 枚举示例
            Console.WriteLine($"喜欢的颜色: {颜色枚举.红色}");

            学生元组 学生 = new 学生元组("李四", 17, "高二一班");
            Console.WriteLine($"学生信息: {学生.姓名}, {学生.年龄}岁, {学生.班级}");

            Console.WriteLine(参数1);
            if (!string.IsNullOrEmpty(参数2))
            {
                Console.WriteLine(参数2);
            }
            if (参数N != null)
            {
                foreach (var item in 参数N)
                {
                    Console.WriteLine($"{item.Key}: {item.Value}");
                }
            }
        }
    }
}