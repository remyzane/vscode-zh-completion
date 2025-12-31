# XML 中文命名示例

## 环境准备

请先安装本插件和 [XML 支持插件](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml)

## 定义 Schema

- 根据 [XML Schema Definition](https://www.w3school.com.cn/schema/index.asp)（XSD）规范文档，
编写中文的文档结构、约束和数据类型定义（如：中文属性名、中文枚举项）

## 编写 XML

- 定义 Schema 后，就可以使用中文属性名、中文枚举项了。
- 本插件将为您提供：中文标识符的快速自动补全。

## 整体效果

整体表现良好：

- **XML 规范本身**对中文命名具有良好的支持；
- **XML 支持插件**对补全接口的实现也较为完善。

## 美中不足

- XSD 规范要求 Schema 文件名不可以使用中文
- 枚举属性值，在创建时绕过了常规补全机制（需要下拉选择 或 输入中文）（修改已经存在的枚举属性值时正常）
