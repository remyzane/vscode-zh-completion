package zh

import (
	"fmt"
)

// 颜色枚举
type 颜色枚举 int

const (
	T红色 颜色枚举 = 1
	T绿色 颜色枚举 = 2
	T蓝色 颜色枚举 = 3
)

// 学生元组 学生结构体
type 学生元组 struct {
	T姓名 string
	T年龄 uint32
	T班级 string
}

// 创建学生元组的函数
func New学生元组(姓名 string, 年龄 uint32, 班级 string) 学生元组 {
	return 学生元组{
		T姓名: 姓名,
		T年龄: 年龄,
		T班级: 班级,
	}
}

// 除数不能为零错误 除数不能为零错误
type 除数不能为零错误 struct{}

func (e *除数不能为零错误) Error() string {
	return "错误：除数不能为零"
}

// 动物特征 动物特征接口
type 动物特征 interface {
	发出声音()
	获取名称() string
}

// 动物类 动物基类
type 动物类 struct {
	名称 string
}

// 新建动物 创建新的动物实例
func 新建动物(名称 string) *动物类 {
	return &动物类{
		名称: 名称,
	}
}

func (a *动物类) 发出声音() {
	fmt.Printf("%s发出了声音\n", a.名称)
}

func (a *动物类) 获取名称() string {
	return a.名称
}

// 犬类 犬类（继承自动物类）
type 犬类 struct {
	基类 *动物类
}

// 新建犬类 创建新的犬类实例
func 新建犬类(名称 string) *犬类 {
	return &犬类{
		基类: 新建动物(名称),
	}
}

func (d *犬类) 发出声音() {
	fmt.Printf("%s汪汪叫\n", d.基类.名称)
}

func (d *犬类) 获取名称() string {
	return d.基类.名称
}

// 遍历列表 遍历列表
func 遍历列表() {
	水果列表 := []string{"苹果", "香蕉", "橙子", "葡萄"}

	for _, 水果 := range 水果列表 {
		fmt.Printf("我喜欢吃%s\n", 水果)
	}

	// 使用索引遍历
	for i, 水果 := range 水果列表 {
		fmt.Printf("第%d个水果是%s\n", i+1, 水果)
	}
}

// 匹配示例 匹配示例
func 匹配示例(值 int32) {
	switch 值 {
	case 0:
		fmt.Println("零")
	case 1, 2, 3:
		fmt.Println("小数字")
	default:
		fmt.Println("其他类型")
	}
}

// 计算面积 计算面积
func 计算面积(形状 string, 半径 float64) float64 {
	switch 形状 {
	case "圆形":
		return 3.14159 * 半径 * 半径
	default:
		return 0.0
	}
}

// 除法运算 异常处理示例
func 除法运算(被除数, 除数 float64) (float64, error) {
	if 除数 == 0.0 {
		return 0.0, &除数不能为零错误{}
	}
	return 被除数 / 除数, nil
}

// 生成平方数列表 生成平方数列表
func 生成平方数列表() []int32 {
	数字列表 := []int32{1, 2, 3, 4, 5}
	var 结果 []int32

	// 只保留奇数并计算平方
	for _, 数字 := range 数字列表 {
		if 数字%2 == 1 {
			结果 = append(结果, 数字*数字)
		}
	}

	return 结果
}

// 最大值 演示泛型函数（Go 的泛型特性）
func 最大值[T interface{ ~int | ~int32 | ~float64 }](a, b T) T {
	if a > b {
		return a
	}
	return b
}

// 演示字典 演示 Map
func 演示字典() map[string]int32 {
	字典 := make(map[string]int32)
	字典["苹果"] = 1
	字典["香蕉"] = 2
	字典["橙子"] = 3
	return 字典
}

// 演示选项 演示指针类型（类似 Rust 的 Option）
func 演示选项() *int32 {
	值 := int32(42)
	return &值
}
