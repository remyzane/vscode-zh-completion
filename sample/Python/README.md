# Python 中文命名示例

## 环境准备

请先安装本插件和 [Python 语言支持插件](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)

## 编写代码

- 安装完成后，就可以使用中文命名了（如：类名、方法名）；
- 本插件将为您提供：中文标识符的快速自动补全。

## 整体效果

整体表现良好：

- **Python 语言本身**对中文命名具有良好的支持；
- **Python 语言插件**对补全接口的实现也较为完善。

## 美中不足

- 导入语句中的顶层 Package 名，绕过了常规补全机制（需输入 Package 名）（规避：顶层 Package 名使用英文）；
- 输入 super().c 、super().s  和 super().cs 无法自动唤起补全（会显示 __class__ 可能是它觉得既然已经匹配到了）

## 验证示例

本项目中的示例代码已通过接受器验证，可正常运行。

### 运行命令

```bash
python3 样例.py
```
