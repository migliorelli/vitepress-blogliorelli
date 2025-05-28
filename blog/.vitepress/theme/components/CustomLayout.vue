<template>
  <Layout>
    <template #doc-before>
      <PostTitle />
      <PostTags />
    </template>

    <template #doc-after>
      <div>
        <button @click="back">cd ··</button>
      </div>
      <!-- <Comments /> -->
    </template>

    <template #home-hero-before>
      <Home />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Home from "./Home.vue";
import PostTitle from "./post/PostTitle.vue";
import PostTags from "./post/PostTags.vue";

import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;

function back() {
  window.history.back();
}
</script>

<style lang="css" scoped>
button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
}

button:hover {
  background-color: var(--vp-c-bg-strong);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
</style>
