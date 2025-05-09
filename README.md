
# MeetX Backend API

## Description

This project is a simple REST API backend for a "Basic Activity Booking App" similar to MeetX use cases. It allows users to register, login, view available activities, book activities, and view their bookings.

## Tech Stack

* **Backend:** Node.js with Express.js
* **Database:** MongoDB
* **Authentication:** JWT Token-based authentication

## Project Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add the following variables:
    ```env
    NODE_ENV=production
    MONGO_URI=<your_mongodb_connection_string>
    PORT=8000
    JWT_SECRET=<your_jwt_secret_key>
    ```
    * Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.
    * Replace `<your_jwt_secret_key>` with a strong, unique secret key for JWT.

4.  **Start the development server:**
    ```bash
    npm start
    ```
    The server will start on the port specified in your `.env` file (default is 8000).

## .env Setup

The `.env` file is used to configure environment-specific variables for the application.

```env
NODE_ENV=production
MONGO_URI=
PORT=8000
JWT_SECRET=
````

- `NODE_ENV`: Specifies the environment (e.g., `development`, `production`).
- `MONGO_URI`: The connection string for your MongoDB database.
- `PORT`: The port on which the application server will listen.
- `JWT_SECRET`: A secret key used for signing and verifying JSON Web Tokens.

## API Endpoints

The following are the available API endpoints.

### User Authentication

- **POST `/api/v1/user/signup`**: Register a new user.
    - Request Body: `{"username": "john_doe", "email": "john@example.com", "phone": "1234567890", "password": "securePass123"}`
- **POST `/api/v1/user/login`**: Login an existing user.
    - Request Body: `{"email": "john@example.com", "password": "securePass123"}`
    - Returns a JWT auth token upon successful login.

### Activities

- **GET `/api/v1/activity/activities`**: List all available activities. (Public Endpoint)
    - Each activity includes: `id`, `title`, `description`, `location`, `date & time`.

### Bookings

- **POST `/api/v1/activity/book`**: Book an activity. (Authorized Users Only)
    - Requires JWT token in the `Cookie` header (e.g., `token=<your_jwt_token>`).
    - Request Body: `{"activityId": "<activity_id>"}`
- **GET `/api/v1/activity/book`**: Get all activities booked by the logged-in user. (Authorized Users Only)
    - Requires JWT token in the `Cookie` header (e.g., `token=<your_jwt_token>`).

[API Documentation](apiDocumentation.md)
[curl Requests](request.md)

