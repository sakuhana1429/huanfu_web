import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '幻服 · MC 服务器',
  description: '幻服 MC 服务器介绍与服务器史书',
  cleanUrls: true,
  lastUpdated: true,

  vite: {
    build: {
      rollupOptions: {
        // pagefind 索引脚本由构建后的 pagefind CLI 生成，浏览器运行时按 /pagefind/ 路径加载
        external: ['/pagefind/pagefind.js']
      }
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '服务器介绍', link: '/intro' },
      { text: '服务器史书', link: '/history/' },
      { text: '后台管理', link: '/admin/' }
    ],
    sidebar: {
      '/history/': [
        {
          text: '服务器史书',
          items: [
            { text: '总目录', link: '/history/' },
            { text: '〇〇 · 前言', link: '/history/00-前言' },
            { text: '第一章 · 创世', link: '/history/01-创世' },
            { text: '第二章 · 拓荒', link: '/history/02-拓荒' },
            { text: '第三章 · 春秋', link: '/history/03-春秋' },
            { text: '第四章 · 变革', link: '/history/04-变革' },
            { text: '第五章 · 动荡', link: '/history/05-动荡' },
            { text: '第六章 · 复兴', link: '/history/06-复兴' },
            { text: '第七章 · 盛世', link: '/history/07-盛世' },
            { text: '第八章 · 现世', link: '/history/08-现世' },
            { text: '第九章 · 番外', link: '/history/09-番外' }
          ]
        }
      ],
      '/intro': [
        {
          text: '服务器介绍',
          items: [{ text: '欢迎来到幻服', link: '/intro' }]
        }
      ]
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
    search: false
  }
})
