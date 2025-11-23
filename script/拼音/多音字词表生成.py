import os
import json


def 有非标准读音(单词: str, 首字母字符串: str) -> bool | None:
    for 字 in 单词:
        多音首字母 = 首字母字符串[单词.index(字)]
        if 多音首字母 != ' ':
            标准首字母 = 拼音码表[ord(字) - 19968]
            if 多音首字母 != 标准首字母:
                return True


def 拼音多音字词表生成():
    """返回 unicode码表 19968 ~ 40869 所有汉字的五笔首笔画代码组成的字符串"""
    拼音多音字词表 = {}
    for 单词, 首字母 in 拼音多音字原始词表.items():
        if 有非标准读音(单词, 首字母):
            拼音多音字词表[单词] = 首字母
    print(json.dumps(拼音多音字词表, ensure_ascii=False, separators=(',', ':')))


if __name__ == '__main__':
    # 读取「拼音码表.txt」
    拼音码表文件 = os.path.realpath(os.path.join(__file__, '..', '拼音码表.txt'))
    with open(拼音码表文件, 'r', encoding='utf-8') as f:
        拼音码表 = f.read().strip()
    # 读取「多音字原始词表.json」
    多音字原始词表文件 = os.path.realpath(os.path.join(__file__, '..', '多音字原始词表.json'))
    with open(多音字原始词表文件, 'r', encoding='utf-8') as f:
        拼音多音字原始词表 = json.load(f)
    拼音多音字词表生成()
