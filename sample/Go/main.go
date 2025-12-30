package main

import (
	"fmt"
	"simple/zh"
)

func Go样例(参数 string) {
	fmt.Printf("喜欢的色号: %v\n", zh.T红色)

	学生 := zh.New学生元组("小明", 17, "高二一班")
	fmt.Printf("学生信息: %s, %d岁, %s\n", 学生.T姓名, 学生.T年龄, 学生.T班级)

	fmt.Println(参数)
}

func main() {
	Go样例("Go 中文命名示例")
}
