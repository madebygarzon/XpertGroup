# Cat API Backend - Prueba Técnica

Backend REST API para gestionar información de razas de gatos, utilizando **Clean Architecture** y principios **SOLID**.

## Tecnologías Utilizadas

- **Node.js** con **TypeScript**
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Vitest** - Testing framework
- **The Cat API** - API externa para datos de gatos
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas

## Arquitectura

El proyecto sigue **Clean Architecture** con las siguientes capas:

```
src/
├── domain/               # Capa de Dominio (Entidades y Repositorios)
│   ├── entities/        # Modelos de dominio
│   └── repositories/    # Interfaces de repositorios
├── application/         # Capa de Aplicación (Casos de Uso)
│   ├── dtos/           # Data Transfer Objects
│   └── use-cases/      # Lógica de negocio
├── infrastructure/      # Capa de Infraestructura
│   ├── api/            # Controllers, Routes, Middlewares
│   ├── database/       # MongoDB connection y models
│   └── external-services/ # Integración con The Cat API
└── shared/             # Código compartido
    └── config/         # Configuración
```

## Principios SOLID Aplicados

1. **Single Responsibility**: Cada clase tiene una única responsabilidad
2. **Open/Closed**: Extensible mediante interfaces sin modificar código existente
3. **Liskov Substitution**: Las implementaciones de repositorios son intercambiables
4. **Interface Segregation**: Interfaces específicas para cada repositorio
5. **Dependency Inversion**: Dependencias a través de interfaces, no implementaciones concretas

## Instalación

### Prerrequisitos

- Node.js >= 18.x
- MongoDB >= 6.x
- npm o yarn

### Pasos

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd testxg
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/catapi
CAT_API_KEY=live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP
JWT_SECRET=your-super-secret-jwt-key
```

4. Iniciar MongoDB:
```bash
mongod
```

5. Ejecutar en modo desarrollo:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo con hot-reload
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Ejecutar versión compilada
- `npm test` - Ejecutar pruebas unitarias
- `npm run test:coverage` - Ejecutar pruebas con cobertura

## API Endpoints

### Health Check

```
GET /health
```

Respuesta:
```json
{
  "status": "success",
  "message": "Cat API is running",
  "timestamp": "2024-01-09T..."
}
```

### Controlador de Gatos (Breeds)

#### 1. Obtener todas las razas

```
GET /api/breeds
```

Respuesta:
```json
{
  "status": "success",
  "data": [
    {
      "id": "abys",
      "name": "Abyssinian",
      "description": "...",
      "temperament": "Active, Energetic",
      "origin": "Egypt",
      "life_span": "14 - 15",
      "weight": {
        "imperial": "7 - 10",
        "metric": "3 - 5"
      }
    }
  ],
  "count": 67
}
```

#### 2. Obtener raza por ID

```
GET /api/breeds/:breed_id
```

Ejemplo:
```
GET /api/breeds/abys
```

Respuesta:
```json
{
  "status": "success",
  "data": {
    "id": "abys",
    "name": "Abyssinian",
    "description": "..."
  }
}
```

#### 3. Buscar razas

```
GET /api/breeds/search?q=bengal
```

Parámetros:
- `q` (string, requerido): Término de búsqueda

Respuesta:
```json
{
  "status": "success",
  "data": [
    {
      "id": "beng",
      "name": "Bengal",
      "description": "..."
    }
  ],
  "count": 1
}
```

### Controlador de Imágenes

#### Obtener imágenes por raza

```
GET /api/images/imagesbybreedid?breed_id=abys&limit=5
```

Parámetros:
- `breed_id` (string, requerido): ID de la raza
- `limit` (number, opcional): Cantidad de imágenes (default: 10, max: 100)

Respuesta:
```json
{
  "status": "success",
  "data": [
    {
      "id": "img123",
      "url": "https://cdn2.thecatapi.com/images/...",
      "width": 1200,
      "height": 800
    }
  ],
  "count": 5
}
```

### Controlador de Usuarios

#### 1. Registro de Usuario

```
POST /api/users/register
Content-Type: application/json
```

Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Respuesta:
```json
{
  "status": "success",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login de Usuario

```
POST /api/users/login
Content-Type: application/json
```

Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Respuesta:
```json
{
  "status": "success",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Códigos de Error

- `200` - OK
- `201` - Created
- `400` - Bad Request (validación fallida)
- `401` - Unauthorized (credenciales inválidas)
- `404` - Not Found (recurso no encontrado)
- `409` - Conflict (usuario ya existe)
- `500` - Internal Server Error

## Pruebas Unitarias

El proyecto incluye pruebas unitarias para todos los casos de uso:

```bash
npm test
```

Pruebas implementadas:
- ✅ GetAllBreedsUseCase
- ✅ GetBreedByIdUseCase
- ✅ SearchBreedsUseCase
- ✅ GetImagesByBreedIdUseCase
- ✅ LoginUserUseCase
- ✅ RegisterUserUseCase

Ver cobertura:
```bash
npm run test:coverage
```

## Colección de Postman

Importar el archivo `postman_collection.json` en Postman para probar todos los endpoints.

Variables de colección:
- `base_url`: http://localhost:3000
- `token`: (se guarda automáticamente después del login)

## Estructura de Base de Datos

### Colección: users

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Descripción de los test en los servidores

  | Aspecto     | Backend (Vitest)   | Frontend (Karma + Jasmine) |
  |-------------|--------------------|----------------------------|
  | Comando     | npm test           | npm test                   |
  | Herramienta | Vitest             | Karma + Jasmine            |
  | Dónde corre | Node.js (terminal) | Chrome (navegador)         |
  | Qué prueba  | Lógica de negocio  | Componentes e interfaz     |
  | Archivos    | *.test.ts          | *.spec.ts                  |
  | Tests       | 26 tests           | 33 tests                   |
  | Velocidad   | Rápido (2-3s)      | Medio (5-10s)              |

## Mejores Prácticas Implementadas

1. **Clean Architecture**: Separación clara de responsabilidades
2. **SOLID Principles**: Código mantenible y extensible
3. **Dependency Injection**: Facilita testing y extensibilidad
4. **Error Handling**: Manejo centralizado de errores
5. **Validation**: Validación de datos de entrada
6. **Security**: Contraseñas hasheadas, JWT para autenticación
7. **Testing**: Pruebas unitarias con mocks
8. **TypeScript**: Tipado estático para prevenir errores
9. **Environment Variables**: Configuración segura
10. **Graceful Shutdown**: Cierre ordenado de conexiones

## Próximos Pasos (Extensiones Posibles)

- [ ] Agregar PostgreSQL para datos adicionales
- [ ] Implementar servicios de AWS (SNS, SQS, Lambda)
- [ ] Agregar logs con CloudWatch
- [ ] Implementar rate limiting
- [ ] Agregar Redis para caché
- [ ] Implementar integración con NestJS
- [ ] Agregar Docker y Docker Compose
- [ ] Implementar CI/CD

## Autor

Carlos Garzón

## Licencia

MIT
