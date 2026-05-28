# Medicine Reminder App

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

medicine-reminder/
├── backend/              # Spring Boot REST API
├── mobile/               # React Native / Expo app
├── docker-compose.yml    # PostgreSQL service
├── .env.example          # Environment variables example
├── .gitignore
└── README.md


## Architecture

React Native / Expo App
        ↓ HTTP + JSON
Spring Boot REST API
        ↓ JPA / SQL
PostgreSQL Database

The mobile app sends HTTP requests to the backend. The backend validates JWT tokens, applies business rules, communicates with PostgreSQL, and returns JSON responses.


## Run the Project

### 1. Start PostgreSQL

sudo docker compose up -d medicine-db

### 2. Start Backend

set -a
source ../.env
set +a
./mvnw spring-boot:run

### 3. Start Mobile App

npm install
npm run web -- --port 8081


## Security

The backend uses Spring Security and JWT.

Only these endpoints are public:

/api/auth/register
/api/auth/login


All medicine endpoints are protected.

Each medicine is linked to the authenticated user, so users cannot access medicines that belong to another account.

## Author

Samadi Imane
Medicine Reminder App
