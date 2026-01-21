# VPN

<details>

<summary><strong>Памятка</strong></summary>

***

#### **Идентификация клиента (обязательно для всех VPN-методов)**

Все операции выполняются для **клиента реселлера**, а не для владельца токена.

Клиент определяется парой:

* `telegram_id` — Telegram ID конечного пользователя.
* `client_key` — произвольная строка, которую задаёт реселлер (можно писать что угодно: внутренний id, username, email, `user-42` и т.п.).

По паре `telegram_id + client_key` происходит управление. `client_key` можно использовать одинаковым для разных `telegram_id` — важна именно пара.

***

#### Статусы подписки

`status` может быть одним из:

* `ACTIVE` — активна
* `DISABLED` — отключена
* `LIMITED` — ограничена (например, лимит устройств/трафика)
* `EXPIRED` — истекла

***

#### UUID подписки (важно для управления)

У клиента может быть несколько подписок одновременно.

* `GET /vpn/info` возвращает **список** подписок, каждая содержит `uuid`.

</details>

{% hint style="info" %}
* **URL для запросов:** `https://proxy.killa.cc/api/v1`
* **Авторизация:** для каждого запроса передавайте токен в заголовке `Authorization: Bearer <token>`.
{% endhint %}

## Посчитать стоимость

<mark style="color:$success;">`GET`</mark> `/vpn/quote`

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/quote" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "1": 129,
    "3": 349,
    "6": 649,
    "12": 999
  }
}
```

## Купить

<mark style="color:$success;">`POST`</mark> `/vpn/buy`

### Тело запроса

| Name                                                 | Type   | Description                                                                                            |
| ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| telegram\_id<mark style="color:$danger;">\*</mark>   | int    | Telegram ID конечного клиента                                                                          |
| client\_key<mark style="color:$danger;">\*</mark>    | string | Ключ клиента у реселлера                                                                               |
| period\_months<mark style="color:$danger;">\*</mark> | int    | <p>Период в месяцах.<br><strong>Только значения, полученные через</strong> <code>/vpn/quote</code></p> |

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
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "subscriptionUrl": "https://vpn.killa.cc/qwerty12345678",
    "expireAt": "2027-01-01T00:00:00.000Z",
    "expireAt_date": "01.01.2027"
  }
}
```

## Продлить подписку

<mark style="color:$success;">`POST`</mark> `/vpn/renew`

### Тело запроса

| Name                                                 | Type   | Description                                        |
| ---------------------------------------------------- | ------ | -------------------------------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark>   | int    | Telegram ID конечного клиента                      |
| client\_key<mark style="color:$danger;">\*</mark>    | string | Ключ клиента у реселлера                           |
| uuid<mark style="color:$danger;">\*</mark>           | string | UUID подписки                                      |
| period\_months<mark style="color:$danger;">\*</mark> | int    | **Только значения, полученные через** `/vpn/quote` |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/renew \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id": 123456789,
    "client_key": "client-001",
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "period_months": 3
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "subscriptionUrl": "https://vpn.killa.cc/qwerty12345678",
    "expireAt": "2027-04-01T00:00:00.000Z",
    "expireAt_date": "01.04.2027"
  }
}
```

## Удалить подписку

<mark style="color:$success;">`POST`</mark> `/vpn/delete`

### Тело запроса

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера      |
| uuid<mark style="color:$danger;">\*</mark>         | string | UUID подписки                 |

### **Пример**

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/delete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id": 123456789,
    "client_key": "client-001",
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "deleted": true
  }
}
```

## Получить информацию о пользователе

<mark style="color:$success;">`GET`</mark> `/vpn/info`

### **Параметры запроса**

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера      |

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
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
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

## Получить список устройств

<mark style="color:$success;">`GET`</mark> `/vpn/hwid/devices`

### Параметры запроса

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера      |
| uuid<mark style="color:$danger;">\*</mark>         | string | UUID подписки                 |

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/hwid/devices?telegram_id=123456789&client_key=client-001&uuid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "device_limit": 5,
    "connected": 2,
    "devices": [
      {
        "hwid": "abcdef123456",
        "platform": "android",
        "osVersion": "14",
        "deviceModel": "Pixel 8",
        "userAgent": "v2rayNG/1.8.15",
        "updatedAt": "2026-01-21T10:15:30.000Z"
      },
      {
        "hwid": "qwerty987654",
        "platform": "windows",
        "osVersion": "11",
        "deviceModel": "PC",
        "userAgent": "v2rayN/6.50",
        "updatedAt": "2026-01-21T09:02:10.000Z"
      }
    ]
  }
}
```

## Сброс одного устройства

<mark style="color:$success;">`POST`</mark> `/vpn/hwid/reset`

### Тело запроса

| Name                                               | Type   | Description                           |
| -------------------------------------------------- | ------ | ------------------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента         |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера              |
| uuid<mark style="color:$danger;">\*</mark>         | string | UUID подписки                         |
| hwid<mark style="color:$danger;">\*</mark>         | string | HWID устройства (из списка устройств) |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/hwid/reset \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id": 123456789,
    "client_key": "client-001",
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "hwid": "abcdef123456"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "hwid": "abcdef123456",
    "deleted": true
  }
}
```

## Cброс всех устройств

<mark style="color:$success;">`POST`</mark> `/vpn/hwid/reset-all`

### Тело запроса

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера      |
| uuid<mark style="color:$danger;">\*</mark>         | string | UUID подписки                 |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/hwid/reset-all \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id": 123456789,
    "client_key": "client-001",
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "deleted_all": true
  }
}
```

## Стоимость увеличения лимита

<mark style="color:$success;">`GET`</mark> `/vpn/hwid/quote`

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/hwid/quote" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "1": 149,
    "2": 249,
    "3": 349,
    "5": 499,
    "10": 799
  }
}
```

## Увеличить лимит устройств

<mark style="color:$success;">`POST`</mark> `/vpn/hwid/increase`

### Тело запроса

| Name                                               | Type   | Description                                                                                   |
| -------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента                                                                 |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера                                                                      |
| uuid<mark style="color:$danger;">\*</mark>         | string | UUID подписки                                                                                 |
| delta<mark style="color:$danger;">\*</mark>        | int    | На сколько увеличить лимит устройств. **Только значения, полученные через** `/vpn/hwid/quote` |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/hwid/increase \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id": 123456789,
    "client_key": "client-001",
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "delta": 2
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "client": {
      "telegram_id": 123456789,
      "client_key": "client-001"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "current_limit": 1,
    "delta": 2,
    "target_limit": 3,
    "price_rub": 249
  }
}
```
