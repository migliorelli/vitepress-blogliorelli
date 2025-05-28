import { defineConfigWithTheme } from "vitepress";
import { getPosts } from "./theme/utils";
import { BlogliorelliTheme } from "./theme/types";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<BlogliorelliTheme>({
  lang: "en-US",
  title: "Blogliorelli",
  description: "Migliorelli's blog",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // blogliorelli theme config
    cursorOffset: 10,
    posts: await getPosts(),
    // blogliorelli theme config

    logo: "/logo.ico",
    nav: [
      { text: "Home", link: "/" },
      { text: "Tags", link: "/tags" },
      { text: "Portfolio", link: "https://migliorelli.dev" },
    ],

    search: {
      provider: "local",
      options: { detailedView: true, disableQueryPersistence: true },
    },

    socialLinks: [{ icon: "github", link: "https://github.com/migliorelli" }],
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/ico",
        href: "/logo.ico",
      },
    ],
    [
      "meta",
      {
        name: "author",
        content: "Miguel Migliorelli",
      },
    ],
  ],
});
