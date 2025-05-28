<template>
  <div class="blog-tags">
    <h2>Tags</h2>
    <div class="tags-selector">
      <button
        v-for="tag in tagsArray"
        :key="tag"
        :class="{ active: selectedTags.includes(tag) }"
        @click="toggleTag(tag)"
      >
        {{ tag }} -> {{ tagsMap.get(tag)?.length }}
      </button>
    </div>

    <div v-if="tagsArray.length === 0">No tags available.</div>

    <div v-else class="posts-section">
      <div v-if="selectedTags.length === 0" class="empty-state">
        Select one or more tags to filter posts.
      </div>
      <div v-else>
        <h3>Post with tags: {{ selectedTags.join(", ") }}</h3>
        <ul class="posts-list">
          <BlogPost
            v-for="post in filteredPosts"
            :key="post.regularPath"
            :regular-path="post.regularPath"
            :title="post.data.title"
            :date="post.data.date"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTags } from "../utils/tags";
import { useData } from "vitepress";
import { ref, computed } from "vue";
import { Post } from "../types";
import BlogPost from "./post/BlogPost.vue";

const { theme } = useData();
const tagsMap = getTags(theme.value.posts);
const tagsArray = Array.from(tagsMap.keys());
const selectedTags = ref<string[]>([]);

const filteredPosts = computed(() => {
  if (selectedTags.value.length === 0) return [];

  const posts = new Set();
  selectedTags.value.forEach((tag) => {
    const tagPosts = tagsMap.get(tag) || [];
    tagPosts.forEach((post) => {
      if (selectedTags.value.every((tag) => post.data.tags.includes(tag))) {
        posts.add(post);
      }
    });
  });

  return Array.from(posts) as Post[];
});

function toggleTag(tag: string) {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
}
</script>

<style lang="css" scoped>
.blog-tags {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.tags-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 2rem;
}

.tags-selector button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.25s;
}

.tags-selector button:hover {
  background-color: var(--vp-c-brand-3);
  border-color: var(--vp-c-brand-1);
}

.tags-selector button.active {
  background-color: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.posts-section {
  margin-top: 2rem;
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 2rem;
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
</style>
