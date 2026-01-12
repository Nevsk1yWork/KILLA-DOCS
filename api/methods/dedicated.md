# Серверные

## 1) Посчитать стоимость (quote)

`GET /dedicated/quote`

**Параметры (query):**

* `country_code` (string) — страна
* `period` (int) — период в днях
* `count` (int) — количество
* `ipv` (int) — версия IP (например 4/6)

**Пример:**

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/quote?country_code=RU&period=30&count=10&ipv=4" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 2) Купить

`POST /dedicated/buy`

**Body (JSON):**

* `country_code`, `period`, `count`, `ipv` — как в quote

**Пример:**

```bash
curl -s https://proxy.killa.cc/api/v1/dedicated/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"country_code":"RU","period":30,"count":10,"ipv":4}'
```

## 3) Продлить

`GET /dedicated/prolong/quote` — посчитать стоимость продления\
`POST /dedicated/prolong` — продлить

**Пример (quote):**

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/prolong/quote?ids=123,124&period=30" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Пример (prolong):**

```bash
curl -s https://proxy.killa.cc/api/v1/dedicated/prolong \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ids":[123,124],"period":30}'
```

## 4) Сменить протокол

`POST /dedicated/protocol`

**Body (JSON):**

* `ids` (array\[int]) — id прокси
* `port_type` (string) — целевой протокол/тип порта (например `http` или `socks`)

**Пример:**

```bash
curl -s https://proxy.killa.cc/api/v1/dedicated/protocol \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ids":[123,124],"port_type":"socks"}'
```

> Формат и поля результата смотри в OpenAPI Reference: `https://proxy.killa.cc/api/v1/openapi.json`.
