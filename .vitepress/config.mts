import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "ru-RU",
  title: "KILLA DOCS",
  description: "Документация KILLA PROXY API",
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: "Быстрый старт", link: "/start/quick-start" },
      { text: "API", link: "/api/methods/" },
      { text: "Примеры", link: "/examples/curl" }
    ],

    outline: { level: [2, 3] },

    sidebar: [
      {
        text: "🚀 СТАРТ",
        items: [
          { text: "Введение", link: "/" },
          { text: "Быстрый старт", link: "/start/quick-start" }
        ]
      },
      {
        text: "🔑 API",
        items: [
          { text: "Методы", link: "/api/methods/" },
          { text: "Авторизация", link: "/api/authorization" },
          { text: "Ошибки", link: "/api/errors" }
        ]
      },
      {
        text: "💻 ПРИМЕРЫ",
        items: [
          { text: "curl", link: "/examples/curl" },
          { text: "python", link: "/examples/python" },
          { text: "nodejs", link: "/examples/nodejs" },
          { text: "go", link: "/examples/go" },
          { text: "php", link: "/examples/php" }
        ]
      },
      {
        text: "🔗 ПОЛЕЗНОЕ",
        items: [
          { text: "Частые вопросы", link: "/help/faq" },
          { text: "Лимиты", link: "/help/limits" },
          { text: "Поддержка", link: "/help/support" }
        ]
      }
    ],

    search: { provider: "local" }
  }
});
