
namespace 中文包
{
    // 学生结构体示例
    public struct 学生元组
    {
        public string 姓名 { get; set; }
        public int 年龄 { get; set; }
        public string 班级 { get; set; }

        public 学生元组(string 姓名, int 年龄, string 班级)
        {
            this.姓名 = 姓名;
            this.年龄 = 年龄;
            this.班级 = 班级;
        }
    }

    // 枚举示例
    public enum 颜色枚举
    {
        红色 = 1,
        绿色 = 2,
        蓝色 = 3
    }

    // 中文函数示例
    public static class 中文模块
    {
        // for 循环示例
        public static void 遍历列表()
        {
            List<string> 水果列表 = new List<string> { "苹果", "香蕉", "橙子", "葡萄" };

            foreach (string 水果 in 水果列表)
            {
                Console.WriteLine($"我喜欢吃{水果}");
            }

            // 使用索引遍历
            for (int 索引 = 0; 索引 < 水果列表.Count; 索引++)
            {
                Console.WriteLine($"第{索引 + 1}个水果是{水果列表[索引]}");
            }
        }

        // switch 语句示例
        public static void 匹配示例(int 值)
        {
            switch (值)
            {
                case 0:
                    Console.WriteLine("零");
                    break;
                case 1:
                case 2:
                case 3:
                    Console.WriteLine("小数字");
                    break;
                default:
                    Console.WriteLine("其他类型");
                    break;
            }
        }

        // 函数定义和调用示例
        public static double 计算面积(string 形状, Dictionary<string, double> 参数)
        {
            switch (形状)
            {
                case "圆形":
                    double 半径 = 参数.ContainsKey("半径") ? 参数["半径"] : 1.0;
                    return 3.14159 * 半径 * 半径;
                default:
                    return 0;
            }
        }

        // 类的继承示例
        public class 动物类
        {
            public string 类型 { get; set; } = "未知";

            public string 名称 { get; set; }

            public 动物类(string 名称)
            {
                this.名称 = 名称;
            }

            public virtual void 发出声音()
            {
                Console.WriteLine($"{this.名称}发出了声音");
            }
        }

        public class 犬类 : 动物类
        {
            public 犬类(string 名称) : base(名称)
            {
            }

            public override void 发出声音()
            {
                Console.WriteLine($"{this.名称}汪汪叫");
            }
        }

        // 自定义异常类
        public class 除数不能为零异常(string message) : Exception(message)
        {
        }

        // 异常处理示例
        public static double? 除法运算(double 被除数, double 除数)
        {
            try
            {
                if (除数 == 0)
                {
                    throw new 除数不能为零异常("除数不能为零");
                }
                return 被除数 / 除数;
            }
            catch (除数不能为零异常 ex)
            {
                Console.WriteLine($"错误：{ex.Message}");
                return null;
            }
        }

        // 列表推导式示例（C# LINQ）
        public static List<int> 生成平方数列表()
        {
            List<int> 数字列表 = new List<int> { 1, 2, 3, 4, 5 };
            List<int> 平方数列表 = 数字列表.FindAll(数字 => 数字 % 2 == 1)
                                         .ConvertAll(数字 => 数字 * 数字);
            return 平方数列表;
        }
    }
}