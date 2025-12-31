# SQL 中文命名示例

## 环境配置

请先安装本插件和 [SQL 语言支持插件](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2)

## 创建测试库

```bash
sqlite3 sample.db "VACUUM;"
```

## 配置连接

配置 Database Client 插件：连接数据库到 sample.db

## 连接数据库

编辑 和 执行SQL 前，必须先连接数据库（点一下SQL语言插件的小图标（数据库图标））

## 创建表结构

先创建中文表名和字段名的表结构

## 插入和查询数据

- 表结构创建好后，编辑插入和查询 SQL，就可以使用中文快速补全（如：中文表名、中文字段名）
- 本插件将为您提供：中文标识符的快速自动补全。

## 整体效果

整体表现优秀：

- **主流数据库**对中文命名具有良好的支持；
- **SQL 语言插件**对补全接口的实现也很完善。
