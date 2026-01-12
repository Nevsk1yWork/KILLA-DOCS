# Премиум

## 1) Посчитать стоимость трафика (quote)

`GET /premium/traffic/quote`

**Параметры (query):**

* `pool_type` (string) — тип пула
* `gb` (number) — объём в GB

**Пример:**

```bash
curl -s "https://proxy.killa.cc/api/v1/premium/traffic/quote?pool_type=residential&gb=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 2) Купить трафик

`POST /premium/traffic/buy`

**Body (JSON):**

* `pool_type`, `gb`

**Пример:**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/traffic/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pool_type":"residential","gb":10}'
```

## 3) Баланс трафика

`GET /premium/traffic/balance?pool_type=...`

```bash
curl -s "https://proxy.killa.cc/api/v1/premium/traffic/balance?pool_type=residential" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 4) Генерация прокси-листа

`POST /premium/proxies/generate`

Поддерживаются параметры, которые есть в боте (гео/тип/протокол/формат/кол-во/ttl и т.д.).\
Конкретный набор полей смотри в OpenAPI.

**Пример (минимальный):**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/proxies/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pool_type":"residential","quantity":50,"format":"txt"}'
```

## 5) Whitelist IP

* `GET /premium/whitelist`
* `POST /premium/whitelist/add`
* `POST /premium/whitelist/remove`

**Пример (add):**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/whitelist/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ip":"1.2.3.4"}'
```

## 6) Пароль sub-user

* `GET /premium/password`
* `POST /premium/password/reset`

**Пример (reset):**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/password/reset \
  -H "Authorization: Bearer YOUR_TOKEN"
```

> Формат и поля результата смотри в OpenAPI Reference: `https://proxy.killa.cc/api/v1/openapi.json`.
