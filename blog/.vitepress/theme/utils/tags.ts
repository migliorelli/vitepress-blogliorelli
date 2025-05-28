import { Post } from "../types";

export function getTags(posts: Post[]): Map<string, Post[]> {
  const tagsMap = new Map<string, Post[]>();

  posts.forEach((post) => {
    if (Array.isArray(post.data.tags)) {
      post.data.tags.forEach((tag: string) => {
        if (!tagsMap.has(tag)) {
          tagsMap.set(tag, []);
        }

        tagsMap.get(tag)?.push(post);
      });
    }
  });

  return tagsMap;
}
