import { defineConfig } from "vitepress";
import fs from "node:fs";
import path from "node:path";

/**
 * Cloudflare Pages redirects + expose raw markdown files under /__raw/*
 * so we can "View as Markdown" and "Copy as Markdown" like GitBook.
 */
function cfPagesExtrasPlugin() {
  return {
    name: "cf-pages-extras",
    closeBundle() {
      const outDir = path.resolve(process.cwd(), ".vitepress", "dist");

      // 1) Redirect "category" paths to first leaf pages
      const redirects = [
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

      // 2) Copy raw markdown sources into dist so users can view/copy markdown.
      //    Result: /__raw/<relativePath>.md
      const rawRoot = path.join(outDir, "__raw");
      fs.mkdirSync(rawRoot, { recursive: true });

      const projectRoot = process.cwd();
      const ignoreDirs = new Set(["node_modules", ".git", ".vitepress", ".github", "dist"]);

      function walk(dir) {
        for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
          // allow .gitbook, skip other dot-dirs by default
          if (ent.isDirectory() && ent.name.startsWith(".") && ent.name !== ".gitbook") continue;

          const full = path.join(dir, ent.name);
          const rel = path.relative(projectRoot, full);
          const top = rel.split(path.sep)[0];

          if (ent.isDirectory()) {
            if (ignoreDirs.has(ent.name) || ignoreDirs.has(top)) continue;
            walk(full);
            continue;
          }

          if (!ent.isFile()) continue;
          if (!rel.toLowerCase().endsWith(".md")) continue;

          const dst = path.join(rawRoot, rel);
          fs.mkdirSync(path.dirname(dst), { recursive: true });
          fs.copyFileSync(full, dst);
        }
      }

      walk(projectRoot);
    },
  };
}

export default defineConfig({
  lang: "ru-RU",
  title: "KILLA DOCS",
  description: "Документация KILLA PROXY API",
  cleanUrls: true,

  // Hide /README in URLs
  rewrites: {
    "README.md": "index.md",
    "api/methods/README.md": "api/methods/index.md",
  },

  vite: {
    plugins: [cfPagesExtrasPlugin()],
  },

  themeConfig: {
    nav: [
      { text: "Быстрый старт", link: "/start/quick-start" },
      { text: "API", link: "/api/methods/" },
      { text: "Примеры", link: "/examples/curl" },
    ],

    outline: { level: [2, 3] },
    outlineTitle: "На этой странице",

    docFooter: { prev: "Предыдущая", next: "Следующая" },
    returnToTopLabel: "Наверх",
    lastUpdated: { text: "Обновлено" },

    sidebar: [
      {
        text: "🚀 СТАРТ",
        items: [
          { text: "Введение", link: "/" },
          { text: "Быстрый старт", link: "/start/quick-start" },
        ],
      },
      {
        text: "🔑 API",
        items: [
          {
            text: "Методы",
            items: [
              { text: "Обзор", link: "/api/methods/" },
              { text: "Серверные", link: "/api/methods/dedicated" },
              { text: "Премиум", link: "/api/methods/premium" },
              { text: "VPN", link: "/api/methods/vpn" },
              { text: "Служебные", link: "/api/methods/internal" },
            ],
          },
          { text: "Авторизация", link: "/api/authorization" },
          { text: "Ошибки", link: "/api/errors" },
        ],
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

    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "Поиск", buttonAriaLabel: "Поиск" },
          modal: {
            displayDetails: "Показать детали",
            resetButtonTitle: "Сбросить",
            backButtonTitle: "Назад",
            noResultsText: "Ничего не найдено",
            footer: { selectText: "выбрать", navigateText: "перемещаться", closeText: "закрыть" },
          },
        },
      },
    },
  },
});
