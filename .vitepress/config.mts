import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "ru-RU",
  title: "KILLA DOCS",
  description: "Документация KILLA PROXY API",
  cleanUrls: true, // чтобы ссылки были /start/ без .html

  themeConfig: {
    // Верхнее меню как на GitBook
    nav: [
      { text: "Быстрый старт", link: "/start/quick-start" },
      { text: "API", link: "/api/" },
      { text: "Примеры", link: "/examples/" }
    ],

    // Правое оглавление (как справа на GitBook)
    outline: { level: [2, 3] },

    // Левое меню секциями (как на GitBook)
    sidebar: [
      {
        text: "🚀 СТАРТ",
        items: [
          { text: "Введение", link: "/start/" },
          { text: "Быстрый старт", link: "/start/quick-start" }
        ]
      },
      {
        text: "🔑 API",
        items: [
          { text: "Методы", link: "/api/methods/" },
          { text: "Авторизация", link: "/authorization" },
          { text: "Ошибки", link: "/errors" }
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

    // Поиск сверху (встроенный локальный)
    search: { provider: "local" }
  }
});
