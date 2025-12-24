const { 颜色枚举, 学生元组, 中文函数 } = require('./中文模块');

function 中文函数() {
    // 枚举示例
    console.log(`喜欢的颜色: ${Object.keys(颜色枚举).find(key => 颜色枚举[key] === 颜色枚举.红色)}`);

    const 学生 = new 学生元组('李四', 17, '高二一班');
    console.log(`学生信息: ${学生.姓名}, ${学生.年龄}岁, ${学生.班级}`);
}

module.exports = {
    颜色枚举,
    学生元组,
    中文函数
};