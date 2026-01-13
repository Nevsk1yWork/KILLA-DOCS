<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import CopyMarkdown from "./CopyMarkdown.vue";
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <CopyMarkdown />
    </template>
  </DefaultTheme.Layout>
</template>
