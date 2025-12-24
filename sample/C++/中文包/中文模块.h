#ifndef 中文模块_H
#define 中文模块_H

#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <memory>
#include <stdexcept>
#include <algorithm>

namespace 中文包
{

    // 枚举定义
    enum class 颜色枚举
    {
        红色 = 1,
        绿色 = 2,
        蓝色 = 3
    };

    // 学生结构体（类似 Python 的 namedtuple）
    struct 学生元组
    {
        std::string 姓名;
        int 年龄;
        std::string 班级;

        学生元组(const std::string &姓名, int 年龄, const std::string &班级)
            : 姓名(姓名), 年龄(年龄), 班级(班级) {}
    };

    // 动物基类
    class 动物类
    {
    protected:
        std::string 名称;

    public:
        动物类(const std::string &名称) : 名称(名称) {}
        virtual ~动物类() = default;

        virtual void 发出声音()
        {
            std::cout << 名称 << "发出了声音" << std::endl;
        }

        std::string 获取名称() const { return 名称; }
    };

    // 犬类继承自动物类
    class 犬类 : public 动物类
    {
    public:
        犬类(const std::string &名称) : 动物类(名称) {}

        void 发出声音() override
        {
            std::cout << 名称 << "汪汪叫" << std::endl;
        }
    };

    // 除数不能为零异常类
    class 除数不能为零异常 : public std::exception
    {
    public:
        const char *what() const noexcept override
        {
            return "错误：除数不能为零";
        }
    };

    // 主要函数声明
    void 中文函数(const std::string &参数1, const std::string &参数2);
    void 遍历列表();
    void 匹配示例(int 值);
    double 计算面积(const std::string &形状, double 半径 = 1.0);
    std::vector<int> 生成平方数列表();

    // 模板函数示例
    template <typename T>
    T 最大值(const T &a, const T &b)
    {
        return (a > b) ? a : b;
    }

    // 异常处理示例
    double 除法运算(int 被除数, int 除数);

} // namespace 中文包

#endif // 中文模块_H