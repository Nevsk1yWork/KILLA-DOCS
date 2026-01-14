# VPN

<details>

<summary><mark style="color:blue;"><strong>Памятка</strong></mark></summary>

***

#### **Идентификация клиента (обязательно для всех VPN-методов)**

Все операции выполняются для **клиента реселлера**, а не для владельца токена.

Клиент определяется парой:

* `telegram_id` — Telegram ID конечного пользователя.
* `client_key` — произвольная строка, которую задаёт реселлер (можно писать что угодно: внутренний id, username, email, `user-42` и т.п.).

По паре `telegram_id + client_key` происходит управление. `client_key` можно использовать одинаковым для разных `telegram_id` — важна именно пара.

***

#### Периоды покупки и продления

`period_months` — период в месяцах. Поддерживаемые значения:

* `1`, `3`, `6`, `12`

***

#### Статусы подписки

`status` может быть одним из:

* `ACTIVE` — активна
* `DISABLED` — отключена
* `LIMITED` — ограничена (например, лимит устройств/трафика)
* `EXPIRED` — истекла

***

#### UUID подписки (важно для продления)

У клиента может быть несколько подписок одновременно.

* `GET /vpn/info` возвращает **список** подписок, каждая содержит `uuid`.
* `POST /vpn/renew` продлевает **конкретную** подписку — нужно передать её `uuid`.
* `POST /vpn/buy` позволяет купить дополнительную подписку даже если уже есть активные.

</details>

## 1) Посчитать стоимость

<mark style="color:$success;">`GET`</mark> `/vpn/quote`

### **Параметры запроса (query)**

| Name                                                 | Type | Description       |
| ---------------------------------------------------- | ---- | ----------------- |
| period\_months<mark style="color:$danger;">\*</mark> | int  | Период в месяцах. |

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

<mark style="color:$success;">`POST`</mark> `/vpn/buy`

### Тело запроса (Request Body)

| Name                                                 | Type   | Description                    |
| ---------------------------------------------------- | ------ | ------------------------------ |
| telegram\_id<mark style="color:$danger;">\*</mark>   | int    | Telegram ID конечного клиента. |
| client\_key<mark style="color:$danger;">\*</mark>    | string | Ключ клиента у реселлера       |
| period\_months<mark style="color:$danger;">\*</mark> | int    | Период в месяцах               |

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

<mark style="color:$success;">`POST`</mark> `/vpn/renew`

### Тело запроса (Request Body)

| Name                                                 | Type   | Description                    |
| ---------------------------------------------------- | ------ | ------------------------------ |
| period\_months<mark style="color:$danger;">\*</mark> | int    | Период в месяцах               |
| telegram\_id<mark style="color:$danger;">\*</mark>   | int    | Telegram ID конечного клиента. |
| client\_key<mark style="color:$danger;">\*</mark>    | string | Ключ клиента у реселлера       |
| uuid<mark style="color:$danger;">\*</mark>           | string | UUID подписки                  |

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

## 4) Удалить подписку

<mark style="color:$success;">`POST`</mark> `/vpn/delete`

### Тело запроса (Request Body)

| Name                                               | Type   | Description                    |
| -------------------------------------------------- | ------ | ------------------------------ |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента. |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера       |
| uuid<mark style="color:$danger;">\*</mark>         | string | UUID подписки                  |

### **Пример**

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/delete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id":123456789,
    "client_key":"client-001",
    "uuid":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "deleted": true
  }
}
```

## 5) Получить текущую информацию

<mark style="color:$success;">`GET`</mark> `/vpn/info`

### **Параметры запроса (query)**

| Name                                               | Type   | Description                    |
| -------------------------------------------------- | ------ | ------------------------------ |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента. |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера       |

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
