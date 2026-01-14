# Служебные

{% hint style="info" %}
* **URL для запросов:** `https://proxy.killa.cc/api/v1`
* **Авторизация:** для каждого запроса передавайте токен в заголовке `Authorization: Bearer <token>`.
{% endhint %}

## Получить баланс

<mark style="color:$success;">`GET`</mark> `/balance`

### Пример

```bash
curl -s https://proxy.killa.cc/api/v1/balance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ответ

```json
{
  "ok": true,
  "data": {
    "balance_rub": 1234.56,
    "api_spent_rub": 1234.56
  }
}
```
