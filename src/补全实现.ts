import { uniqWith } from 'ramda';
import * as vsc from './接口封装';
import { 通用语言实现, 语言配置表, 已知语言 } from './语言';
import { env } from './环境配置';

export function 注册已知语言补全器(context: vsc.ExtensionContext, 语言: string, 触发字符: string[], 未配置 = false) {
    vsc.log(`注册${未配置 ? '通用' : ''}补全器：${语言}, 触发字符：${触发字符}`);
    context.subscriptions.push(
        vsc.languages.registerCompletionItemProvider(
            { language: 语言 },
            { provideCompletionItems: 补全实现, resolveCompletionItem: () => null },
            ...触发字符
        )
    );
}

export function 注册未知语言补全器(context: vsc.ExtensionContext) {
    vsc.log(`注册未知语言补全器：*，触发字符：${通用语言实现.触发字符}`);
    context.subscriptions.push(
        vsc.languages.registerCompletionItemProvider(
            { language: '*' },
            { provideCompletionItems: 未知语言补全实现, resolveCompletionItem: () => null },
            ...通用语言实现.触发字符
        )
    );
}

export async function 补全实现(
    文档: vsc.TextDocument, 位置: vsc.Position, token: vsc.CancellationToken, context: vsc.CompletionContext
) {
    const 输入值 = vsc.获得输入值();

    if (env.获得系统补全中) { return []; }  // 避免无限循环（调用'获得系统补全'时会调用'提供补全'函数, 这会导致无限循环）

    const 语言 = 语言配置表[文档.languageId] || 通用语言实现;
    const 锚点 = 语言.需要矫正锚点(文档) ? vsc.矫正补全锚点(文档, 位置) : 位置;

    vsc.log(`补全「${输入值}」${文档.fileName}, ${文档.languageId}, ${锚点.line}:${锚点.character}`);

    // 获得系统补全
    env.获得系统补全中 = true;
    try {
        var 系统补全器 = await 语言.获得系统补全(文档, 位置, 锚点);
    } finally {
        env.获得系统补全中 = false; // 即使 await 抛错，也会执行
    }

    // 去重
    let 系统补全列表: vsc.CompletionItem[] = uniqWith((a, b) => a.label === b.label, 系统补全器.items);

    // 检查类型
    系统补全列表 = 系统补全列表.filter(补全项 => (typeof 补全项.label === 'string' || typeof 补全项.label.label === 'string'));

    // for (const 补全项 of 系统补全列表) { vsc.log(`系统补全项：${JSON.stringify(补全项)}`); }

    const 补全列表 = 语言.生成中文补全(env.编码器, 系统补全列表, 输入值);

    // for (const 补全项 of 补全列表) { vsc.log(`补全项：${JSON.stringify(补全项)}`); }

    return new vsc.CompletionList(补全列表, true);
}

export async function 未知语言补全实现(
    文档: vsc.TextDocument, 位置: vsc.Position, token: vsc.CancellationToken, context: vsc.CompletionContext
) {
    // 如果语言已配置，则不做处理（避免重复处理）
    if (已知语言.has(文档.languageId)) {
        return [];
    }
    return await 补全实现(文档, 位置, token, context);
}
