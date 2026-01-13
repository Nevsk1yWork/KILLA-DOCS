<script setup lang="ts">
import { computed } from "vue";

function routeToMd(pathname: string): string | null {
  let p = pathname || "/";
  p = p.replace(/index\.html$/i, "");
  if (!p.startsWith("/")) p = "/" + p;

  if (p === "/" || p === "/index") return "README.md";
  if (p === "/api/methods/" || p === "/api/methods") return "api/methods/README.md";

  let rel = p.slice(1);
  if (rel.endsWith("/")) rel = rel.slice(0, -1);

  return rel + ".md";
}

const mdPath = computed(() => routeToMd(window.location.pathname));
const rawUrl = computed(() => (mdPath.value ? `/__raw/${mdPath.value}` : null));

async function copy() {
  if (!rawUrl.value) return;
  const res = await fetch(rawUrl.value, { cache: "no-cache" });
  if (!res.ok) return;
  const text = await res.text();
  await navigator.clipboard.writeText(text);

  const btn = document.getElementById("kb-copy-btn");
  if (btn) {
    const old = btn.textContent || "Скопировать как Markdown";
    btn.textContent = "Скопировано";
    setTimeout(() => (btn.textContent = old), 1200);
  }
}
</script>

<template>
  <div class="kb-actions" v-if="rawUrl">
    <a class="kb-btn" :href="rawUrl" target="_blank" rel="noreferrer">Посмотреть как Markdown</a>
    <button id="kb-copy-btn" class="kb-btn" type="button" @click="copy">Скопировать как Markdown</button>
  </div>
</template>
