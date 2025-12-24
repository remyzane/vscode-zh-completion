use std::collections::HashMap;

/// 颜色枚举（类似 Python 的 Enum）
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum 颜色枚举 {
    红色 = 1,
    绿色 = 2,
    蓝色 = 3,
}

/// 学生结构体（类似 Python 的 namedtuple）
#[derive(Debug, Clone)]
pub struct 学生元组 {
    pub 姓名: String,
    pub 年龄: u32,
    pub 班级: String,
}

/// 除数不能为零错误
#[derive(Debug)]
pub struct 除数不能为零错误;

impl std::fmt::Display for 除数不能为零错误 {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "错误：除数不能为零")
    }
}

impl std::error::Error for 除数不能为零错误 {}

/// 动物特征
pub trait 动物特征 {
    fn 发出声音(&self);
    fn 获取名称(&self) -> &str;
}

/// 动物基类
#[derive(Debug)]
pub struct 动物类 {
    pub 名称: String,
}

impl 动物类 {
    pub fn 新建(名称: &str) -> Self {
        动物类 {
            名称: 名称.to_string(),
        }
    }
}

impl 动物特征 for 动物类 {
    fn 发出声音(&self) {
        println!("{}发出了声音", self.名称);
    }

    fn 获取名称(&self) -> &str {
        &self.名称
    }
}

/// 犬类（继承自动物类）
#[derive(Debug)]
pub struct 犬类 {
    pub 基类: 动物类,
}

impl 犬类 {
    pub fn 新建(名称: &str) -> Self {
        犬类 {
            基类: 动物类::新建(名称),
        }
    }
}

impl 动物特征 for 犬类 {
    fn 发出声音(&self) {
        println!("{}汪汪叫", self.基类.名称);
    }

    fn 获取名称(&self) -> &str {
        &self.基类.名称
    }
}

/// 遍历列表（对应 Python 的 for 循环示例）
pub fn 遍历列表() {
    let 水果列表 = vec!["苹果", "香蕉", "橙子", "葡萄"];

    for 水果 in &水果列表 {
        println!("我喜欢吃{}", 水果);
    }

    // 使用索引遍历
    for (索引, 水果) in 水果列表.iter().enumerate() {
        println!("第{}个水果是{}", 索引 + 1, 水果);
    }
}

/// 匹配示例（对应 Python 的 match 语句）
pub fn 匹配示例(值: i32) {
    match 值 {
        0 => println!("零"),
        1 | 2 | 3 => println!("小数字"),
        _ => println!("其他类型"),
    }
}

/// 计算面积（对应 Python 的计算面积函数）
pub fn 计算面积(形状: &str, 半径: f64) -> f64 {
    match 形状 {
        "圆形" => 3.14159 * 半径 * 半径,
        _ => 0.0,
    }
}

/// 异常处理示例（对应 Python 的异常处理）
pub fn 除法运算(被除数: f64, 除数: f64) -> Result<f64, 除数不能为零错误> {
    if 除数 == 0.0 {
        Err(除数不能为零错误)
    } else {
        Ok(被除数 / 除数)
    }
}

/// 生成平方数列表（对应 Python 的列表推导式）
pub fn 生成平方数列表() -> Vec<i32> {
    let 数字列表 = vec![1, 2, 3, 4, 5];

    // 使用迭代器和闭包实现类似列表推导式的功能
    数字列表
        .into_iter()
        .filter(|&数字| 数字 % 2 == 1) // 只保留奇数
        .map(|数字| 数字 * 数字) // 计算平方
        .collect()
}

/// 演示泛型函数（Rust 的模板特性）
pub fn 最大值<T: PartialOrd>(a: T, b: T) -> T {
    if a > b {
        a
    } else {
        b
    }
}

/// 演示 HashMap（对应 Python 的字典）
pub fn 演示字典() -> HashMap<String, i32> {
    let mut 字典 = HashMap::new();
    字典.insert("苹果".to_string(), 1);
    字典.insert("香蕉".to_string(), 2);
    字典.insert("橙子".to_string(), 3);
    字典
}

/// 演示 Option 类型
pub fn 演示选项() -> Option<i32> {
    Some(42)
}

pub mod 中文模块 {
    pub use super::*;
}
