
import 中文模块 from './中文包/中文模块.js';
const { 颜色枚举, 学生元组 } = 中文模块;

/**
 * Javascript 中文命名样例
 */

function 中文函数({ 参数 }) {

    console.log(`喜欢的色号: ${颜色枚举.红色}`);

    const 学生 = new 学生元组('李四', 17, '高二一班');
    console.log(`学生信息: ${学生.姓名}, ${学生.年龄}岁, ${学生.班级}`);

    console.log(参数);
}

中文函数({ 参数: 'Javascript 中文命名样例测试' });
