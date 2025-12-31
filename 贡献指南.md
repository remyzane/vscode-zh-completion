# 贡献指南

## VSCode 配置文件

菜单 -> 文件 -> 使用配置文件新建窗口

### TS（工作目录：./）

|          VSCode 插件ID                   |          作用                  |
| --------------------------------------- | -----------------------------  |
|   ms-vscode.vscode-typescript-next      |  开发环境  |
|   connor4312.esbuild-problem-matchers   |  测试工具  |

### VS（工作目录：./sample）

https://gitee.com/remyzane/vscode-zh-completion/tree/main#支持的语言

|          VSCode 插件ID                   |          作用                  |
| --------------------------------------- | -----------------------------  |
|   swashata.beautiful-ui                 |  截屏用（统一界面样式）  |
|   editor.cursorBlinking                 |  截屏用（固定光标）  |
|   rampadc.line-highlighter              |  截屏用（高亮焦点行）  |


sample/.vscode/settings.json 已做如下配置（请勿修改）：

|     配置项                 |    配置项值          |       作用         |
| ------------------------- | ------------------  |  ------------------ |
|   workbench.colorTheme    |  βui - Ayu Mirage   |  深色背景（统一截图风格）  |
|   editor.cursorBlinking   |   solid             |  光标不闪烁（方便截屏）  |
|   editor.wordBasedSuggestions |   off           |  基于单词的建议（会干扰测试）  |

## 插件命令

### 创建插件

```bash
# 安装 Yeoman 工具集
npm install -g yo

# 安装 Code 扩展生成器
npm install -g generator-code

# 创建（本项目）
yo code
```

### 调试插件

调试： VSCode 命令栏 -> 开始调试 -> Run Extension

### 生成插件

```bash
# 安装打包环境
npm install -g vsce

# 生成插件
vsce package --no-dependencies

# 发布插件
./publish.sh
```

## 提交规范

### 提交类型

- ✨ 功能：功能实现
- 🐛 修复：问题修复
- ⚡ 优化：性能与体验优化
- 🧹 整理：代码结构与格式清理
- 📦 依赖：依赖库更新
- 💥 重构：架构级重构
- 🧪 测试：测试代码与用例
- 📚 文档：文档与注释更新
- ⛵ 版本：发布版本
- 🌍 部署：环境部署与配置变更
- 🔧 杂项：其他琐碎事项
