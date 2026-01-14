# Серверные

<details>

<summary><mark style="color:blue;"><strong>Памятка</strong></mark></summary>

***

**Параметр `ipv` (тип/версия адреса):**

* `3` — IPv4 Shared (общий IPv4)
* `4` — IPv4 Individual (выделенный IPv4)
* `6` — IPv6 Individual (выделенный IPv6)

***

**Допустимые сроки `period` (в днях):**

* Для **IPv4** (`3`/`4`): `7 / 14 / 30 / 60 / 90`
* Для **IPv6** (`6`): `3 / 7 / 14 / 30 / 60 / 90`
* Для **продления**: `3 / 7 / 14 / 30 / 60 / 90`

</details>

## Посчитать стоимость

`GET /dedicated/quote`

### Параметры (query)

* `country_code` (string) — страна
* `period` (int) — период в днях
* `count` (int) — количество
* `ipv` (int) — версия прокси

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/quote?country_code=RU&period=30&count=10&ipv=4" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "country_code": "RU",
    "period": 30,
    "count": 10,
    "ipv": 4,
    "price_rub": 1800.0
  }
}
```

## Купить

`POST /dedicated/buy`

### Body (JSON)

* `country_code` (string) — страна
* `period` (int) — период в днях
* `count` (int) — количество
* `ipv` (int) — версия прокси

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/dedicated/buy \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"country_code":"RU","period":30,"count":10,"ipv":4}'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "check_id": "b_8300069",
    "order_id": 13765429,
    "price_rub": 8.9,
    "proxies": [
      {
        "ids": 36400089,
        "ip": "217.29.62.212",
        "port": "10900",
        "username": "username",
        "password": "password",
        "date_end": "2026-01-16 05:42:18"
      }
    ]
  }
}
```

## Список стран

`GET /dedicated/country`

### Параметры (query)

* `ipv` (int) — версия прокси

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/country?ipv=4" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "ipv": 4,
    "countries": [
      {
        "country_code": "ua",
        "title": "🇺🇦 Украина"
      },
      {
        "country_code": "us",
        "title": "🇺🇸 США"
      }
    ]
  }
}
```

***

## Количество доступных прокси

`GET /dedicated/count`

### Параметры (query)

* `country_code` (string) — код страны
* `ipv` (int) — версия прокси

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/count?country_code=ru&ipv=4" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "country_code": "ru",
    "ipv": 4,
    "count": 1233
  }
}
```

## Стоимость продления

`GET /dedicated/prolong/quote` — посчитать стоимость продления

### Параметры (query)

* `ids` (int) — айди, полученный при покупке (ids)
* `period` (int) — период в днях

### Пример

```bash
curl -s "https://proxy.killa.cc/api/v1/dedicated/prolong/quote?ids=36400089,36400090&period=3" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "period": 3,
    "total_price_rub": 8.9,
    "items": [
      {
        "ids": 36400089,
        "ipv": 6,
        "price_rub": 4.45
      },
      {
        "ids": 36400090,
        "ipv": 6,
        "price_rub": 4.45
      }
    ]
  }
}
```

## Продление

`POST /dedicated/prolong` — продлить

### Body (JSON)

* `ids` (int) — айди, полученный при покупке (ids)
* `period` (int) — период в днях

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/dedicated/prolong \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ids":[36400089,36400090],"period":3}'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "period": 3,
    "total_price_rub": 8.9,
    "items": [
      {
        "ids": 36400089,
        "date_end": "2026-01-19 05:42:18"
      },
      {
        "ids": 36400090,
        "date_end": "2026-01-19 05:42:18"
      }
    ]
  }
}
```

## Сменить протокол

`POST /dedicated/protocol`

### Body (JSON)

* `ids` (array\[int]) — id прокси
* `port_type` (string) — целевой протокол/тип порта (например `http` или `socks`)

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/dedicated/protocol \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ids":[36400089,36400090],"port_type":"socks"}'
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "port_type": "socks",
    "updated": []
  }
}
```

