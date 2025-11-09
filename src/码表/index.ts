import * as vsc from '../接口封装';

export type 补全码编码器T = {
}

export abstract class 补全码编码器 {
    protected 输入习惯!: string;

    配置(输入习惯: string) {
        this.输入习惯 = 输入习惯;
    };

    abstract 生成补全码(补全项: vsc.CompletionItem): void;
}

export async function 载入编码器(输入习惯: string): Promise<补全码编码器> {
    // 根据用户的输入法习惯，选择编码器
    let 编码器: 补全码编码器;
    switch (输入习惯) {
        case '拼音':
        case '声笔简码':
        case '声笔简拼':
            编码器 = (await import('./拼音.js')).default.default;
            break;
        case '五笔86版':
            编码器 = (await import('./五笔86版.js')).default.default;
            break;
        case '五笔98版':
            编码器 = (await import('./五笔98版.js')).default.default;
            break;
        default:
            throw new Error(`未知输入法: ${输入习惯}`);
    }
    // 根据用户的输入法习惯，配置编码器
    编码器.配置(输入习惯);
    return 编码器;
}
