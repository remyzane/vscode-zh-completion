import { uniqWith } from 'ramda';
import * as vsc from './接口封装';
import { env } from './环境配置';
import { 语言基类, 已知语言, 语言配置表, 通用语言实现 } from './语言';

// 如果超过这个距离，则不再向前搜索「触发字符」了
export const 补全锚点最大矫正距离 = 40;  // 正常 40 就足够了（一般都能在40个字母内筛选出候选）（如有需要可以调大，性能影响不大）

export function 注册已知语言补全器(context: vsc.ExtensionContext, 语言: string, 触发字符: string[], 未配置 = false) {
    vsc.输出给开发(`注册${未配置 ? '通用' : ''}补全器：${语言}, 触发字符：${触发字符}`);
    context.subscriptions.push(
        vsc.languages.registerCompletionItemProvider(
            { language: 语言 },
            { provideCompletionItems: 补全实现, resolveCompletionItem: () => null },
            ...触发字符
        )
    );
}

export function 注册未知语言补全器(context: vsc.ExtensionContext) {
    vsc.输出给开发(`注册未知语言补全器：*，触发字符：${通用语言实现.触发字符}`);
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
    const 锚点 = 语言.需要矫正补全锚点(文档) ? 矫正补全锚点(文档, 位置) : 位置;

    if (env.调试模式) {
        vsc.输出给用户(`开始补全----------------`);
        vsc.输出给用户(`补全「${输入值}」${文档.fileName}, ${文档.languageId}, ${锚点.line + 1}:${锚点.character}`);
    }

    // 获得系统补全器
    env.获得系统补全中 = true;
    try {
        var 系统补全器 = await 语言.获得系统补全(文档, 位置, 锚点);
    } finally {
        env.获得系统补全中 = false; // 即使 await 抛错，也会执行
    }

    // 获取系统补全项
    let 系统补全列表: vsc.CompletionItem[] = 系统补全器.items;

    // 忽略 VSCode 自带的文本建议（带有 abc 图标、基于当前文件中已出现单词的补全项）
    系统补全列表 = 系统补全列表.filter(item => item.kind !== vsc.CompletionItemKind.Text);

    // 去重
    系统补全列表 = uniqWith(
        (a, b) =>
            a.kind === b.kind &&
            (typeof a.label === 'string' ? a.label : (a.label as any).label) ===
            (typeof b.label === 'string' ? b.label : (b.label as any).label),
        系统补全列表
    );

    if (env.调试模式) {
        for (const 补全项 of 系统补全列表) { vsc.输出给用户(`系统补全项：${JSON.stringify(补全项)}`); }
    }

    const 补全列表 = 语言.生成中文补全(env.编码器, 系统补全列表, 输入值);

    if (env.调试模式) {
        for (const 补全项 of 补全列表) { vsc.输出给用户(`中文补全项：${JSON.stringify(补全项)}`); }
    }

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

/**
 * 矫正补全锚点
 * c、c++、python 的语言服务器会根据输入过滤（要取得所有补全项，必须更改补全锚点位置）
 * 根据当前光标位置，智能推断最合适的“补全建议触发位置”
 * 策略：向左跳过当前标识符 → 检查是否紧邻语法边界 → 返回边界后或词首位置
 * @param 文档 当前编辑的文档
 * @param 位置 当前光标位置
 * @returns 推荐的补全锚点位置
 */
export function 矫正补全锚点(文档: vsc.TextDocument, 位置: vsc.Position): vsc.Position {
    const 行文本 = 文档.lineAt(位置.line).text;
    const 语言标识 = 文档.languageId;
    const 矫正前锚点 = 位置.character;
    const 语言 = (语言配置表 as { [key: string]: 语言基类 })[语言标识] || 通用语言实现;

    let 当前索引 = 矫正前锚点 - 1; // 锚点所在位置为空光标，前一位才是最后字符所在位置
    let 已回退步数 = 0;

    while (当前索引 >= 0 && 已回退步数 < 补全锚点最大矫正距离) {
        const 字符 = 行文本[当前索引];
        if (语言.触发字符.includes(字符)) {
            // 找到触发字符，锚点移到其后
            let 矫正后锚点 = 当前索引 + 1;
            while (矫正后锚点 < 矫正前锚点 && /\s/.test(行文本[矫正后锚点])) {
                矫正后锚点++;
            }
            if (env.调试模式){
                vsc.输出给用户(`矫正补全锚点到：${矫正后锚点}`);
            }
            return new vsc.Position(位置.line, 矫正后锚点);
        }
        当前索引--;
        已回退步数++;
    }
    return new vsc.Position(位置.line, 矫正前锚点);
}
