# Премиум

<details>

<summary>Памятка</summary>

***

#### Пулы

Допустимые `pool_type`:

* `residential` — Резидентные
* `datacenter` — Датацентр
* `mobile` — Мобильные
* `residential_premium` — Премиум резидентные

***

#### Идентификация клиента

В премиум прокси **ключ доступа — `subuser_id`**.

* `telegram_id` передаётся **только** при первой покупке в `/premium/traffic/buy` — чтобы привязать подписку к клиенту (для внутреннего распознования)
* В ответе `/premium/traffic/buy` API возвращает `subuser_id` — это **единственный идентификатор**, который используется дальше.
* Все остальные методы принимают **только `subuser_id`** (`balance`, `generate`, `whitelist`, `password`, `traffic/add`).
* В каждом ответе возвращаются `telegram_id` и `pool_type` внутри объекта `subuser` **для удобства**, но они **не используются** для идентификации/доступа.
* Доступ к `subuser_id` ограничен владельцем токена: если `subuser_id` не существует или не принадлежит текущему владельцу (тому, кто создал данного пользователя) → **404 not\_found**.

***

#### Параметры генерации прокси

**protocol**

* `http`
* `socks5`

**type**

* `sticky` — ротация по времени (1-120 мин)&#x20;
  * Дополнительно необходимо указать `session_ttl` (в минутах)&#x20;
* `rotating` — ротация при каждом запросе

**format\_id**

* `1` — `hostname:port:login:password`
* `2` — `login:password@hostname:port`
* `3` — `hostname:port`

**anonymous**

* `true` / `false` (включает/выключает параметр анонимности)

**session\_ttl**

* используется только при `type=sticky`
* значение в минутах (допустимый диапазон 1–120)

***

#### Формат выдачи прокси

`format_id` определяет, как будут выглядеть строки в полях ответа `domain` и `ip` (это многострочный текст со списком прокси).

Варианты:

* `1` — `hostname:port:login:password`
* `2` — `login:password@hostname:port`
* `3` — `hostname:port`

Примечания:

* Если `format_id` не передан — используется `1`.
* Если передан неизвестный `format_id` — будет использован формат `2`.

</details>

{% hint style="info" %}
* **URL для запросов:** `https://proxy.killa.cc/api/v1`
* **Авторизация:** для каждого запроса передавайте токен в заголовке `Authorization: Bearer <token>`.
{% endhint %}

## Посчитать стоимость трафика

<mark style="color:$success;">`GET`</mark> `/premium/traffic/quote`

### **Параметры запроса**

| Name                                             | Type   | Description |
| ------------------------------------------------ | ------ | ----------- |
| pool\_type<mark style="color:$danger;">\*</mark> | string | Тип пула    |
| gb<mark style="color:$danger;">\*</mark>         | int    | Объём в ГБ  |

### **Пример**

```bash
curl -s "https://proxy.killa.cc/api/v1/premium/traffic/quote?pool_type=residential&gb=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "pool_type": "residential",
    "gb": 10,
    "price_per_gb_rub": 99.0,
    "price_rub": 990.0
  }
}
```

## Купить трафик

<mark style="color:$success;">`POST`</mark> `/premium/traffic/buy`

### Тело запроса

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| pool\_type<mark style="color:$danger;">\*</mark>   | string | Тип пула                      |
| gb<mark style="color:$danger;">\*</mark>           | int    | Объём в ГБ                    |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |

### **Пример**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/traffic/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pool_type":"residential",
    "gb":10,
    "telegram_id":123456789
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "subuser": {
      "subuser_id": 12345,
      "telegram_id": 123456789,
      "pool_type": "residential"
    },
    "price_rub": 990.0,
    "traffic_added_gb": 10,
    "traffic_balance_gb": 10.0
  }
}
```

## Увеличить трафик

<mark style="color:$success;">`POST`</mark> `/premium/traffic/add`

### Параметры запроса

| Name                                              | Type | Description           |
| ------------------------------------------------- | ---- | --------------------- |
| subuser\_id<mark style="color:$danger;">\*</mark> | int  | Идентификатор клиента |
| gb<mark style="color:$danger;">\*</mark>          | int  | Объём в ГБ            |

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/premium/traffic/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subuser_id": 12345,
    "gb": 5
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "subuser": {
      "subuser_id": 12345,
      "telegram_id": 123456789,
      "pool_type": "residential"
    },
    "price_rub": 495.0,
    "traffic_added_gb": 5,
    "traffic_balance_gb": 15.0
  }
}
```

## Баланс трафика

<mark style="color:$success;">`GET`</mark> `/premium/traffic/balance`

### **Параметры запроса**

| Name                                              | Type | Description           |
| ------------------------------------------------- | ---- | --------------------- |
| subuser\_id<mark style="color:$danger;">\*</mark> | int  | Идентификатор клиента |

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/premium/traffic/balance?subuser_id=12345" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "subuser": {
      "subuser_id": 12345,
      "telegram_id": 123456789,
      "pool_type": "residential"
    },
    "traffic_gb": 8.5
  }
}
```

## Локации

* <mark style="color:$success;">`POST`</mark> `/premium/locations/countries` — получить список доступных стран для выбранного пула
* <mark style="color:$success;">`POST`</mark> `/premium/locations/states` — получить список штатов/регионов
* <mark style="color:$success;">`POST`</mark> `/premium/locations/cities` — получить список городов&#x20;
* <mark style="color:$success;">`POST`</mark> `/premium/locations/zipcodes` — получить список ZIP/индексов
* <mark style="color:$success;">`POST`</mark> `/premium/locations/asns` — получить список ASN

### Тело запроса

| Name                                             | Type           | Description                                                             |
| ------------------------------------------------ | -------------- | ----------------------------------------------------------------------- |
| pool\_type<mark style="color:$danger;">\*</mark> | string         | Тип пула                                                                |
| countries                                        | array\[string] | Список стран (обязателен для `states` / `cities` / `zipcodes` / `asns`) |
| states                                           | array\[string] | Список штатов/регионов (опционально, как фильтр)                        |
| cities                                           | array\[string] | Список городов (опционально, как фильтр)                                |

### Пример (cities)

```bash
curl -s https://proxy.killa.cc/api/v1/premium/locations/cities \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pool_type": "residential",
    "countries": ["US"],
    "states": ["California"]
  }'
```

### Ответ (единый формат для всех методов)

```json
{
  "ok": true,
  "data": {
    "pool_type": "residential",
    "countries": ["us"],
    "states": ["california"],
    "items": [
      {
        "code": "alameda",
        "name": "Alameda",
        "count": 16
      },
      {
        "code": "alhambra",
        "name": "Alhambra",
        "count": 9
      }
    ]
  }
}
```

## Генерация прокси-листа

<mark style="color:$success;">`POST`</mark> `/premium/proxies/generate`

### Тело запроса

| Name                                              | Type           | Description                                                                                                                                                                                  |
| ------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| countries<mark style="color:$danger;">\*</mark>   | array\[string] | Список стран                                                                                                                                                                                 |
| subuser\_id<mark style="color:$danger;">\*</mark> | int            | Идентификатор клиента                                                                                                                                                                        |
| protocol                                          | string         | Протокол: `http` или `socks5` (по умолчанию `http`)                                                                                                                                          |
| type                                              | string         | Тип ротации: `sticky` (по времени) или `rotating` (на каждый запрос)                                                                                                                         |
| session\_ttl                                      | int            | TTL сессии в минутах (только для `type=sticky`, обычно 1–120)                                                                                                                                |
| anonymous                                         | bool           | Анонимность: `true/false`                                                                                                                                                                    |
| quantity                                          | int            | Количество прокси (по умолчанию `1`)                                                                                                                                                         |
| format\_id                                        | int            | <p>Формат строк: <code>1</code>=<code>hostname:port:login:password</code></p><p><code>2</code>=<code>login:password@hostname:port</code></p><p><code>3</code>=<code>hostname:port</code></p> |
| states                                            | array\[string] | Фильтр по штатам/регионам                                                                                                                                                                    |
| cities                                            | array\[string] | Фильтр по городам                                                                                                                                                                            |
| zipcodes                                          | array\[string] | Фильтр по ZIP/индексам                                                                                                                                                                       |
| asns                                              | array\[string] | Фильтр по ASN                                                                                                                                                                                |

### Пример (минимальный)

```bash
curl -s https://proxy.killa.cc/api/v1/premium/proxies/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subuser_id": 12345,
    "countries": ["ru"],
    "quantity": 2
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "subuser": {
      "subuser_id": 12345,
      "telegram_id": 123456789,
      "pool_type": "residential"
    },
    "params": {
      "countries": "RU",
      "cities": "",
      "states": "",
      "zipcodes": "",
      "asns": "",
      "anonymous": "0",
      "type": "sticky",
      "protocol": "http",
      "format": "hostname:port:login:password",
      "quantity": "50",
      "session_ttl": "10"
    },
    "domain": "gw.killa.cc:10000:login:password\n
gw.killa.cc:10001:login:password",
    "ip": "12.34.56.78:10000:login:password\n
12.34.56.78:10001:login:password"
  }
}
```

## Whitelist IP

* <mark style="color:$success;">`GET`</mark> `/premium/whitelist` — получить текущий whitelist
* <mark style="color:$success;">`POST`</mark> `/premium/whitelist/add` — добавить IP
* <mark style="color:$success;">`POST`</mark> `/premium/whitelist/remove` — удалить IP

### Параметры / тело запроса

| Name                                              | Type   | Description                                                |
| ------------------------------------------------- | ------ | ---------------------------------------------------------- |
| subuser\_id<mark style="color:$danger;">\*</mark> | int    | Идентификатор клиента                                      |
| ip                                                | string | IP адрес для белого списка (только для `/add` и `/remove`) |

### **Пример (add)**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/whitelist/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subuser_id": 12345,
    "ip":"1.2.3.4"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "subuser": {
      "subuser_id": 12345,
      "telegram_id": 123456789,
      "pool_type": "residential"
    },
    "added": true
  }
}
```

## Пароль sub-user

* <mark style="color:$success;">`GET`</mark> `/premium/password` — получить текущий пароль
* <mark style="color:$success;">`POST`</mark> `/premium/password/reset` — сбросить пароль

### Параметры / Тело запроса

| Name                                              | Type | Description           |
| ------------------------------------------------- | ---- | --------------------- |
| subuser\_id<mark style="color:$danger;">\*</mark> | int  | Идентификатор клиента |

### **Пример (reset)**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/password/reset \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subuser_id": 12345
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "subuser": {
      "subuser_id": 12345,
      "telegram_id": 123456789,
      "pool_type": "residential"
    },
    "login": "login",
    "password": "new_password"
  }
}
```
