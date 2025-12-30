import { 补全码编码器 } from '../码表';
import * as vsc from '../接口封装';

export abstract class 语言基类 {
    public 触发字符!: string[];
    public 无需矫正补全锚点?: boolean;  // 默认矫正补全锚点（大部分无需矫正补全锚点的语言，矫正补全锚点也能正常补全）
    // public 补全锚点配置?: 锚点配置T;

    public 需要矫正补全锚点(文档: vsc.TextDocument): boolean {
        // vsc.log(`需要矫正补全锚点：${!this.无需矫正补全锚点} `);
        return !this.无需矫正补全锚点;
    }

    async 获得系统补全(
        文档: vsc.TextDocument, 光标位置: vsc.Position, 补全锚点: vsc.Position
    ): Promise<vsc.CompletionList<vsc.CompletionItem>> {
        const 系统补全 = await vsc.commands.executeCommand<vsc.CompletionList>(
            'vscode.executeCompletionItemProvider',
            文档.uri,
            补全锚点
        );
        return 系统补全;
    }

    生成中文补全(编码器: 补全码编码器, 系统补全: vsc.CompletionItem[], 输入值: string): vsc.CompletionItem[] {
        const 补全列表 = 系统补全.filter(
            (补全项) => this.过滤补全项(补全项, 输入值)
        );
        for (var 补全项 of 补全列表) {
            this.设置补全码(补全项, 编码器);
        }
        return 补全列表;
    }

    获取补全项文本(补全项: vsc.CompletionItem): string {
        // filterText
        let 补全项文本 = 补全项.filterText;
        // label.label
        补全项文本 = 补全项文本 || (补全项.label as vsc.CompletionItemLabel).label;
        // label
        return 补全项文本 || 补全项.label as string;
    }

    设置补全码(补全项: vsc.CompletionItem, 编码器: 补全码编码器) {
        const 补全项文本 = this.获取补全项文本(补全项);
        补全项.filterText = 编码器.生成补全码(补全项文本);
    }

    /** 弃用：会破坏原有排序权重 */
    // 设置排序权重(补全项: vsc.CompletionItem, 文本标签: string) {
    //     // 中文项前排显示（要求首字符为中文）
    //     if (/^[\u4e00-\u9fa5]/.test(文本标签)) {
    //         补全项.sortText = `08.8888.${文本标签}`;
    //     }
    // }

    protected 过滤补全项(补全项: vsc.CompletionItem, 输入值: string): boolean {
        const 标签值 = (补全项.label as any).label ? (补全项.label as any).label : 补全项.label;
        // vsc.log(`标签值：${标签值}`);

        // 检查是否包含中文字符
        const 包含中文 = /[\u4e00-\u9fa5\u3007]/.test(标签值);
        if (!包含中文) {
            return false;
        }

        // 检查是否与当前输入值相同
        if (标签值 === 输入值) {
            return false;
        }

        // 检查是否为Snippet类型
        if (补全项.kind === vsc.CompletionItemKind.Snippet) {
            return false;
        }

        return true;
    }
}

// export interface 锚点配置T {
//     /** 判断一个字符是否属于标识符（如变量名中的字符） */
//     // 是否标识符字符: (字符: string) => boolean;

//     /** 补全锚点最大矫正距离，防止向左扫描过远影响性能 */
//     补全锚点最大矫正距离?: number;
// }
