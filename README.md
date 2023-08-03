# Green Api Test

## How to run

```
Docker version 24.0.0, build 98fdcd769b
```
```
Docker Compose version 2.18.1
```

From project root:
```bash
docker context use default
docker compose -p green-api-test up --build
```

## Usage

```bash
curl --location 'http://localhost:3000/api/m1?a=7&b=5'
```