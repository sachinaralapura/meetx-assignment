# MeetX API Documentation

This document provides detailed information about the REST API endpoints for the MeetX Basic Activity Booking App. The API allows users to register, log in, list activities, book activities, and view their bookings. The API is built using Node.js with Express.js, uses JWT for authentication, and connects to a MongoDB database.

## Base URL

`http://localhost:8000/api/v1`

## Authentication

- **JWT Token**: Required for protected endpoints (e.g., booking activities, viewing bookings). The token must be included in the `Cookie` header as `token=<JWT_TOKEN>`.
- **No Auth**: Public endpoints (e.g., listing activities) do not require authentication.

## Endpoints

### **1. User Registration**

Registers a new user with their details.

- **Endpoint**: `POST /user/signup`
- **Auth**: None
- **Content-Type**: `application/json`
- **Request Body**:

    ```json
    {
      "username": "string",
      "email": "string",
      "phone": "string",
      "password": "string"
    }
    ```

- **Example Request**:

    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "password": "securePass123"
    }
    ```

- **Success Response**:
    - **Status**: `201 Created`
    - **Body**:

        ```json
        {
          "message": "User registered successfully",
          "user": {
            "username": "john_doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "_id": "681de014433bd46f6061e19e"
          }
        }
        ```

- **Error Responses**:
    - **Status**: `400 Bad Request` (User already exists)

        ```json
        {
          "error": "User with this email already exists"
        }
        ```

    - **Status**: `400 Bad Request` (Validation error)

        ```json
        {
          "error": "Invalid input data"
        }
        ```


### **2. User Login**

Authenticates a user and returns a JWT token.

- **Endpoint**: `POST /user/login`
- **Auth**: None
- **Content-Type**: `application/json`
- **Request Body**:

    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Example Request**:

    ```json
    {
      "email": "john@example.com",
      "password": "securePass123"
    }
    ```

- **Success Response**:
    - **Status**: `200 OK`
    - **Body**:

        ```json
        {
          "message": "Login successful",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

- **Error Responses**:
    - **Status**: `401 Unauthorized` (Invalid credentials)

        ```json
        {
          "error": "Invalid email or password"
        }
        ```

    - **Status**: `400 Bad Request` (Validation error)

        ```json
        {
          "error": "Invalid input data"
        }
        ```


### **3. List Activities**

Retrieves a list of available activities (public endpoint).

- **Endpoint**: `GET /activity/activities`
- **Auth**: None
- **Content-Type**: `application/json`
- **Request Body**: None
- **Success Response**:
    - **Status**: `200 OK`
    - **Body**:

        ```json
        [
          {
            "_id": "681dd6fb486477056cf40268",
            "title": "Cricket Match",
            "description": "Friendly cricket match at Central Park",
            "location": "Central Park",
            "dateTime": "2025-05-15T14:00:00Z"
          },
          {
            "_id": "681dd6fb486477056cf40269",
            "title": "Movie Night",
            "description": "Outdoor movie screening",
            "location": "Downtown Theater",
            "dateTime": "2025-05-16T19:00:00Z"
          }
        ]
        ```

- **Error Responses**:
    - **Status**: `500 Internal Server Error`

        ```json
        {
          "error": "Failed to fetch activities"
        }
        ```


### **4. Book an Activity**

Books an activity for the authenticated user.

- **Endpoint**: `POST /activity/book`
- **Auth**: JWT Token (via `Cookie: token=<JWT_TOKEN>`)
- **Content-Type**: `application/json`
- **Request Body**:

    ```json
    {
      "activityId": "string"
    }
    ```

- **Example Request**:

    ```json
    {
      "activityId": "681dd6fb486477056cf40268"
    }
    ```

- **Success Response**:
    - **Status**: `201 Created`
    - **Body**:

        ```json
        {
          "message": "Activity booked successfully",
          "booking": {
            "userId": "681de014433bd46f6061e19e",
            "activityId": "681dd6fb486477056cf40268",
            "_id": "681de014433bd46f6061e19f"
          }
        }
        ```

- **Error Responses**:
    - **Status**: `400 Bad Request` (Invalid activity ID)

        ```json
        {
          "error": "Invalid activity ID"
        }
        ```

    - **Status**: `401 Unauthorized` (Missing or invalid token)

        ```json
        {
          "error": "Unauthorized"
        }
        ```

    - **Status**: `404 Not Found` (Activity not found)

        ```json
        {
          "error": "Activity not found"
        }
        ```


### **5. Get My Bookings**

Retrieves a list of activities booked by the authenticated user.

- **Endpoint**: `GET /activity/book`
- **Auth**: JWT Token (via `Cookie: token=<JWT_TOKEN>`)
- **Content-Type**: `application/json`
- **Request Body**: None
- **Success Response**:
    - **Status**: `200 OK`
    - **Body**:

        ```json
        [
          {
            "_id": "681de014433bd46f6061e19f",
            "userId": "681de014433bd46f6061e19e",
            "activityId": {
              "_id": "681dd6fb486477056cf40268",
              "title": "Cricket Match",
              "description": "Friendly cricket match at Central Park",
              "location": "Central Park",
              "dateTime": "2025-05-15T14:00:00Z"
            }
          }
        ]
        ```

- **Error Responses**:
    - **Status**: `401 Unauthorized` (Missing or invalid token)

        ```json
        {
          "error": "Unauthorized"
        }
        ```

    - **Status**: `500 Internal Server Error`

        ```json
        {
          "error": "Failed to fetch bookings"
        }
        ```


## Error Handling

- All endpoints return appropriate HTTP status codes and error messages in the response body.
- Common errors include:
    - `400 Bad Request`: Invalid input data or missing required fields.
    - `401 Unauthorized`: Missing or invalid JWT token.
    - `404 Not Found`: Resource (e.g., activity) not found.
    - `500 Internal Server Error`: Server-side issues.

## Notes

- **Validation**: Input data is validated using Joi or express-validator to ensure correct formats (e.g., email, phone).
- **Password Security**: Passwords are hashed using bcrypt before storage.
- **JWT**: Tokens are signed with a secret key and include user details (`userId`, `username`, `email`).
