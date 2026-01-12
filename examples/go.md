# go

```bash
export TOKEN="YOUR_TOKEN"
```

## Мини-клиент

```go
package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "io"
  "net/http"
  "net/url"
  "os"
  "time"
)

type OkResponse struct {
  Ok   bool            `json:"ok"`
  Data json.RawMessage `json:"data"`
}

type ErrResponse struct {
  Ok    bool `json:"ok"`
  Error struct {
    Code    string          `json:"code"`
    Message string          `json:"message"`
    Details json.RawMessage `json:"details"`
  } `json:"error"`
}

type Client struct {
  Base  string
  Token string
  HTTP  *http.Client
}

func (c *Client) Do(method, path string, params map[string]string, body any) (json.RawMessage, error) {
  u, _ := url.Parse(c.Base + path)
  q := u.Query()
  for k, v := range params {
    q.Set(k, v)
  }
  u.RawQuery = q.Encode()

  var reqBody io.Reader
  if body != nil {
    b, _ := json.Marshal(body)
    reqBody = bytes.NewReader(b)
  }

  req, _ := http.NewRequest(method, u.String(), reqBody)
  req.Header.Set("Authorization", "Bearer "+c.Token)
  if body != nil {
    req.Header.Set("Content-Type", "application/json")
  }

  res, err := c.HTTP.Do(req)
  if err != nil {
    return nil, err
  }
  defer res.Body.Close()

  raw, _ := io.ReadAll(res.Body)
  if res.StatusCode < 200 || res.StatusCode >= 300 {
    return nil, fmt.Errorf("HTTP %d: %s", res.StatusCode, string(raw))
  }

  var ok OkResponse
  if err := json.Unmarshal(raw, &ok); err == nil && ok.Ok {
    return ok.Data, nil
  }

  var er ErrResponse
  if err := json.Unmarshal(raw, &er); err == nil {
    return nil, fmt.Errorf("API error: %s (%s)", er.Error.Message, er.Error.Code)
  }

  return nil, fmt.Errorf("unexpected response: %s", string(raw))
}

func main() {
  c := &Client{
    Base:  "https://proxy.killa.cc/api/v1",
    Token: os.Getenv("TOKEN"),
    HTTP:  &http.Client{Timeout: 60 * time.Second},
  }

  // balance
  b, err := c.Do("GET", "/balance", nil, nil)
  fmt.Println("balance", string(b), err)

  // dedicated quote
  q, err := c.Do("GET", "/dedicated/quote", map[string]string{
    "country_code": "RU",
    "period":       "30",
    "count":        "10",
    "ipv":          "4",
  }, nil)
  fmt.Println("quote", string(q), err)
}
```
