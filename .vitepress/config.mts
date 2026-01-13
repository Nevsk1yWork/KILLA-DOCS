import { defineConfig } from "vitepress";
import fs from "node:fs";
import path from "node:path";

function cfRedirectsPlugin() {
  return {
    name: "cf-pages-redirects",
    closeBundle() {
      const outDir = path.resolve(process.cwd(), ".vitepress", "dist");
      const redirects = [
        // категории -> первая реальная страница
        "/start        /               302",
        "/start/       /               302",

        "/api          /api/methods/    302",
        "/api/         /api/methods/    302",

        "/examples     /examples/curl   302",
        "/examples/    /examples/curl   302",

        "/help         /help/faq        302",
        "/help/        /help/faq        302",
      ].join("\n") + "\n";

      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "_redirects"), redirects, "utf-8");
    },
  };
}

export default defineConfig({
  lang: "ru-RU",
  title: "KILLA DOCS",
  description: "Документация KILLA PROXY API",
  cleanUrls: true,

  rewrites: {
    "README.md": "index.md",
    "api/methods/README.md": "api/methods/index.md",
  },

  vite: {
    plugins: [cfRedirectsPlugin()],
  },

  themeConfig: {
    nav: [
      { text: "Быстрый старт", link: "/start/quick-start" },
      { text: "API", link: "/api/methods/" },
      { text: "Примеры", link: "/examples/curl" },
    ],

    outline: { level: [2, 3] },

    sidebar: [
      {
        text: "🚀 СТАРТ",
        items: [
          { text: "Введение", link: "/" }, // это корневой README.md
          { text: "Быстрый старт", link: "/start/quick-start" },
        ],
      },
      {
        text: "🔑 API",
        items: [
          {
            text: "Методы", link: "/api/methods/"
            items: [
              { text: "Серверные", link: "/api/methods/dedicated" },
              { text: "Премиум", link: "/api/methods/premium" },
              { text: "VPN", link: "/api/methods/vpn" },
              { text: "Служебные", link: "/api/methods/internal" }
            ]
          },
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
          { text: "php", link: "/examples/php" },
        ],
      },
      {
        text: "🔗 ПОЛЕЗНОЕ",
        items: [
          { text: "Частые вопросы", link: "/help/faq" },
          { text: "Лимиты", link: "/help/limits" },
          { text: "Поддержка", link: "/help/support" },
        ],
      },
    ],

    search: { provider: "local" },
  },
});
