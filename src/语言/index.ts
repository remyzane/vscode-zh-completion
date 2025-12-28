import { 语言基类, 锚点配置T } from './基类';
import 通用语言实现 from './通用实现';
import html from './实现/html';
import java from './实现/java';
import xml from './实现/xml';
import javascript from './实现/javascript';
import json from './实现/json';
import python from './实现/python';
import rust from './实现/rust';
import sql from './实现/sql';
import typescript from './实现/typescript';

export type { 锚点配置T };
export { 语言基类, 通用语言实现 };

export const 语言配置表: { [语言: string]: 语言基类 } = {
    html,
    java,
    xml,
    javascript,
    json,
    python,
    rust,
    sql,
    typescript,
};

export const 已配置的语言 = new Set(Object.keys(语言配置表));

// https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers
// 各语言单独注册，以便提高补全器等级（等级太低会被 VSCode 忽略）
export const 已知语言 = new Set([
    "abap", "bat", "bibtex", "clojure", "coffeescript", "c", "cpp", "csharp", "css", "cuda-cpp", "d", "dart", "pascal",
    "diff", "dockerfile", "erlang", "fsharp", "git-commit", "git-rebase", "go", "groovy", "handlebars", "haml",
    "haskell", "html", "ini", "java", "javascript", "javascriptreact", "json", "jsonc", "julia", "latex", "less", "lua",
    "makefile", "markdown", "objective-c", "objective-cpp", "ocaml", "perl", "perl6", "php", "plaintext", "powershell",
    "pug", "python", "r", "razor", "ruby", "rust", "scss", "sass", "shaderlab", "shellscript", "slim", "sql", "stylus",
    "svelte", "swift", "typescript", "typescriptreact", "tex", "vb", "vue", "vue-html", "xml", "xsl", "yaml"
]);
