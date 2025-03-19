# Directus Demo

这个项目使用 NPM 工作区（Workspaces）来管理多个 Directus 扩展模块，优化了依赖管理和构建流程。

## 项目结构

```
directus001/
├── extensions/             # 扩展模块目录
│   ├── wellcome-message/   # 模块类型扩展
│   ├── current-time/       # 端点类型扩展
│   └── items-create/       # 钩子类型扩展
├── node_modules/           # 共享依赖（避免重复）
├── package.json            # 工作区配置
└── .env                    # Directus 环境配置
```

## 优势

- **共享依赖**：所有扩展共用相同版本的核心依赖（如 `@directus/extensions-sdk`、`typescript` 等）
- **减少磁盘空间**：避免了每个扩展模块重复安装相同的 `node_modules`
- **统一版本控制**：确保所有扩展使用相同版本的依赖
- **简化命令**：支持一键构建所有扩展

## 使用方法

### 构建所有扩展

```bash
npm run build:extensions
```

### 开发模式（监视模式）

```bash
npm run dev:extensions
```

### 添加新扩展

1. 按照正常流程创建新的 Directus 扩展
2. 删除扩展目录中的 `node_modules` 文件夹
3. 从扩展的 `package.json` 中移除 `devDependencies` 部分
4. 如有新依赖，将其添加到根目录的 `package.json` 中

## 注意事项

- 所有扩展的依赖版本由根目录的 `package.json` 控制
- 添加特定扩展依赖时，请确保它们与其他扩展兼容 
