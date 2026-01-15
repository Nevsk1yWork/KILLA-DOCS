# Python

{% hint style="info" %}
* **URL для запросов:** `https://proxy.killa.cc/api/v1`
* **Авторизация:** для каждого запроса передавайте токен в заголовке `Authorization: Bearer <token>`.
{% endhint %}

### 1) Установка

```bash
pip install requests
```

### 2) Подготовка переменных

```bash
export TOKEN="YOUR_TOKEN"
export TG_ID="123456789"
export CLIENT_KEY="client-001"
```

### 3) Мини-клиент

```python
import os
import requests

BASE = "https://proxy.killa.cc/api/v1"
TOKEN = os.getenv("TOKEN", "YOUR_TOKEN")

TG_ID = int(os.getenv("TG_ID", "123456789"))
CLIENT_KEY = os.getenv("CLIENT_KEY", "client-001")

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
    payload = r.json()
    if not payload.get("ok"):
        raise RuntimeError(payload.get("error"))
    return payload.get("data")
```

### 4) Баланс

```python
balance = api("GET", "/balance")
print("Текущий баланс:", balance)
```

### 5) Серверные: цена → купить

```python
price = api("GET", "/dedicated/quote", params={
    "country_code": "ru",
    "period": 30,
    "count": 10,
    "ipv": 4
})
print("Цена:", price)

buy = api("POST", "/dedicated/buy", json={
    "country_code": "ru",
    "period": 30,
    "count": 10,
    "ipv": 4
})
print("Покупка:", buy)
```

### 6) Премиум: купить трафик → сгенерировать прокси

```python
buy = api("POST", "/premium/traffic/buy", json={
    "pool_type": "residential",
    "gb": 10,
    "telegram_id": TG_ID,
    "client_key": CLIENT_KEY,
})
print("Покупка:", buy)

proxy = api("POST", "/premium/proxies/generate", json={
    "pool_type": "residential",
    "countries": ["US"],
    "type": "sticky",
    "protocol": "http",
    "format_id": 1,
    "quantity": 10,
    "session_ttl": 600,
    "telegram_id": TG_ID,
    "client_key": CLIENT_KEY,
})
print("Прокси-лист:", proxy)
```

### 7) VPN: купить → информация

```python
buy = api("POST", "/vpn/buy", json={
    "telegram_id": TG_ID,
    "client_key": CLIENT_KEY,
    "period_months": 1,
})
print("Покупка:", buy)

info = api("GET", "/vpn/info", params={
    "telegram_id": TG_ID, 
    "client_key": CLIENT_KEY
})
print("Информация:", info)
```
