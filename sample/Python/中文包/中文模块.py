from enum import Enum
from collections import namedtuple

# 命名元组示例
学生元组 = namedtuple('学生元组', ['姓名', '年龄', '班级'])


def 中文函数():
    # 枚举示例
    print(f'喜欢的颜色: {颜色枚举.红色.name}')

    学生 = 学生元组('李四', 17, '高二一班')
    print(f'学生信息: {学生.姓名}, {学生.年龄}岁, {学生.班级}')


# 枚举示例
class 颜色枚举(Enum):
    红色 = 1
    绿色 = 2
    蓝色 = 3


# for 循环示例
def 遍历列表():
    水果列表 = ['苹果', '香蕉', '橙子', '葡萄']

    for 水果 in 水果列表:
        print(f'我喜欢吃{水果}')

    # 使用 range 和 enumerate
    for 索引, 水果 in enumerate(水果列表):
        print(f'第{索引 + 1}个水果是{水果}')


# # match 语句示例 (Python 3.10+)
# def 匹配示例(值):
#     match 值:
#         case 0:
#             print('零')
#         case 1 | 2 | 3:
#             print('小数字')
#         case _:
#             print('其他类型')


# # 函数定义和调用示例
# def 计算面积(形状, **参数):
#     match 形状:
#         case '圆形':
#             半径 = 参数.get('半径', 1)
#             return 3.14159 * 半径**2
#         case _:
#             return 0


# 类的继承示例
class 动物类:
    类型 = '未知'

    def __init__(self, 名称):
        self.名称 = 名称

    def 发出声音(self):
        print(f'{self.名称}发出了声音')


class 犬类(动物类):
    def 发出声音(self):
        print(f'{self.名称}汪汪叫')


class 除数不能为零异常(Exception):
    pass


# 异常处理示例
def 除法运算(被除数, 除数):
    try:
        结果 = 被除数 / 除数
        return 结果
    except 除数不能为零异常:
        print('错误：除数不能为零')
        return None


# 列表推导式示例
def 生成平方数列表():
    数字列表 = [1, 2, 3, 4, 5]
    平方数列表 = [数字**2 for 数字 in 数字列表 if 数字 % 2 == 1]
    return 平方数列表
