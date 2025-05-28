<template>
  <li class="blog-post">
    <a :href="regularPath">
      <div class="blog-post-title">{{ title }}</div>
      <div class="blog-post-date">{{ getFormattedDate(date) }}</div>
    </a>
  </li>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  regularPath: string;
  title: string;
  date: string;
}

defineProps<Props>();

function getFormattedDate(date: string) {
  return dayjs(date).format("LL") + " - " + dayjs(date).fromNow();
}
</script>

<style lang="css" scoped>
.blog-post {
  width: 100%;
  border-radius: 8px;
  transition: background-color 0.25s;
}

.blog-post:hover {
  background-color: var(--vp-c-bg-soft);
}

.blog-post a {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: start;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.blog-post-title {
  font-weight: 500;
}

.blog-post-date {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}
</style>
