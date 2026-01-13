<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { page } = useData();

// page.value.relativePath is the source markdown path (SSR-safe)
const mdPath = computed(() => page.value?.relativePath || null);
const rawUrl = computed(() => (mdPath.value ? `/__raw/${mdPath.value}` : null));

async function copy() {
  if (!rawUrl.value) return;
  const res = await fetch(rawUrl.value, { cache: "no-cache" });
  if (!res.ok) return;
  const text = await res.text();

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }

  if (typeof document !== "undefined") {
    const btn = document.getElementById("kb-copy-btn");
    if (btn) {
      const old = btn.textContent || "Скопировать как Markdown";
      btn.textContent = "Скопировано";
      setTimeout(() => (btn.textContent = old), 1200);
    }
  }
}
</script>

<template>
  <div class="kb-actions" v-if="rawUrl">
    <a class="kb-btn" :href="rawUrl" target="_blank" rel="noreferrer">Посмотреть как Markdown</a>
    <button id="kb-copy-btn" class="kb-btn" type="button" @click="copy">Скопировать как Markdown</button>
  </div>
</template>
