# Authentication Flow (Updated Design)

## Authentication Process

```text
User Login
    │
    ▼
Save ONLY JWT Token
    │
    ▼
Page Refresh / App Reload
    │
    ▼
Check if Token Exists
    │
    ▼
GET /api/user/me
    │
    ▼
Backend Verifies JWT Token
    │
    ▼
Returns Latest User Information
    │
    ▼
Update Auth Context
```

## Flow Explanation

1. User logs in successfully.

2. The frontend stores **only the JWT token** (not the user object).

3. Whenever the application reloads or refreshes, it checks whether a token exists.

4. If a token is available, the frontend sends a request to:

    ```http
    GET /api/user/me
    ```

5. The backend verifies the JWT token.

6. If the token is valid, the backend returns the latest user information from the database.

7. The frontend updates the authentication context with the returned user data.

### Advantages

- ✅ Always uses the latest user data.
- ✅ Prevents stale user information.
- ✅ Keeps authentication state synchronized with the backend.
- ✅ Stores only the JWT token in local storage.
- ✅ More secure and easier to maintain.
