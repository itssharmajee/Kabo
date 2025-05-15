# `/register` Endpoint

This endpoint is responsible for creating a new user account. It checks that the provided email, first name, and password are valid. Upon successfully registering, the endpoint securely hashes the provided password and stores the user data in the database, finally issuing a JWT for future authentication.

## HTTP Request

- **Method:** POST
- **URL:** `/register`
- **Content-Type:** `application/json`

## Request Body

The request should be sent as JSON in the following format:

```json
{
    "fullName": {
        "firstName": "string (minimum 3 characters)",
        "lastName": "string (optional; if provided, minimum 3 characters)"
    },
    "email": "string (must be a valid email address, at least 12 characters)",
    "password": "string (minimum 6 characters)"
}
```

## Successful Response

- **Status Code:** 200 OK

On success, you will receive a JSON response containing the generated JWT and the newly registered user details:

```json
{
    "token": "JWT-token-string",
    "user": {
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "password": "string"
    }
}
```

## Error Responses

### Validation Errors

- **Status Code:** 400 Bad Request

If any fields are missing or invalid, the server responds with an errors array detailing the issues:

```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Invalid password",
            "path": "password",
            "location": "body"
        }
    ]
}
``>

---

# `/login` Endpoint

This endpoint is used to authenticate an existing user. It validates the provided email and password, and if they are correct, a JWT along with the user details is returned.

## HTTP Request

- **Method:** POST
- **URL:** `/login`
- **Content-Type:** `application/json`

## Request Body

Send a JSON object with the following structure:

```json
{
    "email": "string (must be a valid email)",
    "password": "string (minimum 6 characters)"
}
```

## Successful Response

- **Status Code:** 200 OK

A successful login returns a JSON response containing a JWT and the associated user information:

```json
{
    "token": "JWT-token-string",
    "user": {
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "password": "string"
    }
}
```

## Error Responses

### Validation Error

- **Status Code:** 400 Bad Request

If the request data fails validation, the error message will be in an array:

```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Invalid password",
            "path": "password",
            "location": "body"
        }
    ]
}
```

### Authentication Error

- **Status Code:** 401 Unauthorized

If the email or password is incorrect, you will receive a message indicating authentication failure:

```json
{
    "message": "Invalid email or password"
}
```

# `/profile` Endpoint

### Description
Retrieves the authenticated user's profile details. A valid JWT is required, either provided in the `Authorization` header as a Bearer token or via the `userToken` cookie.

### Request
- **Method:** GET  
- **URL:** `/profile`  
- **Headers:**  
  - `Authorization: Bearer <JWT-token>` or use the `userToken` cookie

_No request body is required._

### Response
- **Status Code:** 200 OK

**Example Successful Response:**
```json
{
    "_id": "userIdString",
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // ... any additional user fields ...
}
```

---

# `/logout` Endpoint

### Description
Logs out the currently authenticated user. This endpoint clears the authentication cookie and blacklists the token to prevent further use.

### Request
- **Method:** GET  
- **URL:** `/logout`  
- **Headers:**  
  - `Authorization: Bearer <JWT-token>` or rely on the `userToken` cookie

_No request body is required._

### Response
- **Status Code:** 200 OK

**Example Successful Response:**
```json
{
    "message": "Logout user successfull"
}
```

