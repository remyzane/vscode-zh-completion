#include "中文模块.h"

namespace 中文包 {
// 全局枚举变量
颜色枚举 喜欢的颜色 = 颜色枚举::红色;

void 遍历列表() {
  std::vector<std::string> 水果列表 = {"苹果", "香蕉", "橙子", "葡萄"};

  for (const auto &水果 : 水果列表) {
    std::cout << "我喜欢吃" << 水果 << std::endl;
  }

  // 使用索引遍历
  for (size_t i = 0; i < 水果列表.size(); i++) {
    std::cout << "第" << i + 1 << "个水果是" << 水果列表[i] << std::endl;
  }
}

void 匹配示例(int 值) {
  switch (值) {
  case 0:
    std::cout << "零" << std::endl;
    break;
  case 1:
  case 2:
  case 3:
    std::cout << "小数字" << std::endl;
    break;
  default:
    std::cout << "其他类型" << std::endl;
    break;
  }
}

double 计算面积(const std::string &形状, double 半径) {
  if (形状 == "圆形") {
    return 3.14159 * 半径 * 半径;
  }
  return 0.0;
}

// 异常处理示例
double 除法运算(int 被除数, int 除数) {
  if (除数 == 0) {
    throw 除数不能为零异常();
  }
  return static_cast<double>(被除数) / 除数;
}

// 列表推导式示例（C++ STL 等效实现）
std::vector<int> 生成平方数列表() {
  std::vector<int> 数字列表 = {1, 2, 3, 4, 5};
  std::vector<int> 平方数列表;

  // 使用 STL 算法和 lambda 表达式
  std::transform(数字列表.begin(), 数字列表.end(),
                 std::back_inserter(平方数列表),
                 [](int 数字) { return 数字 * 数字; });

  // 过滤出奇数的平方
  平方数列表.erase(std::remove_if(平方数列表.begin(), 平方数列表.end(),
                                  [](int 平方数) { return 平方数 % 4 == 0; }),
                   平方数列表.end());

  return 平方数列表;
}

// 演示模板函数使用
void 演示模板函数() {
  std::cout << "整数最大值: " << 最大值(10, 20) << std::endl;
  std::cout << "浮点数最大值: " << 最大值(3.14, 2.71) << std::endl;
  std::cout << "字符串最大值: "
            << 最大值(std::string("hello"), std::string("world")) << std::endl;
}

// 演示智能指针
void 演示智能指针() {
  // 使用 unique_ptr 管理动物对象
  auto 动物 = std::make_unique<动物类>("小猫");
  动物->发出声音();

  // 使用 shared_ptr 演示多态
  std::shared_ptr<动物类> 犬 = std::make_shared<犬类>("旺财");
  犬->发出声音();
}

} // namespace 中文包