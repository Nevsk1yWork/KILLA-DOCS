# VPN

## 1) Посчитать стоимость

`GET /vpn/quote`

### **Параметры (query):**

* `period_months` (int) — период в месяцах (1/3/6/12)

### Пример:

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/quote?period_months=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ:

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

### **Body (JSON):**

* `period_months` (int) — период в месяцах (1/3/6/12)
* `telegram_id` (int) — уникальный идентификатор пользователя

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"period_months":1, "telegram_id": 123456789}'
```

## 3) Продлить

`POST /vpn/renew`

### **Body (JSON):**

* `period_months` (int) — период в месяцах (1/3/6/12)
* `telegram_id` (int) — уникальный идентификатор пользователя

### Пример:

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/renew \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"period_months":1, "telegram_id": 123456789}'
```

### Ответ:

```json
// Some code
```

## 4) Получить текущую информацию

`GET /vpn/info`

### **Параметры (query):**

* `telegram_id` (int) — уникальный идентификатор пользователя

### Пример:

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/info?telegram_id=123456789" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ:

```json
{
  "ok": true,
  "data": {
    "exists": true,
    "count": 2,
    "items": [
      {
        "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "status": "ACTIVE",
        "expireAt": "2027-01-01T00:00:00.000Z",
        "expireAt_date": "01.01.2027",
        "subscriptionUrl": "https://vpn.killa.cc/qwerty12345678",
        "trafficLimitBytes": 0
      },
      {
        "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "status": "ACTIVE",
        "expireAt": "2026-02-04T19:39:38.001Z",
        "expireAt_date": "04.02.2026",
        "subscriptionUrl": "https://vpn.killa.cc/qwerty123456",
        "trafficLimitBytes": 0
      }
    ]
  }
}
```

> <mark style="color:$primary;">**Возможные статусы подписки:**</mark>\
> <mark style="color:$info;">ACTIVE — Активна</mark>> \ <mark style="color:$info;">DISABLED — Приостановлена</mark>\ <mark style="color:$info;">LIMITED — Лимит устройств/трафика</mark>> \ <mark style="color:$info;">EXPIRED — Истекла</mark>
