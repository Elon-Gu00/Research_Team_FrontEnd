# ResearchTeam - 研究团队管理系统

## 项目简介

ResearchTeam 是一个基于 Vue 3 构建的研究团队管理系统，提供团队信息展示、论文管理、报告提交、通知公告等功能。系统分为前台用户端和后台管理端，满足研究团队日常管理和信息展示的需求。

## 技术栈

### 核心框架

- **Vue 3.5.26** - 渐进式 JavaScript 框架
- **Vite 7.3.0** - 下一代前端构建工具
- **Vue Router 4.6.4** - Vue.js 官方路由管理器
- **Pinia 3.0.4** - Vue 3 状态管理库（支持持久化）

### UI 组件库

- **Element Plus 2.13.0** - 基于 Vue 3 的企业级 UI 组件库
- **@wangeditor/editor 5.1.23** - 富文本编辑器

### 工具库

- **Axios 1.13.3** - HTTP 请求库
- **lodash-es 4.17.21** - JavaScript 实用工具库
- **nprogress 0.2.0** - 页面加载进度条
- **zipson 0.2.12** - 高性能 JSON 压缩/解压缩库

### 开发工具

- **Sass 1.97.3** - CSS 预处理器
- **ESLint 9.39.2** - 代码质量检查工具
- **Prettier 3.7.4** - 代码格式化工具
- **unplugin-auto-import** - 自动导入 API
- **unplugin-vue-components** - 按需自动导入组件
- **unplugin-icons** - 图标库自动导入

## 项目结构

```
src/
├── assets/           # 静态资源（样式、图标等）
├── components/       # 公共组件
├── hooks/           # 自定义组合式函数
├── layouts/         # 布局组件
├── router/          # 路由配置
│   ├── index.js
│   └── routes/      # 路由模块
│       ├── basic.js    # 基础路由
│       ├── admin.js    # 后台管理路由
│       └── user.js     # 用户前台路由
├── service/         # API 服务层
├── stores/          # Pinia 状态管理
├── utils/           # 工具函数
├── views/           # 页面组件
│   ├── login.vue           # 登录页
│   ├── index.vue           # 首页
│   ├── notFound.vue        # 404 页面
│   ├── front/              # 前台页面
│   │   ├── paper/          # 论文浏览
│   │   ├── report/         # 报告浏览与提交
│   │   ├── team/           # 团队展示
│   │   ├── notice/         # 通知公告
│   │   ├── mine/           # 个人中心
│   │   ├── search.vue      # 搜索
│   │   └── newsDetail.vue  # 新闻详情
│   └── managementSys/      # 后台管理
│       ├── user/           # 用户管理
│       ├── team/           # 团队管理
│       ├── teamMember/     # 团队成员管理
│       ├── paper/          # 论文管理
│       ├── news/           # 新闻管理
│       ├── notice/         # 通知管理
│       └── report/         # 报告管理
├── App.vue          # 根组件
└── main.js          # 应用入口
```

## 功能模块

### 1. 用户认证

- 登录/登出功能
- 路由权限控制
- 请求拦截与取消

### 2. 前台功能 (/user)

- **论文浏览**：查看研究团队发表的论文
- **报告管理**：浏览和提交研究报告
- **团队展示**：展示团队信息和成员详情
- **通知公告**：查看系统通知和公告
- **个人中心**：管理个人信息和设置
- **智能搜索**：搜索论文、报告、新闻等内容
- **新闻详情**：查看新闻详细内容

### 3. 后台管理 (/manageSys)

- **用户管理**：管理系统用户信息
- **团队管理**：管理研究团队基本信息
- **团队成员管理**：管理团队成员及其角色
- **论文管理**：管理论文的发布、编辑和删除
- **新闻管理**：管理新闻内容的发布和维护
- **通知管理**：发布和管理系统通知
- **报告管理**：审核和管理用户提交的报告

## 开发环境

### 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- 包管理器: pnpm

### 安装依赖

```bash
pnpm install
```

### 开发运行

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

## 特色功能

1. **路由守卫**：基于 Pinia 状态的路由权限控制
2. **请求拦截**：统一的请求/响应拦截和请求取消机制
3. **自动导入**：API 和组件的自动按需导入
4. **持久化存储**：Pinia 状态持久化，刷新不丢失
5. **富文本编辑**：集成 wangEditor 支持富文本内容编辑
6. **进度条**：页面切换时显示加载进度
7. **响应式布局**：基于 Element Plus 的响应式设计
8. **中文本地化**：完整的中文界面支持

## 浏览器支持

推荐使用以下浏览器以获得最佳体验：

- Chrome（推荐）
- Edge
- Firefox
- Safari

### 开发者工具

- Chrome: [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 作者

- **Gyl** - 项目开发者

## 许可证

本项目为私有项目，仅供内部使用。

---

*最后更新时间：2026-04-07*
