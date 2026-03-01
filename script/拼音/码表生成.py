from io import StringIO
import os
import json

多重多音表第二音标 = {
    # 下面注释的第一个字母为第一音标、第二个字母为第二音标（第三、第四音标丢弃）
    '恶': 'w', # e w l
    '石': 'd', # s d l
    '藏': 'z', # c z s
    '见': 'x', # j x c
    '疐': 's', # z s m
    '齐': 'j', # q j z
    '将': 'q', # j q a
    '被': 'p', # b p c
    '卒': 'c', # z c f
    '吭': 'h', # k h g
    '单': 's', # d s c
    '窾': 'z', # k z y t
    '擿': 't', # z t f
    '伽': 'j', # g j q
    '熯': 'h', # r h s
    '燋': 'j', # q j z
    '籓': 'f', # p f z
    '儗': 'n', # y n l
    '埶': 'z', # y z x
    '愒': 'k', # q k a y
}


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
        if 字 in 多重多音表第二音标:
            不含标准首字母码表[字] = 多重多音表第二音标[字]
        else:
            for 首字母 in 首字母串:
                if 首字母 != 标准首字母:
                    不含标准首字母码表[字] = 首字母

    with open(
        os.path.realpath(os.path.join(__file__, "..", "拼音多音字码表.ts")),
        "w",
        encoding="utf-8",
    ) as f:
        f.write("export const 拼音多音字码表 = ")
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
    print("✅ 精简后的词表已经生成到本文件同目录下的：拼音多音字码表.ts")
