# nodejs

Требование: Node.js 18+ (есть встроенный `fetch`).

```bash
export TOKEN="YOUR_TOKEN"
```

## Мини-клиент

```js
const BASE = "https://proxy.killa.cc/api/v1";
const TOKEN = process.env.TOKEN || "YOUR_TOKEN";

async function api(method, path, { params, body } = {}) {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url, {
    method,
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
  if (!json.ok) throw new Error(`API error: ${JSON.stringify(json.error)}`);
  return json.data;
}
```

## Баланс

```js
api("GET", "/balance").then(console.log);
```

## Dedicated: quote + buy

```js
(async () => {
  const quote = await api("GET", "/dedicated/quote", {
    params: { country_code: "RU", period: 30, count: 10, ipv: 4 },
  });
  console.log("quote", quote);

  const buy = await api("POST", "/dedicated/buy", {
    body: { country_code: "RU", period: 30, count: 10, ipv: 4 },
  });
  console.log("buy", buy);
})();
```

## Premium: купить трафик + сгенерировать прокси

```js
(async () => {
  await api("POST", "/premium/traffic/buy", {
    body: { pool_type: "residential", gb: 10 },
  });

  const proxies = await api("POST", "/premium/proxies/generate", {
    body: {
      pool_type: "residential",
      countries: ["US"],
      type: "sticky",
      protocol: "http",
      format_id: 1,
      quantity: 10,
      session_ttl: 600,
    },
  });
  console.log(proxies);
})();
```

## VPN: купить + info

```js
(async () => {
  await api("POST", "/vpn/buy", { body: { period_months: 1 } });
  console.log(await api("GET", "/vpn/info"));
})();
```
