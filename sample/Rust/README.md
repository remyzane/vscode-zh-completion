# Rust语言中文编程样例

本目录包含了与 Python 版本对应的 Rust 语言中文编程样例。

## 文件结构

```
sample/Rust/
├── Cargo.toml         # 项目配置文件
├── src/
│   ├── main.rs        # 主程序文件
│   └── lib.rs         # 库文件（中文模块）
└── README.md          # 说明文档
```
## 编译和运行

### 编译

```bash
cargo build
```

### 运行

```bash
cargo run
```

### 其他有用命令

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