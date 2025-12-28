
#include "中文包/中文模块.h"
#include <iostream>

/** C++ 中文命名示例 */
void 样例(const std::string &参数)
{
    std::cout << "喜欢的颜色: " << static_cast<int>(中文包::颜色枚举::红色) << std::endl;

    中文包::学生元组 学生("小明", 17, "高二一班");
    std::cout << "学生信息: " << 学生.姓名 << ", " << 学生.年龄 << "岁, " << 学生.班级 << std::endl;

    std::cout << 参数 << std::endl;
}

int main()
{
    样例("C++ 中文命名示例");
    return 0;
}
