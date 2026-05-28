# Medicine Reminder App
<img width="300" height="250" alt="logo" src="https://github.com/user-attachments/assets/5fe4eb05-53ce-42dc-91fa-b181297d4c9b" />


Medicine Reminder App is a client-server application that allows users to manage their medicine schedule securely.

The project was developed using a Spring Boot REST API secured with JWT and a React Native / Expo mobile application that consumes this API.

## Features

- User registration
- User login
- JWT authentication
- Medicine list
- Add medicine
- Edit medicine
- Delete medicine
- User data isolation

## Technologies

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- PostgreSQL
- Maven

### Mobile

- React Native
- Expo
- React Native Web
- JavaScript

### Tools

- Docker Compose
- Postman
- Git / GitHub
- VS Code Remote SSH

## Project Structure

```text
medicine-reminder/
├── backend/              # Spring Boot REST API
├── mobile/               # React Native / Expo app
├── docker-compose.yml    # PostgreSQL service
├── .env.example          # Environment variables example
├── .gitignore
└── README.md
```

## Architecture

<img width="1330" height="653" alt="architecture" src="https://github.com/user-attachments/assets/f433e048-355e-47c4-b157-4fec1c187b7a" />

The mobile app sends HTTP requests to the backend. The backend validates JWT tokens, applies business rules, communicates with PostgreSQL, and returns JSON responses.


## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account and return JWT |
| POST | `/api/auth/login` | Login and return JWT |

<img width="383" height="573" alt="image" src="https://github.com/user-attachments/assets/a69d3311-49c0-425c-a127-dbb8d00205e8" />


### Medicines

All medicine endpoints require a JWT token.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/medicines` | Get user medicines |
| GET | `/api/medicines/{id}` | Get one medicine |
| POST | `/api/medicines` | Create medicine |
| PUT | `/api/medicines/{id}` | Update medicine |
| DELETE | `/api/medicines/{id}` | Delete medicine |

<img width="415" height="666" alt="image" src="https://github.com/user-attachments/assets/ef5abe92-ee98-4fc9-abb1-d38215029963" />
<img width="390" height="674" alt="image" src="https://github.com/user-attachments/assets/e414e998-8b0c-4345-94cc-674e0c2ec4f7" />


Protected requests use:

```http
Authorization: Bearer <token>
```

## Environment Variables

Create a `.env` file from `.env.example`.

Example:

```env
POSTGRES_DB=medicine_db
POSTGRES_USER=medicine_user
POSTGRES_PASSWORD=medicine_pass_change_me

JWT_SECRET=medicine-reminder-jwt-secret-key-very-secure-2026-change-me
JWT_EXPIRATION_MS=86400000
```

## Run the Project

### 1. Start PostgreSQL

```bash
cd /medicine-reminder
sudo docker compose up -d medicine-db
```

### 2. Start Backend

```bash
cd /medicine-reminder/backend
set -a
source ../.env
set +a
./mvnw spring-boot:run
```

Backend URL example:

```text
http://192.168.1.1:8080
```

### 3. Start Mobile App

```bash
cd /medicine-reminder/mobile
npm install
npm run web -- --port 8081
```

Mobile web URL example:

```text
http://192.168.1.1:8081
```

If the server IP changes, update:

```text
mobile/src/config/api.js
```

## Example Medicine Request

```http
POST /api/medicines
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Vitamin C",
  "dose": "500mg",
  "time": "09:00:00",
  "frequency": "Once per day",
  "notes": "After breakfast"
}
```


## Security

The backend uses Spring Security and JWT.

Only these endpoints are public:

```text
/api/auth/register
/api/auth/login
```

All medicine endpoints are protected.

Each medicine is linked to the authenticated user, so users cannot access medicines that belong to another account.

## Author

```text
Samadi Imane
Medicine Reminder App
```
