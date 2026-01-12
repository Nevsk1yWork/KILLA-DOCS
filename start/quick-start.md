# Быстрый старт

## 1) Получи токен

Открой в боте: **Профиль → API** → скопируй **API-токен**.

## 2) Делай запросы на Base URL

```
https://proxy.killa.cc/api/v1
```

## 3) Передавай токен в заголовке

```http
Authorization: Bearer YOUR_TOKEN
```

## Пример 1 — проверить баланс

```bash
curl -s https://proxy.killa.cc/api/v1/balance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Пример ответа:

```json
{
  "ok": true,
  "data": {
    "balance_rub": 1234.56,
    "api_spent_rub": 1235
  }
}
```

## Пример 2 — посчитать стоимость (quote) перед покупкой Dedicated

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/quote?country_code=RU&period=30&count=10&ipv=4" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Параметры:

* `country_code` — страна
* `period` — период (дни)
* `count` — количество
* `ipv` — версия IP

## Пример 3 — купить Dedicated

```bash
curl -s https://proxy.killa.cc/api/v1/dedicated/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "country_code": "RU",
    "period": 30,
    "count": 10,
    "ipv": 4
  }'
```

<details>

<summary><strong>Типовые сценарии (что делать дальше)</strong></summary>

* **Dedicated:** quote → buy → (prolong / protocol)
* **Premium:** traffic/quote → traffic/buy → proxies/generate → (whitelist / password)
* **VPN:** vpn/quote → vpn/buy → vpn/info → vpn/renew

</details>

## Формат ошибки (пример)

```json
{
  "ok": false,
  "error": {
    "code": "invalid_token",
    "message": "Unauthorized",
    "details": null
  }
}
```

Подсказка:

* `401` — токен неверный/отсутствует
* `400` — неверные параметры запроса
* `5xx` — внутренняя ошибка или ошибка upstream
