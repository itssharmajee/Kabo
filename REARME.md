# `Kabo`
 * Kabo is an Uber-like cab service platform designed to facilitate on-demand ride bookings,
 * route planning, fare computations, and user-driver matching in real-time.
 *
 * Core Features:
 * - Real-time ride matching between passengers and nearby drivers.
 * - Dynamic fare calculation based on distance, time, and traffic conditions.
 * - Integrated route planning and navigation support.
 * - User-friendly interface for booking, tracking rides, and ratings.
 *
 * This module handles the essential functionalities of Kabo, ensuring efficient 
 * communication between the user and the driver, and providing a smooth and reliable 
 * cab service experience similar to other leading ride-sharing platforms.

# Endpoints for the User 

# `user/register` Endpoint

This endpoint is responsible for creating a new user account. It checks that the provided email, first name, and password are valid. Upon successfully registering, the endpoint securely hashes the provided password and stores the user data in the database, finally issuing a JWT for future authentication.

## HTTP Request

- **Method:** POST
- **URL:** `http://localhost:3000/user/register`
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

# `user/login` Endpoint

This endpoint is used to authenticate an existing user. It validates the provided email and password, and if they are correct, a JWT along with the user details is returned.

## HTTP Request

- **Method:** POST
- **URL:** `http://localhost:3000/user/login`
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

# `user/profile` Endpoint

### Description
Retrieves the authenticated user's profile details. A valid JWT is required, either provided in the `Authorization` header as a Bearer token or via the `userToken` cookie.

### Request
- **Method:** GET  
- **URL:** `http://localhost:3000/user/profile`  
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
}
```

---

# `user/logout` Endpoint

### Description
Logs out the currently authenticated user. This endpoint clears the authentication cookie and blacklists the token to prevent further use.

### Request
- **Method:** GET  
- **URL:** `http://localhost:3000/user/logout`  
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

