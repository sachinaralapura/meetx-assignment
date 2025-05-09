## User Registration (POST /signup)

```bash
curl -X POST http://localhost:8000/api/v1/user/signup
-H "Content-Type: application/json"
-d '{"username":"john_doe","email":"john@example.com","phone":"1234567890","password":"securePass123"}'
```

## User Login (POST /login)

```bash
curl -X POST http://localhost:8000/api/v1/user/login
-H "Content-Type: application/json"
-c cookie.txt
-d '{"email":"john@example.com","password":"securePass123"}'
```

## Verify User (GET /verify)

```bash
curl -X GET http://localhost:8000/api/v1/user/verify
-H "Content-Type: application/json"
-b cookie.txt
```

---

### Listing activities

```bash
curl -X GET "http://localhost:8000/api/v1/activity/activities"
-H "Content-Type: application/json"
```

---

### Book an activity

```bash
curl -X POST http://localhost:8000/api/v1/activity/book \
-H "Content-Type: application/json" \
-b cookie.txt \
-d '{
    "activityId": "681dd6fb486477056cf40268"
}'
```

### GET my booking

```bash
curl -X GET http://localhost:8000/api/v1/activity/book \
-b cookie.txt \
```
