# C++语言中文编程样例

本目录包含了与 Python 版本对应的 C++ 语言中文编程样例。

## 文件结构

```
sample/C++/
├── main.cpp              # 主程序文件
├── CMakeLists.txt        # CMake 构建配置
├── 中文包/
│   ├── 中文模块.h         # 头文件
│   └── 中文模块.cpp       # 模块实现
└── README.md             # 说明文档
```

## 功能说明

### 主要特性

1. **中文命名空间**：使用 `namespace 中文包` 组织代码
2. **面向对象设计**：完整的类继承体系
3. **现代 C++ 特性**：
   - 智能指针（`std::unique_ptr`, `std::shared_ptr`）
   - STL 容器（`std::vector`, `std::string`）
   - Lambda 表达式
   - 模板函数
   - 异常处理
4. **强类型系统**：使用 `enum class` 替代传统枚举
5. **RAII 资源管理**：自动内存管理

### 核心类

- **学生元组结构体**：使用构造函数初始化
- **动物基类**：虚函数实现多态
- **犬类**：公有继承，覆写虚函数
- **除数不能为零异常类**：继承自 `std::exception`

### 核心函数

- `中文函数()`: 演示枚举、结构体和参数处理
- `遍历列表()`: 使用 STL 容器和范围 for 循环
- `匹配示例()`: 演示 switch-case 语句
- `计算面积()`: 演示函数重载和默认参数
- `除法运算()`: 演示异常处理
- `生成平方数列表()`: 使用 STL 算法和 Lambda 表达式

## 编译和运行

### 使用 CMake（推荐）

```bash
# 创建构建目录
mkdir build && cd build

# 配置项目
cmake ..

# 编译
make

# 运行
./main
```

### 直接使用 g++

```bash
g++ -std=c++17 -Wall -Wextra -o main main.cpp 中文包/中文模块.cpp
./main
```

## 与 Python 版本的对比

| Python 功能 | C++ 实现 |
|------------|----------|
| 命名空间 | `namespace 中文包` |
| namedtuple | 结构体 + 构造函数 |
| Enum 枚举 | `enum class` |
| 类继承 | 公有继承 + 虚函数 |
| 异常处理 | `try/catch` + 自定义异常类 |
| 列表推导式 | STL 算法 + Lambda 表达式 |
| match 语句 | `switch-case` |
| 动态类型 | 模板函数 + 自动类型推导 |
| 内存管理 | 智能指针 + RAII |

## 现代 C++ 特性展示

### 1. 智能指针
```cpp
auto 动物 = std::make_unique<动物类>("小猫");
auto 犬 = std::make_shared<犬类>("旺财");
```

### 2. Lambda 表达式
```cpp
std::transform(数字列表.begin(), 数字列表.end(),
              std::back_inserter(平方数列表),
              [](int 数字) { return 数字 * 数字; });
```

### 3. 模板函数
```cpp
template<typename T>
T 最大值(const T& a, const T& b) {
    return (a > b) ? a : b;
}
```

### 4. 范围 for 循环
```cpp
for (const auto& 水果 : 水果列表) {
    std::cout << "我喜欢吃" << 水果 << std::endl;
}
```

## 编译要求

- C++17 或更高版本
- CMake 3.10 或更高版本
- 支持现代 C++ 特性的编译器（GCC 7+, Clang 5+, MSVC 2017+）

## 学习要点

1. **面向对象设计**：继承、封装、多态的完整实现
2. **现代 C++ 特性**：智能指针、Lambda、模板等
3. **STL 标准库**：容器、算法、迭代器的使用
4. **异常安全**：RAII 和异常处理机制
5. **中文标识符**：在现代 C++ 中的完整支持
6. **构建系统**：CMake 的基本使用方法