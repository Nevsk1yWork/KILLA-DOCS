# python

Зависимость:

```bash
pip install requests
```

## Мини-клиент

```python
import os
import requests

BASE = "https://proxy.killa.cc/api/v1"
TOKEN = os.getenv("TOKEN", "YOUR_TOKEN")

def api(method: str, path: str, *, params=None, json=None):
    r = requests.request(
        method,
        f"{BASE}{path}",
        headers={"Authorization": f"Bearer {TOKEN}"},
        params=params,
        json=json,
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()
    if not data.get("ok", False):
        raise RuntimeError(f"API error: {data.get('error')}")
    return data["data"]
```

## Баланс

```python
print(api("GET", "/balance"))
```

## Dedicated: quote + buy

```python
quote = api(
    "GET",
    "/dedicated/quote",
    params={"country_code": "RU", "period": 30, "count": 10, "ipv": 4},
)
print("quote:", quote)

result = api(
    "POST",
    "/dedicated/buy",
    json={"country_code": "RU", "period": 30, "count": 10, "ipv": 4},
)
print("buy:", result)
```

## Premium: купить трафик + сгенерировать прокси

```python
api("POST", "/premium/traffic/buy", json={"pool_type": "residential", "gb": 10})

proxies = api(
    "POST",
    "/premium/proxies/generate",
    json={
        "pool_type": "residential",
        "countries": ["US"],
        "type": "sticky",
        "protocol": "http",
        "format_id": 1,
        "quantity": 10,
        "session_ttl": 600,
    },
)
print(proxies)
```

## VPN: купить + info

```python
api("POST", "/vpn/buy", json={"period_months": 1})
print(api("GET", "/vpn/info"))
```
