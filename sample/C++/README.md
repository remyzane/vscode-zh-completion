# C++ 中文命名样例

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
```Make 的基本使用方法