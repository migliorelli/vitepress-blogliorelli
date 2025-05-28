// https://vitepress.dev/guide/custom-theme

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import CustomLayout from "./components/CustomLayout.vue";
import Tags from "./components/Tags.vue";
import Confetti from "./components/misc/Confetti.vue";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router, siteData }) {
    app.component("Tags", Tags);
    app.component("Confetti", Confetti);
  },
} satisfies Theme;
