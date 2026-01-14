# Премиум

<details>

<summary><mark style="color:blue;">Памятка</mark></summary>

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

## Посчитать стоимость трафика

`GET /premium/traffic/quote`

### **Параметры (query)**

* `pool_type` (string) — тип пула
* `gb` (number) — объём в GB

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

`POST /premium/traffic/buy`

### **Body (JSON)**

* `pool_type` (string) — тип пула
* `gb` (number) — объём в GB
* `telegram_id` (int) — Telegram ID конечного клиента
* `client_key` (string) — ключ клиента у реселлера

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

`GET /premium/traffic/balance`

### **Параметры (query)**

* `pool_type` (string) — тип пула
* `telegram_id` (int) — Telegram ID конечного клиента
* `client_key` (string) — ключ клиента у реселлера

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

* `POST /premium/locations/countries` — получить список доступных стран для выбранного пула
* `POST /premium/locations/states` — получить список штатов/регионов
* `POST /premium/locations/cities` — получить список городов&#x20;
* `POST /premium/locations/zipcodes` — получить список ZIP/индексов
* `POST /premium/locations/asns` — получить список ASN

#### Body (JSON):

* `pool_type` (string) — тип пула
* `countries` (array\[string]) — список стран (обязательно для `states/cities/zipcodes/asns`)
* `states` (array\[string]) — список штатов (необязательно)
* `cities` (array\[string]) — список городов (необязательно)

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

`POST /premium/proxies/generate`

### Body (JSON)

#### **Обязательные параметры:**

* `pool_type` (string) — тип пула (см. «Памятка»)
* `countries` (array\[string]) — список стран (минимум 1 значение)
* `telegram_id` (int) — Telegram ID конечного клиента
* `client_key` (string) — ключ клиента у реселлера (произвольная строка)

#### **Параметры локации (опционально):**

* `states` (array\[string]) — штаты/регионы
* `cities` (array\[string]) — города
* `zipcodes` (array\[string]) — ZIP/почтовые индексы
* `asns` (array\[string]) — ASN

#### **Параметры прокси (опционально):**

* `protocol` (string) — `http` или `socks5` (по умолчанию `http`)
* `type` (string) — `sticky` или `rotating` (по умолчанию `sticky`)
* `session_ttl` (int) — TTL сессии в минутах (по умолчанию `10`, применяется только при `type=sticky`)
* `anonymous` (bool) — анонимность (по умолчанию `false`)
* `quantity` (int) — количество прокси (по умолчанию `1`)
* `format_id` (int) — формат строк в ответе (по умолчанию `1`, см. «Памятка»)

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

* `GET /premium/whitelist` — получить текущий whitelist
* `POST /premium/whitelist/add` — добавить IP
* `POST /premium/whitelist/remove` — удалить IP

### Параметры (query / body)

* `telegram_id` (int) — Telegram ID конечного клиента
* `client_key` (string) — ключ клиента у реселлера
* `ip` (string) — IP-адрес для привязки/удаления (используется только в `/add` и `/remove`)

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

* `GET /premium/password` — получить текущий пароль
* `POST /premium/password/reset` — сбросить пароль

### Параметры (query / body)

* `telegram_id` (int) — Telegram ID конечного клиента
* `client_key` (string) — ключ клиента у реселлера

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
