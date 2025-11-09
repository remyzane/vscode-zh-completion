import string

# 数据来源：https://www.npmjs.com/package/wubi-code?activeTab=code
五笔86 = "GGLL一SGH丁GNV丂AGN七HGD丄GHK丅DGT丆DNV万DYI丈DGGG三HHGG上GHI下GJK丌GII不GNGD与GHNN丏GHNV丐NFD丑VYGF丒FNYI专"
五笔98 = "AAAA㠭AAAA工AAAB㐂AAAU菚AAD匞AADJ䘌AADK匿AADN慝AADR茙AAFO蘜AAGF䒰AAHB䓉AAHC菣AAHH茝AAHH茞AAHL藍AAHM藖AAHT芽"
def 五笔码表生成()-> str:
    """返回 unicode码表 19968 ~ 40869 所有汉字的五笔首笔画代码组成的字符串"""
    result_chars = []
    for code in range(19968, 40870):  # 包含 40869
        char = chr(code)
        # result_chars.append(char)
        index = 五笔98.index(char)
        code = 五笔98[index - 4: index]
        if code[0] in string.ascii_uppercase:
            result_chars.append(code[0])        # 四字母编码（如：GGLL一）
        else:
            result_chars.append(code[1])        # 三字母编码（如：SGH丁）
    return ''.join(result_chars).lower()
