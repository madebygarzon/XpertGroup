# XpertGroup — Full-Stack Technical Challenge

Production-style full-stack application built for a Full Stack Developer assessment, focused on clean architecture, testability, and secure authentication.

## Why this project stands out
- Demonstrates **end-to-end ownership**: API design, frontend implementation, auth, testing, and containerized deployment.
- Applies **Clean Architecture + SOLID** in a practical, interview-ready codebase.
- Includes **59 automated tests** across backend and frontend.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Vitest
- **Frontend:** Angular 17, TypeScript, RxJS, SCSS, Jasmine/Karma
- **Infra:** Docker, Docker Compose, Nginx

## Core Features
- JWT-based authentication and protected routes
- User profile flow
- External API integration (The Cat API)
- Modular domain/application/infrastructure layers
- Containerized local/prod-like setup

## Architecture Snapshot
- `backend/src/domain` → business entities/contracts
- `backend/src/application` → use-cases and DTOs
- `backend/src/infrastructure` → controllers, DB adapters, external services
- `frontend/src/features` → feature modules
- `frontend/src/core` → shared app logic (services/guards/models)

## Getting Started
```bash
# from repo root
cp backend/.env.example backend/.env

# run all services
docker compose up --build
```

## Testing
```bash
# backend
cd backend && npm test

# frontend
cd ../frontend && npm test
```

## Business Value
This project shows strong readiness for real product teams by combining software design discipline, delivery pragmatism, and maintainable implementation.

## Author
**Carlos Garzón**  
Software Engineer | Full Stack Developer
