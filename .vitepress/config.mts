import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "ru-RU",
  title: "KILLA DOCS",
  description: "Документация KILLA PROXY API",
  cleanUrls: true,

  themeConfig: {
    // верхнее меню
    nav: [
      { text: "Быстрый старт", link: "/start/quick-start" },
      { text: "API", link: "/api/methods/README" },
      { text: "Примеры", link: "/examples/curl" }
    ],

    // правое оглавление
    outline: { level: [2, 3] },

    // поиск (локальный, без внешних сервисов)
    search: { provider: "local" },

    // левое меню
    sidebar: [
      {
        text: "🚀 СТАРТ",
        items: [
          { text: "Введение", link: "/README" },
          { text: "Быстрый старт", link: "/start/quick-start" }
        ]
      },
      {
        text: "🔑 API",
        items: [
          { text: "Методы", link: "/api/methods/README" },
          { text: "Dedicated", link: "/api/methods/dedicated" },
          { text: "Premium", link: "/api/methods/premium" },
          { text: "VPN", link: "/api/methods/vpn" },
          { text: "Internal", link: "/api/methods/internal" },
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
    ]
  }
});
