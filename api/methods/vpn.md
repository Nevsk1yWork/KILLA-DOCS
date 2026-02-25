# VPN

<details>

<summary><strong>Памятка</strong></summary>

***

#### Идентификация клиента

Клиент (реселлер) идентифицируется **только по API-токену** в заголовке.

* Все операции с подпиской выполняются **только по `uuid`**.
* Перед любым действием сервер проверяет, что указанный `uuid` **принадлежит именно этому reseller’у**.\
  Если `uuid` чужой или не существует — возвращается **`404 not_found`** (без утечек информации).

***

#### Статусы подписки

`status` может быть одним из:

* `ACTIVE` — активна
* `DISABLED` — отключена
* `LIMITED` — ограничена (например, лимит устройств/трафика)
* `EXPIRED` — истекла

***

#### UUID подписки

* `uuid` выдаётся **в ответе `/vpn/buy`**.
* Все дальнейшие действия выполняются **только по `uuid`** (`/vpn/info`, `/vpn/renew`, `/vpn/delete`, HWID-методы).
* У реселлера может быть несколько подписок — **храните `uuid` у себя** (в своей базе/панели/CRM). Эндпоинта “получить список всех uuid” в API **нет**.

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

| Name                                                 | Type | Description                                                                                            |
| ---------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------ |
| period\_months<mark style="color:$danger;">\*</mark> | int  | <p>Период в месяцах.<br><strong>Только значения, полученные через</strong> <code>/vpn/quote</code></p> |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/api/v1/vpn/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "period_months": 1
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "period_months": 1,
    "price_rub": 129,
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "subscriptionUrl": "https://....",
    "expireAt": "2026-03-25T10:00:00.000Z",
    "expireAt_date": "25.03.2026"
  }
}
```

## Продлить подписку

<mark style="color:$success;">`POST`</mark> `/vpn/renew`

### Тело запроса

| Name                                                 | Type   | Description                                        |
| ---------------------------------------------------- | ------ | -------------------------------------------------- |
| uuid<mark style="color:$danger;">\*</mark>           | string | UUID подписки                                      |
| period\_months<mark style="color:$danger;">\*</mark> | int    | **Только значения, полученные через** `/vpn/quote` |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/renew \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "period_months": 3
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "period_months": 3,
    "price_rub": 349,
    "subscriptionUrl": "https://....",
    "expireAt": "2026-06-25T10:00:00.000Z",
    "expireAt_date": "25.06.2026"
  }
}
```

## Удалить подписку

<mark style="color:$success;">`POST`</mark> `/vpn/delete`

### Тело запроса

| Name                                       | Type   | Description   |
| ------------------------------------------ | ------ | ------------- |
| uuid<mark style="color:$danger;">\*</mark> | string | UUID подписки |

### **Пример**

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/delete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
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

## Получить информацию о пользователе

<mark style="color:$success;">`GET`</mark> `/vpn/info`

### **Параметры запроса**

| Name                                       | Type   | Description   |
| ------------------------------------------ | ------ | ------------- |
| uuid<mark style="color:$danger;">\*</mark> | string | UUID подписки |

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/vpn/info?uuid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "status": "ACTIVE",
    "expireAt": "2026-06-25T10:00:00.000Z",
    "expireAt_date": "25.06.2026",
    "subscriptionUrl": "https://....",
    "trafficLimitBytes": 0,
    "hwidDeviceLimit": 5
  }
}
```

## Получить список устройств

<mark style="color:$success;">`GET`</mark> `/vpn/hwid/devices`

### Параметры запроса

| Name                                       | Type   | Description   |
| ------------------------------------------ | ------ | ------------- |
| uuid<mark style="color:$danger;">\*</mark> | string | UUID подписки |

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
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "device_limit": 5,
    "connected": 1,
    "devices": [
      {
        "hwid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "userUuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "platform": "Windows",
        "osVersion": "10.0.19045",
        "deviceModel": "Home-PC_x86_64",
        "userAgent": "Happ/1.5.2/Windows",
        "createdAt": "2026-01-21T14:42:27.559Z",
        "updatedAt": "2026-01-21T14:42:27.558Z"
      }
    ]
  }
}
```

## Сброс одного устройства

<mark style="color:$success;">`POST`</mark> `/vpn/hwid/reset`

### Тело запроса

| Name                                       | Type   | Description                           |
| ------------------------------------------ | ------ | ------------------------------------- |
| uuid<mark style="color:$danger;">\*</mark> | string | UUID подписки                         |
| hwid<mark style="color:$danger;">\*</mark> | string | HWID устройства (из списка устройств) |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/hwid/reset \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "hwid": "abcdef123456"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "hwid": "abcdef123456",
    "deleted": true
  }
}
```

## Cброс всех устройств

<mark style="color:$success;">`POST`</mark> `/vpn/hwid/reset-all`

### Тело запроса

| Name                                       | Type   | Description   |
| ------------------------------------------ | ------ | ------------- |
| uuid<mark style="color:$danger;">\*</mark> | string | UUID подписки |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/hwid/reset-all \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
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

| Name                                        | Type   | Description                                                                                   |
| ------------------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| uuid<mark style="color:$danger;">\*</mark>  | string | UUID подписки                                                                                 |
| delta<mark style="color:$danger;">\*</mark> | int    | На сколько увеличить лимит устройств. **Только значения, полученные через** `/vpn/hwid/quote` |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/vpn/hwid/increase \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "delta": 2
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "current_limit": 5,
    "delta": 2,
    "target_limit": 7,
    "price_rub": 249
  }
}
```
