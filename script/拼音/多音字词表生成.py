from io import StringIO
import os
import json


def 转为首字母_含多音匹配(待处理文本: str, 拼音多音字词表: dict[str, str]):
    """要求全局得有`拼音码表`变量，否则请修改参数列表再使用"""
    缓冲区 = StringIO()
    文本长度 = len(待处理文本)
    i = 0
    while i < 文本长度:
        是否匹配 = False
        匹配长度 = 0
        短语 = ""

        # 优先匹配4字符短语
        if i + 4 <= 文本长度:
            key = 待处理文本[i : i + 4]
            if key in 拼音多音字词表:
                是否匹配 = True
                匹配长度 = 4
                短语 = key

        # 未匹配则尝试3字符
        if not 是否匹配 and i + 3 <= 文本长度:
            key = 待处理文本[i : i + 3]
            if key in 拼音多音字词表:
                是否匹配 = True
                匹配长度 = 3
                短语 = key

        # 未匹配则尝试2字符
        if not 是否匹配 and i + 2 <= 文本长度:
            key = 待处理文本[i : i + 2]
            if key in 拼音多音字词表:
                是否匹配 = True
                匹配长度 = 2
                短语 = key

        if 是否匹配:
            # 处理匹配到的短语
            value = 拼音多音字词表[短语]
            for j in range(匹配长度):
                valChar = value[j]
                if valChar == " ":
                    # 空格表示需要查码表
                    字符编码 = ord(待处理文本[i + j])
                    缓冲区.write(拼音码表[字符编码 - 19968])
                else:
                    # 多音字使用多音字码表
                    缓冲区.write(valChar)

            i += 匹配长度  # 跳过整个短语
        else:
            # 无匹配短语，单字符查码表
            字符编码 = ord(待处理文本[i])
            缓冲区.write(拼音码表[字符编码 - 19968])
            i += 1

    return 缓冲区.getvalue()


def 有非标准读音(
    单词: str, 首字母字符串: str, 拼音多音字词表: dict[str, str]
) -> bool | None:
    标准首字母序列 = 转为首字母_含多音匹配(单词, 拼音多音字词表)
    多音首字母序列 = ""
    for 字 in 单词:
        多音首字母 = 首字母字符串[单词.index(字)]
        if 多音首字母 == " ":
            # 用和标准一样的
            多音首字母序列 += 标准首字母序列[单词.index(字)]
        else:
            多音首字母序列 += 多音首字母
    # 对比有没有非标的
    assert len(标准首字母序列) == len(多音首字母序列)
    return 标准首字母序列 != 多音首字母序列


def 拼音多音字词表生成():
    """返回 unicode码表 19968 ~ 40869 所有汉字的五笔首笔画代码组成的字符串"""
    原始词表长度2 = {
        单词: 首字母 for 单词, 首字母 in 拼音多音字原始词表.items() if len(单词) == 2
    }
    原始词表长度3 = {
        单词: 首字母 for 单词, 首字母 in 拼音多音字原始词表.items() if len(单词) == 3
    }
    原始词表长度4 = {
        单词: 首字母 for 单词, 首字母 in 拼音多音字原始词表.items() if len(单词) == 4
    }
    拼音多音字词表 = {}
    for 单词, 首字母 in 原始词表长度2.items():
        if 有非标准读音(单词, 首字母, 拼音多音字词表):
            拼音多音字词表[单词] = 首字母
    for 单词, 首字母 in 原始词表长度3.items():
        if 有非标准读音(单词, 首字母, 拼音多音字词表):
            拼音多音字词表[单词] = 首字母
    for 单词, 首字母 in 原始词表长度4.items():
        if 有非标准读音(单词, 首字母, 拼音多音字词表):
            拼音多音字词表[单词] = 首字母
    with open(
        os.path.realpath(os.path.join(__file__, "..", "拼音多音字词表.ts")),
        "w",
        encoding="utf-8",
    ) as f:
        f.write("export const 拼音多音字词表 = ")
        f.write(json.dumps(拼音多音字词表, ensure_ascii=False, separators=(",", ":")))
        f.write(";")


if __name__ == "__main__":
    # 读取「拼音码表.txt」
    拼音码表文件 = os.path.realpath(os.path.join(__file__, "..", "拼音码表.txt"))
    with open(拼音码表文件, "r", encoding="utf-8") as f:
        拼音码表 = f.read().strip()
    # 读取「多音字原始词表.json」
    多音字原始词表文件 = os.path.realpath(
        os.path.join(__file__, "..", "多音字原始词表.json")
    )
    with open(多音字原始词表文件, "r", encoding="utf-8") as f:
        拼音多音字原始词表 = json.load(f)
    # 测试代码
    # txt = input("请输入待处理文本:")
    # while txt != "":
    #     print("转换结果:", 转为首字母_含多音匹配(txt, 拼音多音字原始词表))
    #     txt = input("请输入待处理文本:")
    拼音多音字词表生成()
    print("✅ 精简后的词表已经生成到本文件同目录下的：拼音多音字词表.ts")
