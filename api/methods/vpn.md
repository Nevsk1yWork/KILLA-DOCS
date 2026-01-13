# VPN

## 1) Посчитать стоимость (quote)

`GET /vpn/quote?period_months=...`

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/quote?period=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Ответ:

```json
{
  "ok": true,
  "data": {
    "period_months": 1,
    "price_rub": 99.0
  }
}
```

## 2) Купить

`POST /vpn/buy`

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"period_months":1}'
```

## 3) Продлить

`POST /vpn/renew`

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/renew \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"period_months":1}'
```

## 4) Получить текущую информацию

`GET /vpn/info`

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/info \
  -H "Authorization: Bearer YOUR_TOKEN"
```
