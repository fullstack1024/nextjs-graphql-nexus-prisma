# 🚀 Fullstack Example with Next.js (GraphQL API)

基于 [graphql-nextjs](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nextjs) 示例，补充一些功能
- 增加 schema 目录，模块管理
- 把 api/index.ts 改为 graphql.ts，保留项目暴露其它 API
- 补充接口描述，用于显示在接口文档（landing-pages）
- 将 prisma 挂载到 GraphQL server 的上下文中，方便调用
- [ 待补充 ] 鉴权
- [ 待补充 ] 增加 Acro Design Pro
- [ 待补充 ] 插件生成 CRUD 方法

## 快速开始

### 1. 安装依懒

```
pnpm install
or
npm install
```

### 2. 初始化数据表

节约学习成本，默认是 SQLite，它文件形式的数据库，无需安装环境，可替换

```
prisma migrate dev --name init
```
当对新创建的数据库执行 prisma-migrate-dev 时，也会触发 prisma/seed 执行，填充初始化默认数据


### 3. 启动

```
pnpm dev
or
npm run dev
```

程序正在运行,
- 访问 [`http://localhost:3000/`](http://localhost:3000/) 
- 接口文档访问 [`http://localhost:3000/api/graphql`](http://localhost:3000/api/graphql)

## 其它
### 1. 数据库客户端
用于浏览数据和可视化操作数据
```
pnpm studio
or
npm run studio
```
已启动，访问 [`http://localhost:5555/`](http://localhost:5555/)

### 3. 手动生成 prisma client 配置和 TS 声明
其实每次安装依赖包和访问接口，也会自动生成，详见 api/graphql.ts 中的 outputs。这里是手动生成示例
```
pnpm generate
or
npm run generate
```
