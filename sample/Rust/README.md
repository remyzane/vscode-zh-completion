# Rust 中文命名示例

## 环境准备

请先安装本插件和 [Rust 语言支持插件](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

_如果 Rust 插件当前版本原问题（如 v0.3.2735 输入 self.基类. 会报错）请用老一点的版本（如：v0.3.2527（正常））_

## 编写代码

- 安装完成后，就可以使用中文命名了（如：类名、方法名）。
- 本插件将为您提供：中文标识符的快速自动补全。

## 整体效果

整体表现优秀：

- **Rust 语言本身**对中文命名具有良好的支持；
- **Rust 语言插件**对补全接口的实现也很完善。

## 验证示例

本项目中的示例代码已通过编译器验证，可正常编译与运行。

### 编译命令

```bash
cargo build
```

### 运行命令

```bash
cargo run
```

### 其他命令

```bash
# 检查代码但不编译
cargo check

# 运行测试
cargo test

# 清理构建文件
cargo clean

# 发布构建
cargo build --release
```
