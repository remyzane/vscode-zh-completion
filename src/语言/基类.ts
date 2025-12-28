import { 补全码编码器 } from '../码表';
import * as vsc from '../接口封装';

export abstract class 语言基类 {
    public 触发字符!: string[];
    public 补全锚点配置?: 锚点配置T;

    public 不需要矫正锚点(文档: vsc.TextDocument): boolean {
        return !this.补全锚点配置;
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
            const 文本标签 = (
                (补全项.label as vsc.CompletionItemLabel).label ? (补全项.label as vsc.CompletionItemLabel).label : 补全项.label
            ) as string; // 调用方保证有仅有这两种情况，最后一定能得到string
            this.设置补全码(补全项, 文本标签, 编码器);
            this.设置排序权重(补全项, 文本标签);
        }
        return 补全列表;
    }

    设置补全码(补全项: vsc.CompletionItem, 文本标签: string, 编码器: 补全码编码器) {
        补全项.filterText = 编码器.生成补全码(文本标签);
    }

    设置排序权重(补全项: vsc.CompletionItem, 文本标签: string) {
        // // 中文项前排显示（要求首字符为中文）
        // if (/^[\u4e00-\u9fa5]/.test(文本标签)) {
        //     补全项.sortText = `08.8888.${文本标签}`;
        // }
    }

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

export interface 锚点配置T {
    /** 判断一个字符是否属于标识符（如变量名中的字符） */
    是否标识符字符: (字符: string) => boolean;

    /** 最大回退距离，防止向左扫描过远影响性能 */
    最大回退距离?: number;
}
