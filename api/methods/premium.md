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

#### Идентификация клиента (только для Premium Proxy)

Во всех методах Premium Proxy (трафик/прокси/whitelist/пароль) операции выполняются для **клиента реселлера**, определяемого парой:

* `telegram_id` — Telegram ID конечного пользователя
* `client_key` — произвольная строка, которую задаёт реселлер (можно писать что угодно).

По паре `telegram_id + client_key` происходит управление трафиком/прокси/настройками клиента. `client_key` можно использовать одинаковым для разных `telegram_id` — важна именно пара.

***

#### Параметры генерации прокси

**protocol**

* `http`
* `socks5`

**type**

* `sticky` — ротация по времени (1-120 мин)&#x20;
  * Дополнительно необходимо указать  `session_ttl`(в минутах)&#x20;
* `rotating` — ротация при каждом запросе

**format\_id**

* `1` — `hostname:port:login:password`
* `2` — `login:password@hostname:port`
* `3` — `hostname:port`

**anonymous**

* `true` / `false` (включает/выключает параметр анонимности)

**session\_ttl**

* используется только при `type=sticky`
* значение в минутах (в боте допустимый диапазон 1–120)

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

### **Параметры запроса (query)**

| Name                                             | Type   | Description |
| ------------------------------------------------ | ------ | ----------- |
| pool\_type<mark style="color:$danger;">\*</mark> | string | Тип пула    |
| gb<mark style="color:$danger;">\*</mark>         | number | Объём в GB  |

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

### Тело запроса (Request Body)

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| pool\_type<mark style="color:$danger;">\*</mark>   | string | Тип пула                      |
| gb<mark style="color:$danger;">\*</mark>           | number | Объём в GB                    |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера      |

### **Пример**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/traffic/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pool_type":"residential",
    "gb":10,
    "telegram_id":123456789,
    "client_key":"client-001"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "pool_type": "residential",
    "gb": 10,
    "traffic_gb": 10.0
  }
}
```

## Баланс трафика

<mark style="color:$success;">`GET`</mark> `/premium/traffic/balance`

### **Параметры запроса (query)**

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| pool\_type<mark style="color:$danger;">\*</mark>   | string | Тип пула                      |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера      |

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/premium/traffic/balance?pool_type=residential&telegram_id=123456789&client_key=client-001" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "pools": [
      { "pool_type": "residential", "traffic_gb": 9.99043 },
      { "pool_type": "datacenter", "traffic_gb": 0.0 },
      { "pool_type": "mobile", "traffic_gb": 0.0 },
      { "pool_type": "residential_premium", "traffic_gb": 0.0 }
    ]
  }
}
```

## Локации

* <mark style="color:$success;">`POST`</mark> `/premium/locations/countries` — получить список доступных стран для выбранного пула
* <mark style="color:$success;">`POST`</mark> `/premium/locations/states` — получить список штатов/регионов
* <mark style="color:$success;">`POST`</mark> `/premium/locations/cities` — получить список городов&#x20;
* <mark style="color:$success;">`POST`</mark> `/premium/locations/zipcodes` — получить список ZIP/индексов
* <mark style="color:$success;">`POST`</mark> `/premium/locations/asns` — получить список ASN

### Тело запроса (Request Body)

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

### Тело запроса (Request Body)

| Name                                               | Type           | Description                                                                                                                                                                                  |
| -------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pool\_type<mark style="color:$danger;">\*</mark>   | string         | Тип пула                                                                                                                                                                                     |
| countries<mark style="color:$danger;">\*</mark>    | array\[string] | Список стран                                                                                                                                                                                 |
| telegram\_id<mark style="color:$danger;">\*</mark> | int            | Telegram ID конечного клиента.                                                                                                                                                               |
| client\_key<mark style="color:$danger;">\*</mark>  | string         | Ключ клиента у реселлера                                                                                                                                                                     |
| protocol                                           | string         | Протокол: `http` или `socks5` (по умолчанию `http`)                                                                                                                                          |
| type                                               | string         | Тип ротации: `sticky` (по времени) или `rotating` (на каждый запрос)                                                                                                                         |
| session\_ttl                                       | int            | TTL сессии в минутах (только для `type=sticky`, обычно 1–120)                                                                                                                                |
| anonymous                                          | bool           | Анонимность: `true/false`                                                                                                                                                                    |
| quantity                                           | int            | Количество прокси (по умолчанию `1`)                                                                                                                                                         |
| format\_id                                         | int            | <p>Формат строк: <code>1</code>=<code>hostname:port:login:password</code></p><p><code>2</code>=<code>login:password@hostname:port</code></p><p><code>3</code>=<code>hostname:port</code></p> |
| states                                             | array\[string] | Фильтр по штатам/регионам                                                                                                                                                                    |
| cities                                             | array\[string] | Фильтр по городам                                                                                                                                                                            |
| zipcodes                                           | array\[string] | Фильтр по ZIP/индексам                                                                                                                                                                       |
| asns                                               | array\[string] | Фильтр по ASN                                                                                                                                                                                |

### Пример (минимальный)

```bash
curl -s https://proxy.killa.cc/api/v1/premium/proxies/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id": 123456789,
    "client_key": "client-001",
    "pool_type": "residential",
    "countries": ["RU"],
    "quantity": 2
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "pool_type": "residential",
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

| Name                                               | Type   | Description                                                |
| -------------------------------------------------- | ------ | ---------------------------------------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента                              |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера                                   |
| ip                                                 | string | IP адрес для белого списка (только для `/add` и `/remove`) |

### **Пример (add)**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/whitelist/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id":123456789,
    "client_key":"client-001",
    "ip":"1.2.3.4"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "added": true
  }
}
```

## Пароль sub-user

* <mark style="color:$success;">`GET`</mark> `/premium/password` — получить текущий пароль
* <mark style="color:$success;">`POST`</mark> `/premium/password/reset` — сбросить пароль

### Параметры / Тело запроса

| Name                                               | Type   | Description                   |
| -------------------------------------------------- | ------ | ----------------------------- |
| telegram\_id<mark style="color:$danger;">\*</mark> | int    | Telegram ID конечного клиента |
| client\_key<mark style="color:$danger;">\*</mark>  | string | Ключ клиента у реселлера      |

### **Пример (reset)**

```bash
curl -s https://proxy.killa.cc/api/v1/premium/password/reset \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_id":123456789,
    "client_key":"client-001"
  }'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "password": "new_password"
  }
}
```

##
