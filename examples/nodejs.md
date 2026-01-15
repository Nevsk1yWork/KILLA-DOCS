# Node.js

{% hint style="info" %}
* **URL для запросов:** `https://proxy.killa.cc/api/v1`
* **Авторизация:** для каждого запроса передавайте токен в заголовке `Authorization: Bearer <token>`.
{% endhint %}

### 1) Подготовка

Требование: Node.js 18+.

```bash
export TOKEN="YOUR_TOKEN"
export TG_ID="123456789"
export CLIENT_KEY="client-001"
```

### 2) Мини-клиент

```js
const BASE = "https://proxy.killa.cc/api/v1";
const TOKEN = process.env.TOKEN || "YOUR_TOKEN";

const TG_ID = Number(process.env.TG_ID || "123456789");
const CLIENT_KEY = process.env.CLIENT_KEY || "client-001";

async function api(method, path, { params, body } = {}) {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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

### 3) Баланс

```js
api("GET", "/balance").then(console.log);
```

### 4) Серверные: цена → купить

```js
(async () => {
  const price = await api("GET", "/dedicated/quote", {
    params: { country_code: "RU", period: 30, count: 10, ipv: 4 },
  });
  console.log("цена", price);

  const buy = await api("POST", "/dedicated/buy", {
    body: { country_code: "RU", period: 30, count: 10, ipv: 4 },
  });
  console.log("покупка", buy);
})();
```

### 5) Премиум: купить трафик → сгенерировать прокси

```js
(async () => {
  await api("POST", "/premium/traffic/buy", {
    body: { pool_type: "residential", gb: 10, telegram_id: TG_ID, client_key: CLIENT_KEY },
  });

  const proxy = await api("POST", "/premium/proxies/generate", {
    body: {
      pool_type: "residential",
      countries: ["US"],
      type: "sticky",
      protocol: "http",
      format_id: 1,
      quantity: 10,
      session_ttl: 600,
      telegram_id: TG_ID,
      client_key: CLIENT_KEY,
    },
  });

  console.log(proxy);
})();
```

### 6) VPN: купить → информация

```js
(async () => {
  await api("POST", "/vpn/buy", {
    body: { telegram_id: TG_ID, client_key: CLIENT_KEY, period_months: 1 },
  });

  const info = await api("GET", "/vpn/info", {
    params: { telegram_id: TG_ID, client_key: CLIENT_KEY },
  });

  console.log(info);
})();
```
