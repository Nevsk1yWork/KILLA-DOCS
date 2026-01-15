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

## Пример 2 — посчитать стоимость (quote) перед покупкой

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/quote?country_code=RU&period=30&count=10&ipv=4" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Параметры запроса

| Name                                                | Type   | Description   |
| --------------------------------------------------- | ------ | ------------- |
| country\_code<mark style="color:$danger;">\*</mark> | string | Код страны    |
| period<mark style="color:red;">\*</mark>            | int    | Период в днях |
| count<mark style="color:$danger;">\*</mark>         | int    | Количество    |
| ipv<mark style="color:$danger;">\*</mark>           | int    | Версия прокси |

## Пример 3 — купить прокси

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

* **Серверные:** quote → buy → (prolong / protocol)
* **Премиум:** traffic/quote → traffic/buy → proxies/generate → (whitelist / password)
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
