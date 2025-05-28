import { DefaultTheme } from "vitepress";

interface PostData {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Post {
  data: PostData;
  regularPath: string;
}

export interface BlogliorelliTheme extends DefaultTheme.Config {
  cursorOffset: number;
  posts: Post[];
}
