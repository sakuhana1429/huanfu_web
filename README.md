# 幻服 Web 项目

幻服 MC 服务器介绍 + 服务器史书 公开网站。
技术栈：VitePress + Markdown + Pagefind 中文搜索 + Sveltia CMS + Cloudflare Pages。

## 常用命令

```bash
npm run docs:dev        # 本地预览（默认 http://localhost:5173）
npm run docs:build      # 构建（含 Pagefind 中文搜索索引）
npm run docs:preview    # 本地预览构建产物
```

## 目录结构

```
docs/                       网站内容（Markdown）
  index.md                  首页
  intro.md                  服务器介绍（可扩充至 3 万字）
  history/                  服务器史书（40 万字，每章一个 Markdown 文件）
  public/images/            插图目录（Markdown 用 /images/xxx.png 引用）
  public/admin/             Sveltia CMS 后台（访问路径 /admin/）
```

## 日常维护

1. **加章节**：在 `docs/history/` 新建 `.md` 文件（如 `10-新章节.md`），并在 `docs/.vitepress/config.ts` 的 sidebar 里加一行。
2. **插图**：图片放 `docs/public/images/`，Markdown 写 `![说明](/images/文件名.png)`。
3. **改内容**：直接编辑 Markdown，或通过 `/admin` 后台可视化编辑。
4. **发布**：`git add . && git commit -m "说明" && git push`，Cloudflare Pages 自动重新构建部署（约 1-2 分钟生效）。

## 待办

- [ ] 第 2 步：git init + 首次提交
- [ ] 第 3 步：GitHub 建仓库 + Cloudflare Pages 部署，拿到免费 pages.dev 域名
- [ ] 第 4 步：Sveltia CMS OAuth 配置（GitHub OAuth App）
