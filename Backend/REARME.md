# `/register` Endpoint Documentation

## Description
This endpoint registers a new user account. It validates the provided email, first name, and password. On successful registration, it creates the user record by hashing the password, stores it in the database, and returns a JWT for authentication.

## HTTP Request

- **Method:** POST
- **URL:** `/register`
- **Content-Type:** `application/json`

## Request Body

The endpoint expects the following JSON structure:

```json
{
    "fullName": {
        "firstName": "string (min. 3 characters)",
        "lastName": "string (optional, min. 3 characters if provided)"
    },
    "email": "string (must be a valid email, minimum 12 characters)",
    "password": "string (min. 6 characters)"
}
```

## Successful Response

- **Status Code:** 200 OK

```json
{
    "token": "JWT-token-string",
    "user": {
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "password":"password",
        "email": "string"
        // Note: The password is not returned in the response.
    }
}
```

## Error Responses

### Validation Error
- **Status Code:** 400 Bad Request

When any required field is missing or invalid, the response will include an errors array:

```json
{
    "errors": [
        {
            "msg": "Error message detailing the validation failure",
            "param": "fieldName",
            "location": "body"
        }
    ]
}
```

### Other Possible Errors
- **Status Code:** 500 Internal Server Error

Other errors such as database issues or server errors may return a 500 status code with an appropriate error message.