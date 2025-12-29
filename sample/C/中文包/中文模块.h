#ifndef 中文模块_H
#define 中文模块_H

#include <stdio.h>
#include <stdlib.h>

// 枚举定义
typedef enum { 红色 = 1, 绿色 = 2, 蓝色 = 3 } 颜色枚举;

// 学生元组结构体
typedef struct {
  char *姓名;
  int 年龄;
  char *班级;
} 学生元组;

// 动物基类
typedef struct 动物类 {
  char *名称;
  void (*发出声音)(struct 动物类 *);
} 动物类;

// 犬类继承自动物类
typedef struct {
  动物类 基类;
} 犬类;

// 函数声明
void 遍历列表(void);
void 匹配示例(int 值);
double 计算面积(char *形状, double 半径);
void 动物类_初始化(动物类 *动物, char *名称);
void 动物类_发出声音(动物类 *动物);
void 犬类_初始化(犬类 *犬, char *名称);
void 犬类_发出声音(动物类 *动物);
int 除法运算(int 被除数, int 除数, double *结果);
int *生成平方数列表(void);

#endif // 中文模块_H