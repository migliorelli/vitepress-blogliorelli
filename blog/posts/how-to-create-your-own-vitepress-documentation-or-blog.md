---
title: How to create your own Vitepress documentation or blog
description: In this post you'll learn how to use custom Vitepress themes and how to create your own
date: 2025-05-28T16:12:00-03:00
tags:
  - Tutorial
  - Vitepress
  - Vue
---

[Vitepress](https://vitepress.dev/) is a static site generator designed for building API's and libraries documentation websites. It uses the [Vite](https://vite.dev/) ecosystem, a modern front-end tool, along with [Vue](https://vuejs.org/) and Markdown to generate stunning websites like this blog.

It can be used to create **documentations**, **blogs**, **portfolios** and generate static HTML pages ready to be deployed everywhere, also with built-in sitemap support.

## Why should I use Vitepress?

- has **real time development**. You see everything you do instantly.
- uses **Markdown**. You can write *tables*, *lists*, *headings*, *blocks* and everything Markdown has to offer.
- supports **Vue**. If you need something more complex, just write it in Vue.
- you can **customize everything**. From navbar and sidebar to even code blocks transformers.

## Using an existing theme

To use an existing theme, all you need to do is download (or clone) the repository with the theme files and edit it to adapt it to your taste.

I'll show you how to do it with my theme, the [vitepress-blogliorelli](https://github.com/migliorelli/vitepress-blogliorelli).

### Installing the theme

Let's clone the repository.

```bash
git clone https://github.com/migliorelli/vitepress-blogliorelli
cd vitepress-blogliorelli
yarn
```

Note that the project look something like this:

```
vitepress-blogliorelli/
├─ blog/
│  ├─ .vitepress/
│  │  ├─ cache/
│  │  ├─ theme/
│  │  │  ├─ components/
│  │  │  ├─ index.ts
│  │  │  └─ style.css
│  │  └─ config.mts
│  ├─ public/
│  ├─ posts/
│  │  └─ ****.md
│  ├─ index.md
│  └─ tags.md
├─ package.json
└─ yarn.lock
```

- `posts/`: all your *.md posts
- `public/`: contains your public files
- `index.md` and `tags.md`: pages to list or filter all posts

Now, inside `.vitepress`, is where all the magic happens:
- `config.mts`: the main configuration file where you define site settings like title, description, theme config, nav, and sidebar.
- `cache/`: an internal folder used by Vitepress to store optimized data. You can ignore or delete it safely when needed.
- `theme/`: contains your custom theme setup.
- `theme/components/`: Vue components used in your blog (like layout wrappers, post previews, etc.).
- `theme/index.ts`: the entry point for the custom theme. It tells Vitepress how to render your theme.
- `theme/style.css`: your global CSS styles that apply across the whole site. You can change this file to customize all the default Vitepress colors and styles.

### Running the project

After cloning the theme and navigating to the folder, you can install the dependencies and run the dev server:

```bash
yarn install
yarn dev
```
This will start the local development server. Open your browser and go to http://localhost:5173 (or the port shown in your terminal) to see your blog in action.

### Customizing the theme

Now the fun part begins: making the theme your own!

### Update site config

Open `blog/.vitepress/config.mts`. This is the main configuration file where you can:
- change the title, description, and other site metadata
- customize the navbar and sidebar
- enable features like the sitemap, social links, search, etc.

Example: 
```typescript
import { defineConfigWithTheme } from "vitepress";
import { getPosts } from "./theme/utils";
import { BlogliorelliTheme } from "./theme/types";

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
```

### Add your posts

Drop your Markdown files in the `blog/posts/` folder. Each file represents a blog post and should include frontmatter metadata:

```markdown
---
title: My First Post
description: A quick introduction to my blog
date: 2025-06-01
tags:
  - Personal
  - Introduction
---

Welcome to my blog! This is the first post...
```

### Customize styles and components

You can modify the theme styles in `blog/.vitepress/theme/style.css`, and override or add Vue components in the `components/` folder. This gives you full control over how posts, tags, layouts, and even individual elements look and behave.

## Creating your own theme

:::info BEFORE YOU GO
Creating a theme for Vitepress can be very complex and time-consuming depending on what features and appearance you want your site to have, so I'll just teach you the basics.
:::

First we create our project folder and install Vitepress as a devlopment dependency. I'm using [Yarn](https://yarnpkg.com/), but it can be done with any package manager.

```bash
mkdir my-vitepress-website
cd my-vitepress-website
yarn init -y
yarn add -D vitepress
```

Now that our setup is done let’s start the Vitepress setup wizard and fill the requirements:

:::warning
Remember to select `Default Theme + Customization`, or you will not be able to customize the default theme.
:::

```bash
yarn vitepress init

┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./
│
◇  Site title:
│  My Vitepress Website
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme + Customization
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run yarn run docs:dev and start writing.

Tips:
- Since you've chosen to customize the theme, you should also explicitly install vue as a dev dependency.
```

Now, install Vue:

```bash
yarn add -D vue
```

This ensures your custom components and theme modifications will work properly.

### Understanding the Vitepress structure

After running the wizard, your project will look something like this:

```
my-vitepress-website/
├─ .vitepress/
│  ├─ config.ts
│  └─ theme/
│     ├─ index.ts
│     └─ style.css
├─ index.md
├─ package.json
└─ yarn.lock
```

- `.vitepress/config.mts`: your main site configuration.
- `.vitepress/theme/`: where you customize or extend the default theme.
- `.vitepress/theme/index.ts`: entry point for your theme customizations.
- `.vitepress/theme/style.css`: global CSS for your site.
- `index.md`: your homepage content.

### Customizing your theme

You can now start customizing your theme. For example, to change the homepage layout or add a custom component, create a Vue file inside `.vitepress/theme/` or `.vitepress/theme/components/` and import it in `index.ts`.

But just with the config.mts you can customize all that the default theme can provide.

### Update site config

Open `blog/.vitepress/config.mts`. This is the main configuration file where you can:
- change the title, description, and other site metadata
- customize the navbar and sidebar
- enable features like the sitemap, social links, search, etc.

Example: 
```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Blogliorelli",
  description: "Migliorelli's blog",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {

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
```

#### Example: 

Create a `Hero.vue` component in `.vitepress/theme/components/`:

```vue
<template>
  <section class="hero">
    <h1>Welcome to My Vitepress Website!</h1>
    <p>This is a custom hero section.</p>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  margin: 2rem 0;
}
</style>
```

You can also create a `CustomLayout` in `.vitepress/theme/components/`. This is what I did for my theme:

```vue
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
```

Register the components in `index.ts`:
```typescript
// https://vitepress.dev/guide/custom-theme

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import Hero from "./components/Hero.vue";
import CustomLayout from "./components/CustomLayout.vue";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout, // your custom layout
  enhanceApp({ app, router, siteData }) {
    app.component("Hero", Hero); // your custom MD component
  },
} satisfies Theme;
```

Then, in your `index.md`, use the global MD component like this:

```markdown
---
title: Home
---

<Hero />

Start writing your documentation or blog posts here!
```

### Adding posts and pages

Just like before, you can add Markdown files for each post or page. Place them in the root of your docs folder or organize them in subfolders as you prefer. Each Markdown file can have frontmatter for title, description, date, and tags.

### Deploying your site

When you're ready to publish your site, build the static files:

```bash
yarn docs:build
```

The output will be in the `.vitepress/dist` folder. You can deploy this folder to any static hosting provider, like Vercel, Netlify, GitHub Pages, or your own server.

### Final thoughts

Vitepress is a powerful and flexible tool for building documentation sites, blogs, and more. With its simple structure, Markdown support, and the ability to fully customize the theme with Vue and CSS, you can create a site that looks and works exactly how you want.

If you want to go further, check out the [Vitepress documentation](https://vitepress.dev/), explore community themes, or dive into advanced features like custom plugins, search, and more.

Happy writing!

