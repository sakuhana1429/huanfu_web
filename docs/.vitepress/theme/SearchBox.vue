<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')
const open = ref(false)
const loading = ref(false)
const hint = ref('')
const results = ref<{ url: string; title: string; excerpt: string }[]>([])

let pf: any = null

async function loadPagefind() {
  if (pf) return pf
  // Pagefind 索引在构建时生成，线上路径固定为 /pagefind/pagefind.js
  const mod: any = await import(/* @vite-ignore */ '/pagefind/pagefind.js')
  pf = mod
  return pf
}

async function onInput() {
  const q = query.value.trim()
  if (!q) {
    results.value = []
    hint.value = ''
    return
  }
  loading.value = true
  hint.value = ''
  try {
    const pagefind = await loadPagefind()
    const res = await pagefind.search(q)
    const items = res?.results ?? []
    results.value = await Promise.all(
      items.slice(0, 8).map(async (item: any) => {
        const data = await item.data()
        return {
          url: data.url,
          title: data.meta?.title || data.url,
          excerpt: data.excerpt || '',
        }
      })
    )
    if (results.value.length === 0) {
      hint.value = '没有找到相关内容'
    }
  } catch (e) {
    results.value = []
    hint.value = '搜索索引尚未生成，请先执行 npm run docs:build'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="pf-search" @keydown.esc="open = false">
    <input
      v-model="query"
      class="pf-input"
      placeholder="搜索史书 / 介绍…"
      @focus="open = true"
      @input="onInput"
    />
    <div v-if="open && (query || loading)" class="pf-panel">
      <p v-if="loading" class="pf-empty">搜索中…</p>
      <p v-else-if="hint" class="pf-empty">{{ hint }}</p>
      <a
        v-for="r in results"
        :key="r.url"
        :href="r.url"
        class="pf-item"
        @click="open = false"
      >
        <span class="pf-title">{{ r.title }}</span>
        <span v-if="r.excerpt" class="pf-excerpt" v-html="r.excerpt"></span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.pf-search {
  position: relative;
  margin-right: 8px;
}
.pf-input {
  width: 160px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
  transition: width 0.2s;
}
.pf-input:focus {
  width: 220px;
  border-color: var(--vp-c-brand-1);
}
.pf-panel {
  position: absolute;
  top: 42px;
  right: 0;
  width: 320px;
  max-height: 60vh;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: var(--vp-shadow-3);
  z-index: 30;
}
.pf-empty {
  padding: 14px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.pf-item {
  display: block;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.pf-item:hover {
  background: var(--vp-c-bg-soft);
}
.pf-title {
  display: block;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
}
.pf-excerpt {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.5;
}
</style>
