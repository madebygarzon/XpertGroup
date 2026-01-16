# Prueba Técnica – Aplicación Full Stack (Node.js, Angular, MongoDB)

## TL;DR

- Fullstack app con Node.js + Express + MongoDB + Angular 17
- Clean Architecture + SOLID
- Autenticación JWT
- 59 tests (Backend + Frontend)
- Docker Compose listo para producción

> Aplicación full-stack desarrollada como prueba técnica para la vacante -Analista de desarrollo Fullstack- en XpertGroup  

## 📋 Tabla de Contenidos

- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Inicio Rápido](#-inicio-rápido)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Arquitectura](#️-arquitectura)
- [Pruebas Unitarias](#-pruebas-unitarias)
- [Docker](#-docker)
- [Variables de Entorno](#️-variables-de-entorno)
- [Características Destacadas](#-características-destacadas)
- [Flujo de Autenticación](#-flujo-de-autenticación)
- [API Endpoints](#-api-endpoints-del-backend)
- [Troubleshooting](#-troubleshooting)
- [Próximas Mejoras](#-próximas-mejoras)
- [Documentación Adicional](#-documentación-adicional)

## 📂 Estructura del Proyecto

```
XpertGroup/
├── backend/                    # Backend REST API (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── domain/            # Capa de Dominio - Entidades y repositorios
│   │   ├── application/       # Capa de Aplicación - Casos de uso y DTOs
│   │   ├── infrastructure/    # Capa de Infraestructura - Controllers, DB, APIs externas
│   │   └── shared/           # Configuración compartida
│   ├── tests/                 # Pruebas unitarias (Vitest) - 26 tests
│   ├── Dockerfile             # Imagen Docker del backend
│   ├── .env.example           # Template de variables de entorno
│   └── package.json
│
├── frontend/                   # Frontend (Angular 17)
│   ├── src/app/
│   │   ├── core/             # Capa de Dominio + Aplicación - Modelos, servicios, guards
│   │   ├── shared/           # Componentes compartidos - Navbar, Loader, Carousel
│   │   └── features/         # Módulos por funcionalidad - Home, Breeds, Auth, Profile
│   ├── Dockerfile             # Imagen Docker del frontend (Nginx)
│   └── package.json
│
├── docker-compose.yml         # Orquestación de contenedores (MongoDB + Backend + Frontend)
└── README.md                  # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend (REST API)
- **Node.js 18+** con **TypeScript** - Runtime y lenguaje principal
- **Express.js** - Framework web minimalista
- **MongoDB** - Base de datos NoSQL para usuarios
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación stateless
- **Bcrypt** - Hashing seguro de contraseñas
- **Vitest** - Framework de testing ultrarrápido
- **Axios** - Cliente HTTP para consumir The Cat API
- **Docker** - Contenedorización con multi-stage builds

### Frontend (SPA)
- **Angular 17** - Framework frontend con Standalone Components
- **TypeScript** - Type safety y OOP
- **RxJS** - Programación reactiva y manejo de streams
- **SCSS** - Preprocesador CSS con variables y mixins
- **Jasmine + Karma** - Testing de componentes y servicios
- **Nginx** - Servidor web ligero para producción
- **Docker** - Contenedorización optimizada

### Infraestructura
- **Docker Compose** - Orquestación de contenedores
- **The Cat API** - API externa para datos de razas de gatos

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado)

La forma más rápida de ejecutar toda la aplicación:

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

Esto levantará automáticamente:
- 🗄️ **MongoDB**: `localhost:27017` (base de datos)
- ⚙️ **Backend API**: `http://localhost:3000` (REST API)
- 🌐 **Frontend**: `http://localhost:4200` (aplicación web)

**Acceso**:
1. Abre tu navegador en `http://localhost:4200`
2. Explora las razas de gatos
3. Regístrate en `/auth/register` para acceder a funciones protegidas

### Opción 2: Ejecución Local (Desarrollo)

#### 1️⃣ Backend

```bash
cd backend
npm install                    # Instalar dependencias
cp .env.example .env          # Crear archivo de configuración
# Asegúrate de tener MongoDB corriendo: mongod
npm run dev                   # Iniciar en modo desarrollo
```

El backend estará disponible en `http://localhost:3000`

#### 2️⃣ Frontend

```bash
cd frontend
npm install                    # Instalar dependencias
npm start                      # Iniciar en modo desarrollo
```

El frontend estará disponible en `http://localhost:4200`

#### 3️⃣ Base de Datos

Asegúrate de tener MongoDB ejecutándose:
```bash
# Opción 1: MongoDB con docker-compose (Recomendada)
docker-compose up -d mongodb

# Opción 2: MongoDB con docker run (alternativa)
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Funcionalidades Implementadas

### Backend

#### Controlador de Gatos (Breeds)
- ✅ `GET /api/breeds` - Todas las razas
- ✅ `GET /api/breeds/:breed_id` - Raza por ID
- ✅ `GET /api/breeds/search?q=query` - Búsqueda de razas

#### Controlador de Imágenes
- ✅ `GET /api/images/imagesbybreedid?breed_id=xxx&limit=5` - Imágenes por raza

#### Controlador de Usuarios
- ✅ `POST /api/users/login` - Login de usuario
- ✅ `POST /api/users/register` - Registro de usuario

### Frontend

#### Vista 1: Breeds List (`/breeds`)
- ✅ Lista desplegable de razas
- ✅ Carrusel de imágenes al seleccionar raza
- ✅ Información detallada de la raza
- ✅ Tabla con todas las razas

#### Vista 2: Search (`/search`)
- ✅ Input de búsqueda
- ✅ Botón de búsqueda
- ✅ Filtrado de tabla por coincidencias
- ✅ Opción de limpiar búsqueda

#### Vista 3: Login (`/auth/login`)
- ✅ Formulario de login
- ✅ Validación de campos
- ✅ Integración con backend
- ✅ Almacenamiento de JWT

#### Vista 4: Register (`/auth/register`)
- ✅ Formulario de registro
- ✅ Validación completa
- ✅ Confirmación de contraseña
- ✅ Creación de usuario

#### Vista 5: Profile (`/profile`) - Protegida
- ✅ Información del usuario logueado
- ✅ Protegida por AuthGuard
- ✅ Redirige a login si no autenticado

## 🏗️ Arquitectura

### Clean Architecture

Tanto backend como frontend siguen **Clean Architecture** con separación clara de responsabilidades:

**Backend (3 capas):**
```
Domain (Entidades y Repositorios)
  ↓
Application (Casos de uso y DTOs)
  ↓
Infrastructure (Controllers, DB, APIs externas)
```

**Frontend (adaptada a Angular):**
```
Core (Modelos, Repositorios abstractos, Guards, Interceptors)
  ↓
Features (Componentes de UI por funcionalidad)
  ↓
Services (Implementaciones HTTP de repositorios)
```

### Principios SOLID Aplicados

Ambos proyectos implementan los 5 principios SOLID:

1. **Single Responsibility Principle (SRP)**
   - **Backend**: Cada caso de uso tiene una única responsabilidad (ej: `GetAllBreedsUseCase`, `RegisterUserUseCase`)
   - **Frontend**: Cada componente maneja solo su vista, cada servicio solo su comunicación HTTP

2. **Open/Closed Principle (OCP)**
   - **Backend**: Extensible mediante interfaces de repositorio sin modificar código existente
   - **Frontend**: Abstracciones (`BreedRepository`, `AuthRepository`) permiten nuevas implementaciones

3. **Liskov Substitution Principle (LSP)**
   - **Backend**: Implementaciones de `IBreedRepository` son intercambiables
   - **Frontend**: Providers de Angular permiten cambiar implementaciones (`BreedHttpService` ↔ `BreedMockService`)

4. **Interface Segregation Principle (ISP)**
   - **Backend**: Interfaces específicas por dominio (`IBreedRepository`, `IUserRepository`, `IImageRepository`)
   - **Frontend**: Repositorios segregados por funcionalidad

5. **Dependency Inversion Principle (DIP)**
   - **Backend**: Casos de uso dependen de interfaces, no de implementaciones concretas
   - **Frontend**: Componentes dependen de abstracciones inyectadas vía DI de Angular

**Documentación detallada**:
- Backend: Ver `backend/ARCHITECTURE.md` para análisis completo de SOLID
- Frontend: Ejemplos de código en secciones anteriores

## 🧪 Pruebas Unitarias

### Backend (Vitest)

El backend utiliza **Vitest** como framework de testing, ejecutándose en Node.js (terminal).

```bash
cd backend
npm test              # Ejecutar 26 tests
npm run test:coverage # Con reporte de cobertura
```

**Tests implementados** (6 casos de uso):
- ✅ `GetAllBreedsUseCase` - Obtener todas las razas
- ✅ `GetBreedByIdUseCase` - Obtener raza por ID
- ✅ `SearchBreedsUseCase` - Búsqueda de razas
- ✅ `GetImagesByBreedIdUseCase` - Imágenes por raza
- ✅ `LoginUserUseCase` - Login de usuario
- ✅ `RegisterUserUseCase` - Registro de usuario

**Características**:
- Mocks de repositorios para aislar lógica de negocio
- Tests de validación de datos
- Pruebas de manejo de errores
- Ejecución rápida (2-3 segundos)

### Frontend (Jasmine + Karma)

El frontend utiliza **Jasmine** con **Karma**, ejecutándose en Chrome (navegador).

```bash
cd frontend
npm test              # Ejecutar 33 tests en Chrome
npm run test:coverage # Con reporte de cobertura
```

**Tests implementados**:
- ✅ Componentes: Verifican rendering y eventos del usuario
- ✅ Servicios: Mocks de HTTP requests con HttpClientTestingModule
- ✅ Guards: Verifican redirecciones y protección de rutas
- ✅ Formularios: Validación reactiva

**Características**:
- Tests de componentes con `ComponentFixture`
- Mocks de servicios y repositorios
- Tests de navegación y routing
- Ejecución en navegador (5-10 segundos)

### Comparación de Testing

| Aspecto         | Backend (Vitest)        | Frontend (Karma + Jasmine) |
|-----------------|-------------------------|----------------------------|
| **Comando**     | `npm test`              | `npm test`                 |
| **Framework**   | Vitest                  | Karma + Jasmine            |
| **Entorno**     | Node.js (terminal)      | Chrome (navegador)         |
| **Qué prueba**  | Lógica de negocio       | Componentes e interfaz     |
| **Archivos**    | `*.test.ts`             | `*.spec.ts`                |
| **Total tests** | 26 tests                | 33 tests                   |
| **Velocidad**   | Rápido (2-3s)           | Medio (5-10s)              |

## 📱 Diseño Responsivo (Frontend)

El frontend implementa un diseño completamente responsivo con **mobile-first approach**:

**Breakpoints implementados**:
- 📱 **Mobile**: < 480px (diseño vertical optimizado)
- 📱 **Tablet**: 480px - 768px (grid de 2 columnas)
- 💻 **Desktop**: > 768px (grid de 3-4 columnas)

**Características**:
- ✅ **Grid layouts adaptativos** con CSS Grid y Flexbox
- ✅ **Media queries** optimizadas para cada dispositivo
- ✅ **Touch-friendly** con botones grandes en móviles
- ✅ **Imágenes responsivas** con max-width
- ✅ **Navegación adaptativa** (hamburger menu en móvil)
- ✅ **Fuentes escalables** con unidades rem
- ✅ **Tablas scrollables** en móviles

**Probado en**:
- ✅ Chrome DevTools (todos los dispositivos)
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ iPad (Safari)
- ✅ Desktop (Chrome, Firefox, Safari)

## 🐳 Docker

### Docker Compose (Orquestación completa)

El proyecto incluye configuración completa de Docker Compose para levantar todos los servicios:

```bash
# Iniciar todos los servicios (MongoDB + Backend + Frontend)
docker-compose up

# Iniciar en background (detached mode)
docker-compose up -d

# Reconstruir imágenes antes de iniciar
docker-compose up --build

# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (limpieza completa)
docker-compose down -v
```

**Servicios incluidos**:
- `mongodb`: MongoDB 6.0 (puerto 27017)
- `backend`: API REST de Node.js (puerto 3000)
- `frontend`: SPA de Angular con Nginx (puerto 4200)

### Imágenes Individuales

Si prefieres ejecutar contenedores individualmente:

**Backend:**
```bash
cd backend
docker build -t catapi-backend .
docker run -p 3000:3000 --env-file .env catapi-backend
```

**Frontend:**
```bash
cd frontend
docker build -t catapi-frontend .
docker run -p 4200:80 catapi-frontend
```

**Características de las imágenes**:
- **Backend**: Multi-stage build para optimizar tamaño
- **Frontend**: Build de producción servido por Nginx
- **Volúmenes**: Datos de MongoDB persistidos en volumen Docker

## ⚙️ Variables de Entorno

### Backend (`backend/.env`)

Crear el archivo `.env` en la carpeta `backend/` copiando desde `.env.example`:

```bash
cd backend
cp .env.example .env
```

Contenido del archivo `.env`:

```env
# Puerto del servidor
PORT=3000

# Conexión a MongoDB
MONGODB_URI=mongodb://localhost:27017/catapi

# API Key de The Cat API (https://thecatapi.com/)
CAT_API_KEY=your_cat_api_key_here

# Secret para firmar tokens JWT (cambiar en producción)
JWT_SECRET=your-super-secret-jwt-key

# CORS - Origen permitido para el frontend
CORS_ORIGIN=http://localhost:4200
```

**Notas importantes**:
- En producción, cambia `JWT_SECRET` por un valor aleatorio seguro
- Obtén tu propia API Key en [The Cat API](https://thecatapi.com/)
- Para Docker, usa `MONGODB_URI=mongodb://mongodb:27017/catapi`
- Aunque el enunciado original solicitaba endpoints GET para login y registro,
se implementaron como POST siguiendo buenas prácticas de seguridad,
evitando exponer credenciales en la URL.

### Frontend (`frontend/src/environments/`)

**Desarrollo** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**Producción** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'  // Cambiar por tu dominio
};
```

El build de Angular usa automáticamente el archivo correcto según el comando:
- `npm start` → `environment.ts`
- `npm run build` → `environment.prod.ts`

## Colección de Postman

Importar `backend/postman_collection.json` en Postman para probar los endpoints del backend.

## 💻 Scripts NPM Disponibles

### Backend (`cd backend`)

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instalar dependencias |
| `npm run dev` | Ejecutar en modo desarrollo con hot-reload (tsx watch) |
| `npm run build` | Compilar TypeScript a JavaScript (dist/) |
| `npm start` | Ejecutar versión compilada (producción) |
| `npm test` | Ejecutar 26 tests con Vitest |
| `npm run test:coverage` | Ejecutar tests con reporte de cobertura |
| `npm run lint` | Ejecutar ESLint (si está configurado) |

### Frontend (`cd frontend`)

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instalar dependencias |
| `npm start` | Ejecutar en modo desarrollo (http://localhost:4200) |
| `npm run build` | Build de producción (dist/) |
| `npm run build:dev` | Build de desarrollo |
| `npm test` | Ejecutar 33 tests con Karma + Jasmine |
| `npm run test:coverage` | Ejecutar tests con reporte de cobertura |
| `npm run lint` | Ejecutar ESLint |
| `npm run watch` | Build en modo watch |

## 📚 Documentación Adicional

Este README unifica la información del proyecto completo. Para detalles específicos adicionales:

### Backend
- **`backend/ARCHITECTURE.md`** - Análisis detallado de Clean Architecture y SOLID con ejemplos de código
- **`backend/EXTENSIONS.md`** - Propuestas de extensión (PostgreSQL, AWS, NestJS)
- **`backend/QUICKSTART.md`** - Guía de inicio rápido (5 minutos)
- **`backend/postman_collection.json`** - Colección Postman para testing de API

### Frontend
- Los detalles técnicos del frontend están completamente integrados en este README
- Para información sobre rutas y navegación, ver sección "Funcionalidades Implementadas"
- Para configuración de entorno, ver sección "Variables de Entorno"
- Para arquitectura y SOLID, ver sección "Arquitectura"

## ✨ Características Destacadas

### Backend (Node.js + Express + MongoDB)

**Arquitectura y Patrones**:
- ✅ **Clean Architecture** con 3 capas bien definidas (Domain → Application → Infrastructure)
- ✅ **SOLID Principles** aplicados y documentados en `backend/ARCHITECTURE.md`
- ✅ **Dependency Injection** manual para casos de uso
- ✅ **Repository Pattern** para abstracción de acceso a datos
- ✅ **Use Case Pattern** para lógica de negocio aislada

**Calidad y Testing**:
- ✅ **Error Handling** centralizado con middleware
- ✅ **Validation** con express-validator en rutas
- ✅ **Testing**: 26 tests con Vitest y mocks de repositorios
- ✅ **TypeScript** strict mode para type safety

**Seguridad**:
- ✅ **JWT** para autenticación stateless
- ✅ **Bcrypt** para hashing de contraseñas
- ✅ **CORS** configurado para frontend
- ✅ **Environment variables** para configuración sensible

**DevOps**:
- ✅ **Docker** multi-stage builds para optimización
- ✅ **Graceful shutdown** de conexiones
- ✅ **Health check** endpoint para monitoreo

### Frontend (Angular 17)

**Arquitectura y Patrones**:
- ✅ **Clean Architecture** adaptada a Angular (Core → Features → Services)
- ✅ **SOLID Principles** en servicios y componentes
- ✅ **Dependency Injection** nativo de Angular
- ✅ **Repository Pattern** con interfaces abstractas
- ✅ **Modular architecture** con feature modules

**Funcionalidades**:
- ✅ **Guards** (AuthGuard) para protección de rutas
- ✅ **Interceptors** para agregar JWT automáticamente
- ✅ **Reactive Forms** con validación
- ✅ **RxJS Observables** para programación reactiva
- ✅ **Routing** con lazy loading capability

**UI/UX**:
- ✅ **Responsive Design** mobile-first (breakpoints: 768px, 480px)
- ✅ **Loading spinners** y feedback visual
- ✅ **Error handling** con mensajes al usuario
- ✅ **Carousel** para visualización de imágenes
- ✅ **Accessible navigation** con semantic HTML

**Calidad y Testing**:
- ✅ **Testing**: 33 tests con Jasmine + Karma
- ✅ **TypeScript** strict mode
- ✅ **Component testing** con mocks
- ✅ **Service testing** con HttpClientTestingModule

**DevOps**:
- ✅ **Docker** con Nginx para producción
- ✅ **Environment configuration** (dev/prod)

## 🔐 Flujo de Autenticación

El sistema implementa autenticación JWT completa:

```
1. 📝 Usuario se registra → POST /api/users/register
   ↓
2. 🔒 Backend hashea contraseña con Bcrypt
   ↓
3. 💾 Backend guarda usuario en MongoDB
   ↓
4. 🎫 Backend genera y retorna JWT token
   ↓
5. 💻 Frontend guarda token en localStorage
   ↓
6. 🔄 AuthInterceptor agrega token automáticamente a cada request HTTP
   ↓
7. 🛡️ AuthGuard protege rutas privadas (ej: /profile)
   ↓
8. ✅ Usuario autenticado accede a funcionalidades protegidas
```

**Componentes del sistema de autenticación**:

**Backend**:
- `RegisterUserUseCase`: Validación y registro
- `LoginUserUseCase`: Validación de credenciales
- `bcrypt`: Hashing de contraseñas (10 rounds)
- `jsonwebtoken`: Generación y verificación de tokens

**Frontend**:
- `AuthService`: Gestión de login/registro/logout
- `AuthInterceptor`: Inyección automática de JWT en headers
- `AuthGuard`: Protección de rutas
- `localStorage`: Almacenamiento persistente del token

## 🔌 API Endpoints del Backend

### Health Check
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Verificar estado del servidor | No |

### Breeds (Razas de gatos)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/breeds` | Obtener todas las razas | No |
| GET | `/api/breeds/:id` | Obtener raza por ID (ej: `abys`, `beng`) | No |
| GET | `/api/breeds/search?q=query` | Buscar razas por nombre | No |

### Images (Imágenes)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/images/imagesbybreedid?breed_id=xxx&limit=5` | Obtener imágenes de una raza | No |

### Users (Autenticación)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/users/register` | Registrar nuevo usuario | No |
| POST | `/api/users/login` | Iniciar sesión | No |

**Códigos de respuesta**:
- `200` - OK
- `201` - Created
- `400` - Bad Request (validación fallida)
- `401` - Unauthorized (credenciales inválidas)
- `404` - Not Found (recurso no encontrado)
- `409` - Conflict (usuario ya existe)
- `500` - Internal Server Error

**Colección de Postman**: Importar `backend/postman_collection.json` para probar todos los endpoints.

## 🔧 Troubleshooting

### Problema: Backend no conecta a MongoDB

**Síntoma**: Error `MongooseServerSelectionError` o `ECONNREFUSED mongodb:27017`

**Soluciones**:

1. Verificar que MongoDB está corriendo:
```bash
# Verificar conexión
mongosh --eval "db.adminCommand('ping')"

# Si no está corriendo, iniciar MongoDB
mongod
```

2. Verificar la URI en `.env`:
```env
# Ejecución local
MONGODB_URI=mongodb://localhost:27017/catapi

# Docker Compose
MONGODB_URI=mongodb://mongodb:27017/catapi
```

3. Verificar puerto:
```bash
# Ver si MongoDB está escuchando en el puerto
lsof -i :27017
```

### Problema: Frontend no puede comunicarse con backend

**Síntoma**: Error `CORS policy` o `ERR_CONNECTION_REFUSED`

**Soluciones**:

1. Verificar que backend está corriendo:
```bash
curl http://localhost:3000/health
# Debe retornar: {"status":"success",...}
```

2. Verificar CORS en `backend/.env`:
```env
CORS_ORIGIN=http://localhost:4200
```

3. Verificar `apiUrl` en `frontend/src/environments/environment.ts`:
```typescript
apiUrl: 'http://localhost:3000/api'
```

4. Verificar puertos en uso:
```bash
# Backend debe estar en 3000
lsof -i :3000

# Frontend debe estar en 4200
lsof -i :4200
```

### Problema: Docker - Permission denied

**Síntoma**: `permission denied while trying to connect to the Docker daemon socket`

**Soluciones**:

```bash
# Linux/Mac: agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Cerrar sesión y volver a entrar, o ejecutar:
newgrp docker

# Verificar permisos
docker ps
```

### Problema: Tests fallan en el frontend

**Síntoma**: `Chrome not found` o `ChromeHeadless not found`

**Soluciones**:

```bash
# Instalar Chrome (Ubuntu/Debian)
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

# Verificar instalación
google-chrome --version
```

### Problema: Puerto ya en uso

**Síntoma**: `Error: listen EADDRINUSE: address already in use :::3000`

**Soluciones**:

```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# Matar proceso
kill -9 <PID>

# O cambiar puerto en .env
PORT=3001
```

## 🚧 Próximas Mejoras

### Backend (API REST)

**Base de datos y caché**:
- [ ] PostgreSQL para relaciones complejas y datos adicionales
- [ ] Redis para caché de razas populares y sesiones
- [ ] Elasticsearch para búsqueda avanzada

**Cloud y DevOps**:
- [ ] AWS SNS para notificaciones push
- [ ] AWS SQS para procesamiento asíncrono
- [ ] AWS Lambda para funciones serverless
- [ ] CloudWatch para logs y monitoreo
- [ ] CI/CD con GitHub Actions
- [ ] Kubernetes para orquestación

**Seguridad y rendimiento**:
- [ ] Rate limiting con express-rate-limit
- [ ] Refresh tokens para JWT
- [ ] API versioning (v1, v2)
- [ ] Compression y caching headers
- [ ] Helmet.js para security headers

**Framework**:
- [ ] Migración a NestJS para mayor escalabilidad
- [ ] GraphQL como alternativa a REST
- [ ] WebSockets para actualizaciones en tiempo real

### Frontend (SPA)

**Performance**:
- [ ] Lazy loading de módulos con Angular Router
- [ ] Virtual scrolling para listas largas
- [ ] Image lazy loading y optimización
- [ ] Service Worker para caché offline

**Funcionalidades**:
- [ ] PWA (Progressive Web App) support
- [ ] Internacionalización (i18n) multiidioma
- [ ] NgRx para state management centralizado
- [ ] Búsqueda avanzada con filtros múltiples
- [ ] Favoritos persistidos del usuario

**Testing y calidad**:
- [ ] E2E testing con Cypress o Playwright
- [ ] Visual regression testing
- [ ] Aumentar cobertura de tests al 80%+
- [ ] Storybook para documentar componentes

**UI/UX**:
- [ ] Animaciones con Angular Animations
- [ ] Dark mode toggle
- [ ] Accesibilidad WCAG 2.1 AA
- [ ] Skeleton loaders para mejor UX

Ver `backend/EXTENSIONS.md` para análisis detallado de extensiones propuestas.

## 📊 Resumen Ejecutivo

| Métrica | Backend | Frontend | Total |
|---------|---------|----------|-------|
| **Tests** | 26 tests (Vitest) | 33 tests (Karma+Jasmine) | 59 tests |
| **Cobertura** | Casos de uso | Componentes y servicios | Full stack |
| **Lenguaje** | TypeScript | TypeScript | 100% TypeScript |
| **Arquitectura** | Clean Architecture (3 capas) | Clean Architecture (adaptada) | ✅ |
| **SOLID** | ✅ Implementado | ✅ Implementado | ✅ |
| **Docker** | ✅ Multi-stage | ✅ Nginx | ✅ Docker Compose |
| **Endpoints** | 7 endpoints REST | 5 vistas + guards | - |
| **Autenticación** | JWT + Bcrypt | JWT + Guards + Interceptors | ✅ |
| **Responsive** | - | ✅ Mobile-first | ✅ |

**Tecnologías principales**:
- **Backend**: Node.js 18, Express, MongoDB, Mongoose, Vitest, JWT, Bcrypt
- **Frontend**: Angular 17, RxJS, SCSS, Jasmine, Karma
- **DevOps**: Docker, Docker Compose, Nginx
- **Arquitectura**: Clean Architecture, SOLID, Repository Pattern, Dependency Injection

**Tiempo de desarrollo estimado**: 40-50 horas (incluyendo arquitectura, tests y documentación)

---

## ✍️ Autor

- Desarrollado por **Carlos Garzón**  
- Software Engineer, Fullstack Developer.
---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
