import { defineConfig } from "vitepress";

export default defineConfig({
  title: "KILLA DOCS",
  description: "Документация KILLA",
  themeConfig: {
    nav: [
      { text: "Быстрый старт", link: "/start/" },
      { text: "API", link: "/api/" },
      { text: "Примеры", link: "/examples/" }
    ],
    sidebar: [
      {
        text: "Начало",
        items: [
          { text: "Введение", link: "/start/" },
          { text: "Помощь", link: "/help/" }
        ]
      },
      {
        text: "API",
        items: [
          { text: "Обзор", link: "/api/" }
        ]
      },
      {
        text: "Примеры",
        items: [
          { text: "Примеры", link: "/examples/" }
        ]
      }
    ]
  }
});
