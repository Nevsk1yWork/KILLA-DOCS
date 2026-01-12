# php

Пример без библиотек (через cURL).

```bash
export TOKEN="YOUR_TOKEN"
```

## Мини-функция

```php
<?php
$BASE = 'https://proxy.killa.cc/api/v1';
$TOKEN = getenv('TOKEN') ?: 'YOUR_TOKEN';

function api($method, $path, $params = [], $json = null) {
  global $BASE, $TOKEN;

  $url = $BASE . $path;
  if (!empty($params)) {
    $url .= '?' . http_build_query($params);
  }

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
  if ($code < 200 || $code >= 300) {
    throw new Exception("HTTP $code: $resp");
  }
  if (!($data['ok'] ?? false)) {
    throw new Exception("API error: " . json_encode($data['error'] ?? null));
  }
  return $data['data'];
}
```

## Баланс

```php
<?php
print_r(api('GET', '/balance'));
```

## Dedicated: quote + buy

```php
<?php
$quote = api('GET', '/dedicated/quote', [
  'country_code' => 'RU',
  'period' => 30,
  'count' => 10,
  'ipv' => 4,
]);
print_r($quote);

$buy = api('POST', '/dedicated/buy', [], [
  'country_code' => 'RU',
  'period' => 30,
  'count' => 10,
  'ipv' => 4,
]);
print_r($buy);
```
