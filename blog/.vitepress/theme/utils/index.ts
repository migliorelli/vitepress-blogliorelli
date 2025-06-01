// reference: https://github.com/clark-cui/vitepress-blog-zaun/blob/master/.vitepress/theme/serverUtils.ts

import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";
import { Post } from "../types";

export async function getPosts(): Promise<Post[]> {
  const paths = await getPostPaths();
  const posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, "utf-8");
      const { data } = matter(content);

      if (data.date instanceof Date) {
        data.date = data.date.toISOString();
      }

      const regularPath = `/${item.replace(".md", "").replace("blog/", "")}`;
      return { data, regularPath } as Post;
    })
  );

  posts.sort(_compareDate);
  return posts;
}

function _compareDate(posta: any, postb: any) {
  return new Date(posta.data.date) < new Date(postb.data.date) ? 1 : -1;
}

async function getPostPaths() {
  const paths = await globby(["**.md"], {
    ignore: ["node_modules", "README.md"],
  });

  return paths.filter((item) => item.includes("posts/"));
}
