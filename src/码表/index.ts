import * as vsc from '../接口封装';
/**
补全项格式：{"label": "Case", "kind": "Class", "sortText": "05.0001.Case", "insertText": "Case"}
    - label: 显示在提示框中的具体内容（和 filterText 一样，也用于过滤）.
    - filterText: 过滤补全项（根据该值是否包含输入值）.
    - sortText: 此属性决定排序.
    - insertText: 实际插入的内容.
 */

export abstract class 补全码编码器 {
    public 输入习惯!: string;

    配置(输入习惯: string) {
        this.输入习惯 = 输入习惯;
    };

    /** 如：拼音 '中国 ❤ china' → 'zg ❤ china' */
    abstract 生成补全码(中文内容: string): string;

}

export async function 载入编码器(输入习惯: string): Promise<补全码编码器> {
    // 根据用户的输入法习惯，选择编码器
    let 编码器: 补全码编码器;
    switch (输入习惯) {
        case '拼音':
        case '声笔简码':
        case '声笔简拼':
            编码器 = (await import('./拼音.js')).default as any;
            break;
        case '五笔86版':
            编码器 = (await import('./五笔86版.js')).default as any;
            break;
        case '五笔98版':
            编码器 = (await import('./五笔98版.js')).default as any;
            break;
        default:
            throw new Error(`未知输入法: ${输入习惯}`);
    }
    // 根据用户的输入法习惯，配置编码器
    编码器.配置(输入习惯);
    return 编码器;
}
