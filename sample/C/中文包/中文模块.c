#include "中文模块.h"
#include <string.h>

/** C 语言 中文命名样例 */

// 枚举和结构体定义
颜色枚举 喜欢的颜色 = 红色;

void 中文函数(char *参数1, char *参数2)
{
    // 枚举示例
    printf("喜欢的颜色: %d\n", 喜欢的颜色);

    // 学生元组示例
    学生元组 学生 = {"李四", 17, "高二一班"};
    printf("学生信息: %s, %d岁, %s\n", 学生.姓名, 学生.年龄, 学生.班级);

    printf("%s\n", 参数1);
    printf("%s\n", 参数2);
}

void 遍历列表(void)
{
    char *水果列表[] = {"苹果", "香蕉", "橙子", "葡萄"};
    int 列表长度 = sizeof(水果列表) / sizeof(水果列表[0]);

    for (int i = 0; i < 列表长度; i++)
    {
        printf("我喜欢吃%s\n", 水果列表[i]);
    }

    // 使用索引遍历
    for (int i = 0; i < 列表长度; i++)
    {
        printf("第%d个水果是%s\n", i + 1, 水果列表[i]);
    }
}

void 匹配示例(int 值)
{
    switch (值)
    {
    case 0:
        printf("零\n");
        break;
    case 1:
    case 2:
    case 3:
        printf("小数字\n");
        break;
    default:
        printf("其他类型\n");
        break;
    }
}

double 计算面积(char *形状, double 半径)
{
    if (strcmp(形状, "圆形") == 0)
    {
        return 3.14159 * 半径 * 半径;
    }
    return 0.0;
}

// 动物基类实现
void 动物类_初始化(动物类 *动物, char *名称)
{
    动物->名称 = 名称;
    动物->发出声音 = 动物类_发出声音;
}

void 动物类_发出声音(动物类 *动物)
{
    printf("%s发出了声音\n", 动物->名称);
}

// 犬类实现
void 犬类_初始化(犬类 *犬, char *名称)
{
    动物类_初始化(&(犬->基类), 名称);
    犬->基类.发出声音 = (void (*)(动物类 *))犬类_发出声音;
}

void 犬类_发出声音(动物类 *动物)
{
    printf("%s汪汪叫\n", 动物->名称);
}

// 异常处理示例（使用错误码）
int 除法运算(int 被除数, int 除数, double *结果)
{
    if (除数 == 0)
    {
        printf("错误：除数不能为零\n");
        return -1; // 错误码
    }
    *结果 = (double)被除数 / 除数;
    return 0; // 成功
}

// 列表推导式示例（C语言中的等效实现）
int *生成平方数列表(void)
{
    int 数字列表[] = {1, 2, 3, 4, 5};
    int 数字个数 = sizeof(数字列表) / sizeof(数字列表[0]);

    // 动态分配内存来存储结果
    int *平方数列表 = (int *)malloc(数字个数 * sizeof(int));
    if (平方数列表 == NULL)
    {
        return NULL;
    }

    int 计数 = 0;
    for (int i = 0; i < 数字个数; i++)
    {
        if (数字列表[i] % 2 == 1)
        { // 奇数
            平方数列表[计数++] = 数字列表[i] * 数字列表[i];
        }
    }

    // 如果需要，可以重新调整内存大小
    平方数列表 = (int *)realloc(平方数列表, 计数 * sizeof(int));

    return 平方数列表;
}