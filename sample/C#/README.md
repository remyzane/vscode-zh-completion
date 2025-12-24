# C# 语言中文命名示例

这个示例展示了在 C# 语言中如何使用中文标识符，包括类名、方法名、变量名、枚举值等。

## 文件结构

- `Simple.csproj` - C# 项目文件
- `Program.cs` - 主程序文件，对应 Python 的样例.py
- `中文包/中文类.cs` - 核心功能类，对应 Python 的中文模块.py
- `中文包/中文包.cs` - 包的主类，对应 Python 的 __init__.py

## 功能特性

### 1. 枚举类型
```csharp
public enum 颜色枚举
{
    红色 = 1,
    绿色 = 2,
    蓝色 = 3
}
```

### 2. 结构体
```csharp
public struct 学生元组
{
    public string 姓名 { get; set; }
    public int 年龄 { get; set; }
    public string 班级 { get; set; }
}
```

### 3. 类的继承
```csharp
public class 动物类
{
    public virtual void 发出声音()
    {
        Console.WriteLine($"{this.名称}发出了声音");
    }
}

public class 犬类 : 动物类
{
    public override void 发出声音()
    {
        Console.WriteLine($"{this.名称}汪汪叫");
    }
}
```

### 4. 自定义异常
```csharp
public class 除数不能为零异常 : Exception
{
    public 除数不能为零异常(string message) : base(message) { }
}
```

### 5. LINQ 查询（C# 的列表推导式）
```csharp
List<int> 平方数列表 = 数字列表.FindAll(数字 => 数字 % 2 == 1)
                             .ConvertAll(数字 => 数字 * 数字);
```

## 与Python示例的对应关系

| Python | C# |
|--------|-----|
| `样例.py` | `Program.cs` |
| `中文包/中文模块.py` | `中文包/中文类.cs` |
| `中文包/__init__.py` | `中文包/中文包.cs` |

## 特点

- 所有标识符都使用中文命名
- 使用英文的 namespace 名称
- 展示了 C# 语言的主要特性：结构体、类继承、异常处理、LINQ 等
- 代码结构与 Python 示例保持对应关系

## 中文标识符支持

C# 完全支持使用 Unicode 字符作为标识符，包括中文字符。这使得代码可以更加直观和易读。

## 运行说明

由于用户要求无需通过编译，此示例仅展示 C# 中中文命名的语法结构。