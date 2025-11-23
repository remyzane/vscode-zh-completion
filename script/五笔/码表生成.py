import os
import string


def 五笔码表生成(五笔原始码表)-> str:
    """返回 unicode码表 19968 ~ 40869 所有汉字的五笔首笔画代码组成的字符串"""
    result_chars = []
    for code in range(19968, 40870):  # 包含 40869
        char = chr(code)
        # result_chars.append(char)
        index = 五笔原始码表.index(char)
        code = 五笔原始码表[index - 4: index]
        if code[0] in string.ascii_uppercase:
            result_chars.append(code[0])        # 四字母编码（如：GGLL一）
        else:
            result_chars.append(code[1])        # 三字script/码表生成.py母编码（如：SGH丁）
    return ''.join(result_chars).lower()


if __name__ == '__main__':
    # 数据来源：https://www.npmjs.com/package/wubi-code?activeTab=code
    # 读取「86码表.txt」
    五笔86文件 = os.path.realpath(os.path.join(__file__, '..', '86码表.txt'))
    with open(五笔86文件, 'r', encoding='utf-8') as f:
        五笔86 = f.read().strip()
    # 读取「86码表.txt」
    五笔98文件 = os.path.realpath(os.path.join(__file__, '..', '98码表.txt'))
    with open(五笔98文件, 'r', encoding='utf-8') as f:
        五笔98 = f.read().strip()
    print('五笔86：')
    print(五笔码表生成(五笔86))
    print(os.linesep * 3)
    print('五笔98：')
    print(五笔码表生成(五笔98))
