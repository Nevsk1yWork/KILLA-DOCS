# cURL

{% hint style="info" %}
* **URL для запросов:** `https://proxy.killa.cc/api/v1`
* **Авторизация:** для каждого запроса передавайте токен в заголовке `Authorization: Bearer <token>`.
{% endhint %}

<details>

<summary><strong>Памятка</strong></summary>

* Для удобства используйте переменные окружения.
* Для методов **Premium** и **VPN** используйте идентификацию клиента: `telegram_id` + `client_key`.

</details>

### 1) Подготовка

```bash
export BASE="https://proxy.killa.cc/api/v1"
export TOKEN="YOUR_TOKEN"

# Для Premium/VPN (пример)
export TG_ID="123456789"
export CLIENT_KEY="client-001"
```

### 2) Баланс

```bash
curl -s "$BASE/balance" \
  -H "Authorization: Bearer $TOKEN"
```

### 3) Серверные: Цена → Покупка

```bash
curl -s "$BASE/dedicated/quote?country_code=RU&period=30&count=10&ipv=4" \
  -H "Authorization: Bearer $TOKEN"
```

```bash
curl -s "$BASE/dedicated/buy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "country_code": "RU",
    "period": 30,
    "count": 10,
    "ipv": 4
  }'
```

### 4) Серверные: Стоимость продления

```bash
curl -s "$BASE/dedicated/prolong/quote?ids=36400089,36400090&period=3" \
  -H "Authorization: Bearer $TOKEN"
```

### 5) Премиум: Купить трафик → Текущий баланс

```bash
curl -s "$BASE/premium/traffic/buy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    "pool_type": "residential",
    "gb": 10,
    "telegram_id": $TG_ID,
    "client_key": "$CLIENT_KEY"
  }"
```

```bash
curl -s "$BASE/premium/traffic/balance?pool_type=residential&telegram_id=$TG_ID&client_key=$CLIENT_KEY" \
  -H "Authorization: Bearer $TOKEN"
```

### 6) Премиум: Генерация прокси-листа

```bash
curl -s "$BASE/premium/proxies/generate" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    "pool_type": "residential",
    "countries": ["US"],
    "type": "sticky",
    "protocol": "http",
    "format_id": 1,
    "quantity": 10,
    "session_ttl": 600,
    "telegram_id": $TG_ID,
    "client_key": "$CLIENT_KEY"
  }"
```

### 7) VPN: Стоимость → Купить → Информация

```bash
curl -s "$BASE/vpn/quote?period_months=1" \
  -H "Authorization: Bearer $TOKEN"
```

```bash
curl -s "$BASE/vpn/buy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    "telegram_id": $TG_ID,
    "client_key": "$CLIENT_KEY",
    "period_months": 1
  }"
```

```bash
curl -s "$BASE/vpn/info?telegram_id=$TG_ID&client_key=$CLIENT_KEY" \
  -H "Authorization: Bearer $TOKEN"
```
