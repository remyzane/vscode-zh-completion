# Go 中文命名示例

## 环境准备

请先安装本插件和 [Go 语言支持插件](https://marketplace.visualstudio.com/items?itemName=golang.go)

## 编写代码

- 安装完成后，就可以使用中文命名了（如：类名、方法名）。
- 本插件将为您提供：中文标识符的快速自动补全。
- _Go包名须小写；导出标识符须大写开头（请加前缀 T，补全时插件会为您忽略 T）_

## 验证示例

本项目中的示例代码已通过编译器验证，可正常编译与运行。

### 编译命令

```bash
go build
```

### 运行命令

```bash
go run main.go
```

### 其他命令

```bash
# 检查代码但不编译
go vet

# 运行测试
go test

# 清理构建文件
go clean

# 格式化代码
go fmt

# 生成文档
go doc
```
