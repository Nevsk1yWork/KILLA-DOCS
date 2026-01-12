# curl

Используй переменные окружения, чтобы команды были короче.

```bash
export TOKEN="YOUR_TOKEN"
export BASE="https://proxy.killa.cc/api/v1"
```

## Баланс

```bash
curl -s "$BASE/balance" \
  -H "Authorization: Bearer $TOKEN"
```

## Dedicated: цена (quote)

```bash
curl -s "$BASE/dedicated/quote?country_code=RU&period=30&count=10&ipv=4" \
  -H "Authorization: Bearer $TOKEN"
```

## Dedicated: покупка

```bash
curl -s "$BASE/dedicated/buy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"country_code":"RU","period":30,"count":10,"ipv":4}'
```

## Premium: покупка трафика

```bash
curl -s "$BASE/premium/traffic/buy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pool_type":"residential","gb":10}'
```

## Premium: генерация прокси-листа

```bash
curl -s "$BASE/premium/proxies/generate" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pool_type": "residential",
    "countries": ["US"],
    "type": "sticky",
    "protocol": "http",
    "format_id": 1,
    "quantity": 10,
    "session_ttl": 600
  }'
```

## VPN: покупка и проверка

```bash
curl -s "$BASE/vpn/buy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"period_months":1}'

curl -s "$BASE/vpn/info" \
  -H "Authorization: Bearer $TOKEN"
```
