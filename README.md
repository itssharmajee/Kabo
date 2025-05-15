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



# `Endpoints for the Caption`

# `caption/register` Endpoint

### Description
This endpoint allows new caption accounts to be created. A caption represents a vehicle operator on the platform. The endpoint validates the provided personal details and vehicle information before storing the new caption in the database. On successful registration, the system returns a JWT for authentication along with the newly created caption's details.

### HTTP Request
- **Method:** POST  
- **URL:** `http://localhost:3000/caption/register`  
- **Content-Type:** `application/json`

### Request Body
The request body should be sent as a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "string (minimum 3 characters)",
    "lastName": "string (optional; if provided, minimum 3 characters)"
  },
  "email": "string (must be a valid email, at least 12 characters)",
  "password": "string (minimum 6 characters)",
  "vehicle": {
    "color": "string (minimum 3 characters)",
    "plate": "string (minimum 3 characters)",
    "capacity": "number (minimum 1)",
    "vehicleType": "string (one of: 'car', 'motorcycle', 'auto')"
  }
}
```

### Example Request
```json
{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "Blue",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Successful Response
- **Status Code:** 201 Created

On success, the response includes an authentication token and the caption's details:

```json
{
  "token": "JWT-token-string",
  "caption": {
    "_id": "captionIdString",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

### Error Responses

#### Validation Errors
- **Status Code:** 400 Bad Request

If any required field is missing or does not meet the validation criteria, the response contains an errors array detailing the issues:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Duplicate Account
- **Status Code:** 400 Bad Request

If an account with the provided email already exists, the response will be:

```json
{
  "message": "Caption already Exists"
}
```
# `caption/login` Endpoint

### Description
Authenticates an existing caption (driver) account. Upon successful authentication, returns a JWT token and the caption's details. The token is also set as a cookie for subsequent requests.

### HTTP Request
- **Method:** POST
- **URL:** `http://localhost:3000/caption/login`
- **Content-Type:** `application/json`

### Request Body
```json
{
    "email": "string (must be a valid email)",
    "password": "string (minimum 6 characters)"
}
```

### Successful Response
- **Status Code:** 200 OK
```json
{
    "token": "JWT-token-string",
    "caption": {
        "_id": "captionIdString",
        "fullName": {
            "firstName": "Alice",
            "lastName": "Smith"
        },
        "email": "alice.smith@example.com",
        "vehicle": {
            "color": "Blue",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

### Error Responses
- **Status Code:** 401 Unauthorized
```json
{
    "message": "Invalid email or password"
}
```

---

# `caption/profile` Endpoint

### Description
Retrieves the authenticated caption's profile information. Requires a valid JWT token either in the Authorization header or as a cookie.

### HTTP Request
- **Method:** GET
- **URL:** `http://localhost:3000/caption/profile`
- **Headers:**
  - `Authorization: Bearer <JWT-token>` or use the `captionToken` cookie

### Successful Response
- **Status Code:** 200 OK
```json
{
    "_id": "captionIdString",
    "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
        "color": "Blue",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
    },
    "status": "inactive"
}
```

### Error Response
- **Status Code:** 401 Unauthorized
```json
{
    "message": "Unauthorized Access"
}
```

---

# `caption/logout` Endpoint

### Description
Logs out the currently authenticated caption by blacklisting their token and clearing the authentication cookie.

### HTTP Request
- **Method:** GET
- **URL:** `http://localhost:3000/caption/logout`
- **Headers:**
  - `Authorization: Bearer <JWT-token>` or use the `captionToken` cookie

### Successful Response
- **Status Code:** 200 OK
```json
{
    "message": "Logout user successfull"
}
```

### Error Response
- **Status Code:** 401 Unauthorized
```json
{
    "message": "Unauthorized Access"
}
```