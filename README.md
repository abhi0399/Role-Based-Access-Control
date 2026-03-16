# Botmakers Full Stack Assignment - Auth & RBAC

This repository contains a full-stack Spring Boot + React (TypeScript) Application demonstrating Role-Based Access Control (RBAC) and JWT Authentication.

## Prerequisites
- Java 17
- Node.js (v18+ recommended)
- Maven (included via Wrapper) or globally installed

## Stack
- **Backend**: Java 17, Spring Boot 3.2.x, Spring Data JPA, Spring Security, JWT (io.jsonwebtoken), H2 Database (In-Memory), MapStruct, Lombok, Swagger.
- **Frontend**: React 18, TypeScript, Vite, React Router, TailwindCSS, Axios, React Context API.

## 1. Backend Setup (Spring Boot)
The backend uses an H2 in-memory database, so no external PostgreSQL setup is required for evaluation. The database starts fresh every time you run the application.

1. Navigate to the root folder `d:\SPRING-BOOT\Botmakers-Assignment\`
2. Open a terminal.
3. Run the application using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(On Windows use `.\mvnw.cmd spring-boot:run`)*
   
4. The server will start on `http://localhost:8080`.

### Backend Docs (Swagger)
Once the backend is running, navigate to:
[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
You can directly test the API, authenticate via `/api/auth/login`, and inject the JWT token into Swagger.

## 2. Frontend Setup (React + Vite)
The frontend is completely isolated inside the `frontend` folder.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies via NPM:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. The application should now be accessible at `http://localhost:5173`.

## 3. How to Evaluate & Test
1. Make sure both `backend` (8080) and `frontend` (5173) are running concurrently.
2. Open your browser to `http://localhost:5173/register`.
3. Create a test account and choose **USER** as the role.
4. You will be redirected to the Dashboard. You should see the User content, but the **Admin section will be restricted**.
5. Logout.
6. Register a new account and choose **ADMIN** as the role.
7. You will be redirected to the Dashboard. You should now see **both User and Admin content unlocked**.
8. JWT tokens are actively utilized for all requests to `/api/user` and `/api/admin`. Invalid tokens or incorrect roles will yield HTTP 403 / 401 exceptions on the backend, which are elegantly handled by the frontend.
