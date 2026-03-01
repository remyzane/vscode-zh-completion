from io import StringIO
import os
import json



def 多音字码表生成():
    """生成多音字首字母码表（不含标准首字母）"""
    多音字码表 = {}
    for 单词, 首字母 in 多音字词表.items():
        for index in range(0, len(单词)):
            单字 = 单词[index]
            单首字母 = 首字母[index]
            if 单首字母 != ' ':
                if 单字 not in 多音字码表:
                    多音字码表[单字] = ''
                if 单首字母 not in 多音字码表[单字]:
                    多音字码表[单字] += 单首字母
    不含标准首字母码表 = {}
    for 字, 首字母串 in 多音字码表.items():
        标准首字母 = 拼音码表[ord(字) - 19968]
        不含标准首字母串 = ''
        for 首字母 in 首字母串:
            if 首字母 != 标准首字母:
                不含标准首字母串 += 首字母
        if 不含标准首字母串:
            不含标准首字母码表[字] = 不含标准首字母串

    with open(
        os.path.realpath(os.path.join(__file__, "..", "多音字码表.ts")),
        "w",
        encoding="utf-8",
    ) as f:
        f.write("export const 多音字码表 = ")
        f.write(json.dumps(不含标准首字母码表, ensure_ascii=False, separators=(",", ":")))
        f.write(";")


if __name__ == "__main__":
    # 读取「拼音码表.txt」来源：https://github.com/yuxino/pyfl/blob/master/src/dict/firstletter.ts
    拼音码表文件 = os.path.realpath(os.path.join(__file__, "..", "拼音码表.txt"))
    with open(拼音码表文件, "r", encoding="utf-8") as f:
        拼音码表 = f.read().strip()
    # 读取「多音字词表.json」
    多音字词表文件 = os.path.realpath(
        os.path.join(__file__, "..", "多音字词表.json")
    )
    with open(多音字词表文件, "r", encoding="utf-8") as f:
        多音字词表 = json.load(f)
    多音字码表生成()
    print("✅ 精简后的词表已经生成到本文件同目录下的：多音字码表.ts")
