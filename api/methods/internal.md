# Служебные

## Получить баланс

`GET /balance`

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
