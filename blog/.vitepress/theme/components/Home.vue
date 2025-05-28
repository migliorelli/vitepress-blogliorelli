<template>
  <img
    v-if="page.frontmatter.image"
    class="blog-image"
    :src="page.frontmatter.image"
    :style="{
      maxWidth: page.frontmatter.imageWidth || '768px',
      maxHeight: page.frontmatter.imageHeight || '400px',
    }"
  />

  <h1 v-if="page.frontmatter.title" class="blog-title">
    {{ page.frontmatter.title }}
  </h1>

  <p v-if="page.frontmatter.description" class="blog-description">
    {{ page.frontmatter.description }}
  </p>

  <ul class="blog-posts">
    <BlogPost
      v-for="post in renderPosts"
      :key="post.regularPath"
      :regular-path="post.regularPath"
      :title="post.data.title"
      :date="post.data.date"
    />
  </ul>

  <div class="blog-page-controls">
    <button
      :class="['blog-navigate-btn prev', cursor < cursorOffset && 'disabled']"
      :disabled="cursor < cursorOffset"
      @click="navigate(cursor - cursorOffset)"
    >
      Previous
    </button>
    <span class="blog-navigate-info">
      Page {{ Math.ceil(cursor / cursorOffset) + 1 }} of
      {{ Math.ceil(posts.length / cursorOffset) }}
    </span>
    <button
      :class="['blog-navigate-btn next', posts.length - cursorOffset < cursor && 'disabled']"
      :disabled="posts.length - cursorOffset < cursor"
      @click="navigate(cursor + cursorOffset)"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed, ref } from "vue";
import { Post } from "../types";
import BlogPost from "./post/BlogPost.vue";

const { theme, page } = useData();
const posts = theme.value.posts as Post[];
const cursorOffset = theme.value.cursorOffset;

const cursor = ref(0);
const renderPosts = computed(() => {
  return posts.slice(cursor.value, cursor.value + cursorOffset);
});

function navigate(newCursor: number) {
  if (newCursor >= 0 && newCursor < posts.length) {
    cursor.value = newCursor;
  }
}
</script>

<style lang="css" scoped>
.blog-image {
  margin-block: 2rem;
  margin-inline: auto;
}

.blog-title {
  text-align: center;
  font-size: 35px;
  font-weight: 700;
  line-height: 40px;
  margin-bottom: 0.5rem;
}

.blog-description {
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 2rem;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 768px;
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
}

.blog-page-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.blog-navigate-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
}

.blog-navigate-btn:hover:not(.disabled) {
  background-color: var(--vp-c-brand-3);
  border-color: var(--vp-c-brand-3);
  color: var(--vp-c-white);
}

.blog-navigate-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.blog-navigate-info {
  text-align: center;
  align-self: center;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}
</style>
