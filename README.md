# Blogliorelli Theme

A clean and minimalist VitePress theme for blogs with tag support.

## Features

- Fully customizable
- Custom blog layout with post listing
- Tag system for categorizing posts
- Responsive design
- Post navigation

## Usage

This theme extends the default VitePress theme with additional blog-specific features. It provides components for displaying blog posts, tags, and a customized layout.

### Customization

Feel free to customize the theme to fit your needs. You can modify the layout, components, and styles in the `theme` directory.

In order to change colors, you can edit all the Vitepress default theme variables in the `theme/styles/global.css` file.

### Configuration

In your VitePress config file, import and use the theme:

```ts
import { defineConfigWithTheme } from "vitepress";
import { getPosts } from "./theme/utils";
import { BlogliorelliTheme } from "./theme/types";

export default defineConfigWithTheme<BlogliorelliTheme>({
  // ... your VitePress config
  themeConfig: {
    // Blogliorelli theme config
    cursorOffset: 10,
    posts: await getPosts(),
    // ... other VitePress theme config
  }
});
```

### Post Format

Blog posts should include frontmatter with the following fields:

```frontmatter
---
title: Post Title
description: Post description
date: YYYY-MM-DDThh:mm:ss+hh:mm
tags: 
  - tag1
  - tag2
---
```

## Credits

Inspired by [vitepress-blog-zaun](https://github.com/clark-cui/vitepress-blog-zaun)
