
import 中文模块 from './中文包/中文模块';

const { 颜色枚举, 学生元组 } = 中文模块;

function TypeScript样例({ 参数 }: { 参数: string }): void {

    console.log(`喜欢的色号: ${颜色枚举.红色}`);

    const 学生 = new 学生元组('小明', 17, '高二一班');
    console.log(`学生信息: ${学生.姓名}, ${学生.年龄}岁, ${学生.班级}`);

    console.log(参数);
}

TypeScript样例({ 参数: 'TypeScript 中文命名示例' });
