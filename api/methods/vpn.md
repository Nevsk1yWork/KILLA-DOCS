# VPN

## 1) Посчитать стоимость

`GET /vpn/quote`

### **Параметры (query)**

* `period_months` (int) — период в месяцах (1/3/6/12)

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/quote?period_months=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

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

### **Body (JSON)**

* `telegram_id` (int) — идентификатор конечного клиента
* `client_key` (string) — ключ клиента у реселлера
* `period_months` (int) — период в месяцах (1/3/6/12)

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/api/v1/vpn/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id": 123456789,
    "client_key": "client-001",
    "period_months": 1
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "subscriptionUrl": "https://vpn.killa.cc/qwerty12345678",
    "expireAt": "2027-01-01T00:00:00.000Z",
    "expireAt_date": "01.01.2027"
  }
}
```

## 3) Продлить

`POST /vpn/renew`

### **Body (JSON)**

* `period_months` (int) — период в месяцах (1/3/6/12)
* `telegram_id` (int) — идентификатор конечного клиента
* `client_key` (string) — ключ клиента у реселлера
* `uuid` (string) — **UUID подписки**, которую нужно продлить

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/renew \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "period_months":3,
    "telegram_id":123456789,
    "client_key":"client-001",
    "uuid":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "subscriptionUrl": "https://vpn.killa.cc/qwerty12345678",
    "expireAt": "2027-04-01T00:00:00.000Z",
    "expireAt_date": "01.04.2027"
  }
}
```

## 4) Получить текущую информацию

`GET /vpn/info`

### **Параметры (query)**

* `telegram_id` (int) — идентификатор конечного клиента
* `client_key` (string) — ключ клиента у реселлера

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/info?telegram_id=123456789&client_key=client-001" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "exists": true,
    "count": 1,
    "items": [
      {
        "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "status": "ACTIVE",
        "expireAt": "2027-01-01T00:00:00.000Z",
        "expireAt_date": "01.01.2027",
        "subscriptionUrl": "https://vpn.killa.cc/qwerty12345678",
        "trafficLimitBytes": 0
      }
    ]
  }
}

```

> <mark style="color:$primary;">**Возможные статусы подписки:**</mark>\
> <mark style="color:$info;">ACTIVE — Активна</mark>> \ <mark style="color:$info;">DISABLED — Приостановлена</mark>\ <mark style="color:$info;">LIMITED — Лимит устройств/трафика</mark>> \ <mark style="color:$info;">EXPIRED — Истекла</mark>
