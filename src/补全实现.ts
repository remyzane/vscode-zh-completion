import * as R from 'ramda';
import * as vsc from './接口封装';
import { env } from './环境配置';

/**
补全项格式：{"label": "Case", "kind": "Class", "sortText": "05.0001.Case", "insertText": "Case"}
    - label: 显示在提示框中的具体内容（和 filterText 一样，也用于过滤）.
    - filterText: 过滤补全项（根据该值是否包含输入值）.
    - sortText: 此属性决定排序.
    - insertText: 实际插入的内容.
 */
export async function 补全器实现(
    document: vsc.TextDocument, position: vsc.Position, token: vsc.CancellationToken, context: vsc.CompletionContext
) {
    const 输入值 = vsc.获得输入值();
    vsc.log(`补全「${输入值}」${document.fileName}, ${document.languageId}, ${position.line}:${position.character}`);

    // 获得系统补全
    if (env.获得系统补全中) { return []; }  // 避免无限循环（调用'获得系统补全'时会调用'提供补全'函数, 这会导致无限循环）
    env.获得系统补全中 = true;
    try {
        var 系统补全器 = await vsc.获得系统补全(document, position);
    } finally {
        env.获得系统补全中 = false; // 即使 await 抛错，也会执行
    }

    // 对做系统补全列表以下处理:
    // - 去重.
    // - 过滤不包含中文的补全项.
    // - 过滤现在正在输入的字段.
    // - 过滤自定义的片段(Snippet), 因为无论这个函数是否返回结果, vsc总会带上它们.
    let 补全列表: vsc.CompletionItem[] = R.uniqWith((a, b) => a.label === b.label, 系统补全器.items)
        .filter((补全项) => /[\u4e00-\u9fa5\u3007]/.test(补全项.label.toString())) // 包含中文
        .filter((补全项) => 补全项.label !== 输入值)
        .filter((补全项) => 补全项.kind !== vsc.CompletionItemKind.Snippet);

    // 设置最终结果
    for (var 补全项 of 补全列表) {
        const 补全内容 = 补全项.label.toString();
        const 首字母版 = 转拼音首字母(补全内容 as string || '');
        补全项.filterText = 首字母版;
        补全项.insertText = 补全内容;
        // vsc.log(`${JSON.stringify(补全项)}`);
    }
    return new vsc.CompletionList(补全列表, true);
}


/** 将字符串中的中文转换为拼音首字母：'中国 ❤ china' → 'zg ❤ china' */
export function 转拼音首字母(text: string) {
    let result = [];
    for (let i = 0; i < text.length; i++) {
        let unicode = text.charCodeAt(i);
        let char = text.charAt(i);
        if (unicode >= 19968 && unicode <= 40869) {
            char = env.所有汉字拼音首字母.charAt(unicode - 19968);
        }
        result.push(char);
    }
    return result.join("");
}


// var 高权重列表: vsc.CompletionItem[] = [];  // 和输入值完全一样的、以输入值开头的
// var 低权重列表: vsc.CompletionItem[] = [];  // 包含输入值的
// for (const 补全项 of 系统补全器.items) {
//     const 补全项内容 = 补全项.label as string;
//     const 补全项小写内容 = 补全项内容.toLowerCase();
//     if (补全项内容 === 输入值 || 补全项小写内容 === 输入值) {
//         // 高权重列表.unshift(new vsc.CompletionItem(补全项内容, vsc.CompletionItemKind.Text));
//         高权重列表.unshift(补全项);
//     } else if (补全项内容.startsWith(输入值) || 补全项小写内容.startsWith(输入值)) {
//         高权重列表.push(补全项);
//     } else {
//         const 首字母版 = pyfl(补全项内容 as string || '');
//         const 转小写首字母 = 首字母版.toLowerCase();
//         if (首字母版 === 输入值 || 转小写首字母 === 输入值) {
//             高权重列表.unshift(补全项);
//         } else if (首字母版.startsWith(输入值) || 转小写首字母.startsWith(输入值)) {
//             高权重列表.push(补全项);
//         } else {
//             if (首字母版.includes(输入值) || 转小写首字母.includes(输入值)) {
//                 低权重列表.push(补全项);
//             } else if (补全项内容.includes(输入值) || 补全项小写内容.includes(输入值)) {
//                 低权重列表.push(补全项);
//             }
//         }
//     }
// }
// return new vsc.CompletionList(高权重列表.concat(低权重列表), true);



// // 注册补全器(context, 'python', ['.', ' ']);	//「.」成员访问；「空格」特定上下文（如 import 后）的空格触发补全
// // 注册补全器(context, 'html', ['<', '=', '"', "'", ' ']);	// '<' 开始标签, '=' 赋值, 引号内属性值, 空格分隔 class
// // 注册补全器(context, 'css', [':', '.', '#', ' ']);	// ':' 后属性值, '.' 类, '#' ID, 空格后可能继续属性
// // 注册补全器(context, 'sql', [' ', '.']);	// 空格后常接表名/字段名，但需严格上下文判断
// // 注册补全器(context, 'json', ['"', ':']); // 键值对中的冒号和引号
// // 注册补全器(context, 'yaml', [':', '?', '*']); // 冒号后常接值，问号/星号用于特殊结构
// // 注册补全器(context, 'shell', ['$', '/', '=']); // 变量 $, 路径 /
// // 注册补全器(context, 'markdown', ['#', '*', '-', '+', '`', '[', '(', ' ']); // #标题, *-/+/数字 .列表, `代码块, [(链接
// // 注册补全器(context, 'rust', ['.', ':']); // '::' 用于模块/关联函数
// // 注册补全器(context, 'lua', ['.', ':']);
// // 注册补全器(context, 'csharp', ['.', '[']);
// // 注册补全器(context, 'php', ['.', '->', '::', '$']);
// // 注册补全器(context, '*', ['.']); // 其他编程语言
// export function 注册补全器(context: vsc.ExtensionContext, 语言: string, 触发字符: string[]) {
//     context.subscriptions.push(
//         vsc.languages.registerCompletionItemProvider(
//             { language: 语言 },
//             { provideCompletionItems: 补全器实现, resolveCompletionItem: () => null },
//             ...触发字符
//         )
//     );
// }