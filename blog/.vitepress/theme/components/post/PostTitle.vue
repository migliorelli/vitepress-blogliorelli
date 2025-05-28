<template>
  <h1 class="post-title">{{ page.title }}</h1>
  <p v-if="page.description" class="post-description">{{ page.description }}</p>
  <p class="post-date">{{ date }}</p>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const { page } = useData();
const date = computed(() => {
  const value = page.value.frontmatter.date;

  if (value) {
    return dayjs(value).format("LL") + " - " + dayjs(value).fromNow();
  }

  return "No date available";
});
</script>

<style lang="css" scoped>
.post-title {
  font-size: 36px;
  font-weight: bold;
  line-height: 52px;
}

.post-description {
  font-size: 18px;
  margin-block: 0.5rem;
}

.post-date {
  font-size: 16px;
  color: #888;
  margin-bottom: 0.5rem;
}
</style>
