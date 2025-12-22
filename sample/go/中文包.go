package main

/**
 * 中文命名样例 - GO 1.21
 */

import (
	"errors"
	"fmt"
	"math"
)

// 学生结构体 - 使用现代 Go 结构体
type 学生结构体 struct {
	姓名 string
	年龄 int
	班级 string
}

func (s 学生结构体) String() string {
	return fmt.Sprintf("%s, %d岁, %s", s.姓名, s.年龄, s.班级)
}

// 中文函数
func 中文函数() {
	学生 := 学生结构体{姓名: "李四", 年龄: 17, 班级: "高二一班"}
	fmt.Printf("学生信息: %s\n", 学生.String())
}

// 遍历切片示例
func 遍历列表() {
	水果列表 := []string{"苹果", "香蕉", "橙子", "葡萄"}

	for _, 水果 := range 水果列表 {
		fmt.Printf("我喜欢吃%s\n", 水果)
	}

	// 使用 range 获取索引
	for 索引, 水果 := range 水果列表 {
		fmt.Printf("第%d个水果是%s\n", 索引+1, 水果)
	}
}

// switch 语句示例
func 匹配示例(值 int) {
	switch 值 {
	case 0:
		fmt.Println("零")
	case 1, 2, 3:
		fmt.Println("小数字")
	default:
		fmt.Println("其他类型")
	}
}

// 函数定义和调用示例
func 计算面积(形状 string, 参数 map[string]float64) float64 {
	switch 形状 {
	case "圆形":
		半径 := 参数["半径"]
		if 半径 == 0 {
			半径 = 1
		}
		return math.Pi * 半径 * 半径
	default:
		return 0
	}
}

// 接口和实现示例
type 动物结构体 struct {
	名称 string
}

type 狗结构体 struct {
	动物结构体
}

func (d 狗结构体) 发出声音() {
	fmt.Printf("%s汪汪叫\n", d.名称)
}

// 自定义错误
var 除数不能为零错误 = errors.New("除数不能为零")

// 异常处理示例
func 除法运算(被除数, 除数 float64) (float64, error) {
	if 除数 == 0 {
		return 0, 除数不能为零错误
	}
	return 被除数 / 除数, nil
}

// 切片操作示例
func 生成平方数列表() []int {
	数字列表 := []int{1, 2, 3, 4, 5}
	var 平方数列表 []int

	for _, 数字 := range 数字列表 {
		if 数字%2 == 1 {
			平方数列表 = append(平方数列表, 数字*数字)
		}
	}
	return 平方数列表
}

// 泛型函数示例 (Go 1.18+)
func 取最小值[T comparable](切片 []T) T {
	if len(切片) == 0 {
		var 零值 T
		return 零值
	}

	最小值 := 切片[0]
	for _, 值 := range 切片[1:] {
		if fmt.Sprintf("%v", 值) < fmt.Sprintf("%v", 最小值) {
			最小值 = 值
		}
	}
	return 最小值
}

func main() {
	遍历列表()
	中文函数()
	取最小值([]int{1, 2, 3, 4, 5})
	生成平方数列表()
	值, err := 除法运算(10, 1)
	fmt.Printf("值: %f, 错误: %v\n", 值, err)
	狗 := 狗结构体{}
	狗.发出声音()
	计算面积("圆形", map[string]float64{"半径": 2})
	匹配示例(2)
}
