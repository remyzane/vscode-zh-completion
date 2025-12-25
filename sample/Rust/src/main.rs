
use simple::中文模块;

pub fn Rust样例(参数: &str) {
    println!("喜欢的颜色: {:?}", 中文模块::颜色枚举::红色);

    let 学生 = 中文模块::学生元组 {
        姓名: "李四".to_string(),
        年龄: 17,
        班级: "高二一班".to_string(),
    };
    println!("学生信息: {}, {}岁, {}", 学生.姓名, 学生.年龄, 学生.班级);

    println!("{}", 参数);
}

fn main() {
    Rust样例("Rust 中文命名样例");
}
