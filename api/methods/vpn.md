# VPN

## 1) Посчитать стоимость (quote)

`GET /vpn/quote?period=...`

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/quote?period=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 2) Купить

`POST /vpn/buy`

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"period":1}'
```

## 3) Продлить

`POST /vpn/renew`

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/renew \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"period":1}'
```

## 4) Получить текущую информацию

`GET /vpn/info`

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/info \
  -H "Authorization: Bearer YOUR_TOKEN"
```

> Формат и поля результата смотри в OpenAPI Reference: `https://proxy.killa.cc/api/v1/openapi.json`.
