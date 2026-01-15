# PHP

{% hint style="info" %}
* **URL для запросов:** `https://proxy.killa.cc/api/v1`
* **Авторизация:** для каждого запроса передавайте токен в заголовке `Authorization: Bearer <token>`.
{% endhint %}

### 1) Подготовка

```bash
export TOKEN="YOUR_TOKEN"
export TG_ID="123456789"
export CLIENT_KEY="client-001"
```

### 2) Мини-функция + примеры

```php
<?php
$BASE = 'https://proxy.killa.cc/api/v1';
$TOKEN = getenv('TOKEN') ?: 'YOUR_TOKEN';

$TG_ID = (int)(getenv('TG_ID') ?: '123456789');
$CLIENT_KEY = getenv('CLIENT_KEY') ?: 'client-001';

function api($method, $path, $params = [], $json = null) {
  global $BASE, $TOKEN;

  $url = $BASE . $path;
  if (!empty($params)) $url .= '?' . http_build_query($params);

  $ch = curl_init($url);
  $headers = ["Authorization: Bearer $TOKEN"];

  if ($json !== null) {
    $headers[] = 'Content-Type: application/json';
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($json));
  }

  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $resp = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  $data = json_decode($resp, true);
  if ($code < 200 || $code >= 300) throw new Exception("HTTP $code: $resp");
  if (!($data['ok'] ?? false)) throw new Exception("API ошибка: " . json_encode($data['error'] ?? null));
  return $data['data'];
}

// 1) Баланс
print_r(api('GET', '/balance'));

// 2) Серверные: цена -> купить
$price = api('GET', '/dedicated/quote', [
  'country_code' => 'RU',
  'period' => 30,
  'count' => 10,
  'ipv' => 4,
]);
print_r($price);

$buy = api('POST', '/dedicated/buy', [], [
  'country_code' => 'RU',
  'period' => 30,
  'count' => 10,
  'ipv' => 4,
]);
print_r($buy);

// 3) Премиум: купить трафик -> генерация прокси
api('POST', '/premium/traffic/buy', [], [
  'pool_type' => 'residential',
  'gb' => 10,
  'telegram_id' => $TG_ID,
  'client_key' => $CLIENT_KEY,
]);

$proxy = api('POST', '/premium/proxies/generate', [], [
  'pool_type' => 'residential',
  'countries' => ['US'],
  'type' => 'sticky',
  'protocol' => 'http',
  'format_id' => 1,
  'quantity' => 10,
  'session_ttl' => 600,
  'telegram_id' => $TG_ID,
  'client_key' => $CLIENT_KEY,
]);
print_r($proxy);

// 4) VPN: купить -> информация
api('POST', '/vpn/buy', [], [
  'telegram_id' => $TG_ID,
  'client_key' => $CLIENT_KEY,
  'period_months' => 1,
]);

$info = api('GET', '/vpn/info', [
  'telegram_id' => $TG_ID,
  'client_key' => $CLIENT_KEY,
]);
print_r($info);
```
