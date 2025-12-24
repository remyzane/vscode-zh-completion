cmake_minimum_required(VERSION 3.10)
project(中文包 CXX)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 启用编译器警告
if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -Wpedantic")
endif()

# 创建可执行文件
add_executable(main main.cpp)

# 添加库源文件
target_sources(main PRIVATE
    中文包/中文模块.cpp
)

# 设置输出目录
set_target_properties(main PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
)

# 包含头文件目录
target_include_directories(main PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}
)