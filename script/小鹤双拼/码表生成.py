from io import StringIO
import os
import json


def 码表生成():
    """返回 unicode码表 19968 ~ 40869 所有汉字的双拼双字母组成的字符串（码表中没有就用双空格代替）"""
    # 字典来源 https://gitee.com/Program-in-Chinese/vscode_Chinese_Input_Assistant/blob/master/字典/xiaohe.dict.txt
    字词混合码文件 = os.path.realpath(os.path.join(__file__, "..", "字词混合码表.txt"))
    with open(字词混合码文件, "r", encoding="utf-8") as f:
        字词混合码表 = f.readlines()
    双拼字典={}
    for 字词字典 in 字词混合码表:
        字词, 字母 = 字词字典.split()[:2]
        if len(字词) == 1 and len(字母) == 2:
            双拼字典[字词] = 字母
    # print(码表)
    # print(40869 - 19968, len(码表))
    码表 = ''
    for 数字代码 in range(19968, 40870):  # 包含 40869
        汉字 = chr(数字代码)
        双字母 = 双拼字典.get(汉字, "  ")
        码表 += 双字母

    print('private 码表: string = "{}";'.format(码表))


if __name__ == "__main__":
    码表生成()
