# Guía de Estudio - Entrevista Técnica XpertGroup
## Analista de Desarrollo Fullstack

---

## 📑 Tabla de Contenidos

1. [Información General del Proyecto](#1-información-general-del-proyecto)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Backend - Node.js + Express](#4-backend---nodejs--express)
5. [Frontend - Angular](#5-frontend---angular)
6. [Bases de Datos](#6-bases-de-datos)
7. [Servicios AWS (Conceptos)](#7-servicios-aws-conceptos)
8. [Testing](#8-testing)
9. [Docker y DevOps](#9-docker-y-devops)
10. [Preguntas Técnicas Frecuentes](#10-preguntas-técnicas-frecuentes)
11. [Consejos para la Entrevista](#11-consejos-para-la-entrevista)

---

## 1. Información General del Proyecto

### Resumen Ejecutivo
- **Aplicación:** Full-stack de consulta de razas de gatos
- **API Externa:** The Cat API (https://thecatapi.com/)
- **Arquitectura:** Clean Architecture con SOLID Principles
- **Autenticación:** JWT (JSON Web Tokens)
- **Base de Datos:** MongoDB (NoSQL)
- **Contenedorización:** Docker + Docker Compose

### Funcionalidades Principales
1. **Vista de Razas (Breeds):** Lista completa de razas con detalles e imágenes
2. **Búsqueda:** Sistema de filtrado de razas
3. **Autenticación:** Login y registro de usuarios
4. **Perfil de Usuario:** Vista protegida (requiere autenticación)
5. **Carrusel de Imágenes:** Visualización dinámica de fotos de gatos

### Métricas del Proyecto
- **Tests Backend:** 26 tests unitarios (Vitest)
- **Tests Frontend:** 33 tests (Jasmine + Karma)
- **Total de Endpoints:** 7 endpoints REST
- **Total de Vistas:** 5 vistas + guards de protección
- **Tiempo de Desarrollo:** 40-50 horas

---

## 2. Stack Tecnológico

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **TypeScript** | 5.3.3 | Lenguaje con tipado estático |
| **Express.js** | 4.18.2 | Framework web minimalista |
| **MongoDB** | Latest | Base de datos NoSQL |
| **Mongoose** | 8.0.3 | ODM para MongoDB |
| **JWT** | 9.0.2 | Autenticación stateless |
| **Bcrypt** | 2.4.3 | Hashing de contraseñas |
| **Vitest** | 1.0.4 | Framework de testing |
| **Axios** | 1.6.2 | Cliente HTTP |
| **Express Validator** | 7.0.1 | Validación de requests |

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 17 | Framework frontend SPA |
| **TypeScript** | 5.2.2 | Lenguaje con tipado |
| **RxJS** | 7.8.0 | Programación reactiva |
| **SCSS** | - | Preprocesador CSS |
| **Jasmine** | 5.1.0 | Framework de testing |
| **Karma** | 6.4.0 | Test runner |

### DevOps e Infraestructura
- **Docker:** Contenedorización de aplicaciones
- **Docker Compose:** Orquestación de servicios
- **Nginx:** Servidor web para frontend en producción
- **Git:** Control de versiones

---

## 3. Arquitectura del Proyecto

### Clean Architecture - Concepto

La **Clean Architecture** es un patrón arquitectónico que separa el código en capas concéntricas, donde las capas internas no dependen de las externas. Esto mejora:
- **Testabilidad:** Facilita la creación de tests unitarios
- **Mantenibilidad:** Cambios en UI no afectan la lógica de negocio
- **Escalabilidad:** Facilita agregar nuevas funcionalidades
- **Independencia de frameworks:** La lógica de negocio no depende de Express o Angular

### Backend - Estructura de 3 Capas

```
backend/src/
├── domain/              # CAPA 1 - Núcleo del negocio (sin dependencias externas)
│   ├── entities/        # Modelos de dominio (Breed, User, CatImage)
│   └── repositories/    # Interfaces de repositorios (IBreedRepository, IUserRepository)
│
├── application/         # CAPA 2 - Lógica de aplicación (casos de uso)
│   ├── use-cases/       # Casos de uso (GetAllBreedsUseCase, LoginUserUseCase)
│   └── dtos/            # Data Transfer Objects (UserDto)
│
└── infrastructure/      # CAPA 3 - Detalles de implementación
    ├── api/             # Controllers y rutas de Express
    ├── database/        # Conexión a MongoDB y modelos Mongoose
    └── external-services/ # Servicios externos (The Cat API)
```

**Flujo de dependencias:** Infrastructure → Application → Domain

#### Ejemplo Práctico - GetAllBreedsUseCase

**1. Domain (Interfaz del Repositorio):**
```typescript
// src/domain/repositories/IBreedRepository.ts
export interface IBreedRepository {
  getAllBreeds(): Promise<Breed[]>;
  getBreedById(id: string): Promise<Breed | null>;
}
```

**2. Application (Caso de Uso):**
```typescript
// src/application/use-cases/GetAllBreedsUseCase.ts
export class GetAllBreedsUseCase {
  constructor(private breedRepository: IBreedRepository) {}

  async execute(): Promise<Breed[]> {
    return await this.breedRepository.getAllBreeds();
  }
}
```

**3. Infrastructure (Controller):**
```typescript
// src/infrastructure/api/controllers/BreedController.ts
export class BreedController {
  async getAllBreeds(req: Request, res: Response) {
    const useCase = new GetAllBreedsUseCase(breedRepository);
    const breeds = await useCase.execute();
    res.json(breeds);
  }
}
```

### Frontend - Arquitectura Adaptada a Angular

```
frontend/src/app/
├── core/                # Lógica de dominio y aplicación
│   ├── models/          # Modelos de datos (Breed, User, CatImage)
│   ├── repositories/    # Interfaces abstractas (BreedRepository, AuthRepository)
│   ├── services/        # Implementaciones HTTP (BreedHttpService)
│   ├── guards/          # Guards de protección de rutas (AuthGuard)
│   └── interceptors/    # Interceptores HTTP (AuthInterceptor)
│
├── features/            # Módulos por funcionalidad
│   ├── breeds/          # Lista y búsqueda de razas
│   ├── auth/            # Login y registro
│   ├── profile/         # Perfil de usuario
│   └── home/            # Página de inicio
│
└── shared/              # Componentes reutilizables
    └── components/      # Navbar, Carousel, Loader
```

### Principios SOLID Aplicados

#### 1. Single Responsibility Principle (SRP)
**"Cada clase debe tener una sola razón para cambiar"**

**Backend:**
- `GetAllBreedsUseCase` solo obtiene razas
- `LoginUserUseCase` solo maneja login
- Cada caso de uso tiene UNA responsabilidad

**Frontend:**
- `BreedHttpService` solo hace llamadas HTTP de razas
- `AuthGuard` solo protege rutas
- Cada componente maneja solo su vista

#### 2. Open/Closed Principle (OCP)
**"Abierto para extensión, cerrado para modificación"**

**Ejemplo Backend:**
```typescript
// Puedo crear nuevas implementaciones sin modificar código existente
class CatApiBreedRepository implements IBreedRepository { }
class PostgresBreedRepository implements IBreedRepository { } // Nueva implementación
```

#### 3. Liskov Substitution Principle (LSP)
**"Los objetos de una clase derivada deben poder reemplazar objetos de la clase base"**

**Ejemplo:**
```typescript
// Cualquier implementación de IBreedRepository puede usarse sin romper el código
const repository: IBreedRepository = new CatApiBreedRepository();
// O
const repository: IBreedRepository = new MongoBreedRepository();
```

#### 4. Interface Segregation Principle (ISP)
**"Muchas interfaces específicas mejor que una interfaz general"**

- `IBreedRepository` solo para razas
- `IUserRepository` solo para usuarios
- `IImageRepository` solo para imágenes

#### 5. Dependency Inversion Principle (DIP)
**"Depender de abstracciones, no de implementaciones concretas"**

```typescript
// ❌ MAL: Dependencia directa
class UseCase {
  constructor(private service: CatApiService) {} // Implementación concreta
}

// ✅ BIEN: Dependencia de abstracción
class UseCase {
  constructor(private repository: IBreedRepository) {} // Interfaz
}
```

---

## 4. Backend - Node.js + Express

### Configuración Inicial

#### Variables de Entorno (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/catapi
CAT_API_KEY=live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:4200
```

#### Servidor Express (index.ts)
```typescript
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './shared/config/environment';

const app = express();

// Middlewares
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Rutas
app.use('/api/breeds', breedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

// Conexión a MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

app.listen(config.port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${config.port}`);
});
```

### Endpoints REST API

#### 1. Breeds (Razas)

**GET /api/breeds** - Obtener todas las razas
```typescript
// Request: GET http://localhost:3000/api/breeds
// Response: 200 OK
[
  {
    "id": "abys",
    "name": "Abyssinian",
    "origin": "Egypt",
    "description": "...",
    "temperament": "Active, Energetic, Independent"
  }
]
```

**GET /api/breeds/:id** - Obtener raza por ID
```typescript
// Request: GET http://localhost:3000/api/breeds/abys
// Response: 200 OK
{
  "id": "abys",
  "name": "Abyssinian",
  "origin": "Egypt",
  ...
}
```

**GET /api/breeds/search?q=query** - Buscar razas
```typescript
// Request: GET http://localhost:3000/api/breeds/search?q=persian
// Response: 200 OK
[
  {
    "id": "pers",
    "name": "Persian",
    ...
  }
]
```

#### 2. Images (Imágenes)

**GET /api/images/imagesbybreedid?breed_id=xxx&limit=5**
```typescript
// Request: GET http://localhost:3000/api/images/imagesbybreedid?breed_id=abys&limit=5
// Response: 200 OK
[
  {
    "id": "img123",
    "url": "https://cdn2.thecatapi.com/images/abc.jpg",
    "width": 1200,
    "height": 800
  }
]
```

#### 3. Users (Autenticación)

**POST /api/users/register** - Registro de usuario
```typescript
// Request: POST http://localhost:3000/api/users/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Carlos"
}

// Response: 201 Created
{
  "user": {
    "id": "64abc123",
    "email": "user@example.com",
    "name": "Carlos"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**POST /api/users/login** - Login de usuario
```typescript
// Request: POST http://localhost:3000/api/users/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response: 200 OK
{
  "user": {
    "id": "64abc123",
    "email": "user@example.com",
    "name": "Carlos"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Autenticación JWT

#### Flujo de Autenticación

1. **Registro/Login:**
```typescript
// RegisterUserUseCase.ts
const hashedPassword = await bcrypt.hash(password, 10);
const user = await userRepository.create({ email, password: hashedPassword, name });
const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
return { user, token };
```

2. **Cliente guarda token:**
```typescript
// Frontend - localStorage
localStorage.setItem('token', response.token);
```

3. **Cliente envía token en requests:**
```typescript
// Headers HTTP
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Servidor valida token (si fuera necesario):**
```typescript
const decoded = jwt.verify(token, JWT_SECRET);
const userId = decoded.userId;
```

### Manejo de Errores

```typescript
// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});
```

### Validación con Express Validator

```typescript
import { body, validationResult } from 'express-validator';

// Validación en rutas
router.post('/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Contraseña muy corta'),
    body('name').notEmpty().withMessage('Nombre requerido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Continuar con la lógica...
  }
);
```

---

## 5. Frontend - Angular

### Arquitectura de Angular

#### Módulos Principales

**1. AppModule (Raíz)**
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,      // Servicios singleton
    SharedModule,    // Componentes compartidos
    BreedsModule,    // Módulo de razas
    AuthModule       // Módulo de autenticación
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**2. CoreModule (Servicios Singleton)**
```typescript
@NgModule({
  providers: [
    { provide: BreedRepository, useClass: BreedHttpService },
    { provide: AuthRepository, useClass: AuthHttpService },
    { provide: ImageRepository, useClass: ImageHttpService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
```

### Routing (Navegación)

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'breeds', component: BreedsListComponent },
  { path: 'search', component: BreedSearchComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]  // Protegida - requiere autenticación
  },
  { path: '**', redirectTo: '' }
];
```

### Guards (Protección de Rutas)

```typescript
// auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthHttpService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }

    // Si no está autenticado, redirigir a login
    this.router.navigate(['/auth/login']);
    return false;
  }
}
```

### Interceptors (Inyección Automática de JWT)

```typescript
// auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      // Clonar request y agregar header Authorization
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
```

### Servicios HTTP

```typescript
// breed-http.service.ts
@Injectable({ providedIn: 'root' })
export class BreedHttpService implements BreedRepository {
  private apiUrl = environment.apiUrl + '/breeds';

  constructor(private http: HttpClient) {}

  getAllBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(this.apiUrl);
  }

  getBreedById(id: string): Observable<Breed> {
    return this.http.get<Breed>(`${this.apiUrl}/${id}`);
  }

  searchBreeds(query: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/search?q=${query}`);
  }
}
```

### Componentes Principales

#### LoginComponent (Reactive Forms)

```typescript
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Error al iniciar sesión';
        }
      });
    }
  }
}
```

#### BreedsListComponent

```typescript
export class BreedsListComponent implements OnInit {
  breeds: Breed[] = [];
  selectedBreed: Breed | null = null;
  images: CatImage[] = [];
  loading = false;

  constructor(
    private breedService: BreedHttpService,
    private imageService: ImageHttpService
  ) {}

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.loading = true;
    this.breedService.getAllBreeds().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  onBreedSelected(breed: Breed): void {
    this.selectedBreed = breed;
    this.loadImages(breed.id);
  }

  loadImages(breedId: string): void {
    this.imageService.getImagesByBreedId(breedId, 5).subscribe({
      next: (images) => {
        this.images = images;
      }
    });
  }
}
```

### RxJS - Programación Reactiva

#### Conceptos Clave

**Observable:** Flujo de datos asíncrono (similar a una promesa, pero puede emitir múltiples valores)

```typescript
// Crear un Observable
const numbers$ = of(1, 2, 3, 4, 5);

// Suscribirse a un Observable
numbers$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('Completado')
});
```

#### Operadores RxJS Comunes

```typescript
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';

// map - Transformar valores
this.http.get<Breed[]>('/api/breeds')
  .pipe(
    map(breeds => breeds.filter(b => b.origin === 'Egypt'))
  )
  .subscribe(egyptBreeds => console.log(egyptBreeds));

// debounceTime - Esperar antes de emitir (útil para búsqueda)
this.searchControl.valueChanges
  .pipe(
    debounceTime(300),  // Esperar 300ms después de que el usuario deje de escribir
    switchMap(query => this.breedService.searchBreeds(query))
  )
  .subscribe(results => this.searchResults = results);
```

### Diseño Responsivo

#### Breakpoints
```scss
// Mobile First Approach
.breed-grid {
  display: grid;
  gap: 20px;

  // Mobile (< 480px) - 1 columna
  grid-template-columns: 1fr;

  // Tablet (>= 480px)
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // Desktop (>= 768px)
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 6. Bases de Datos

### MongoDB (NoSQL)

#### Características Principales
- **Documento-orientada:** Almacena datos en formato JSON (BSON)
- **Esquema flexible:** No requiere estructura fija
- **Alta escalabilidad:** Sharding y replicación nativa
- **Consultas rápidas:** Índices y agregaciones

#### Modelo de Usuario (Mongoose)

```typescript
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true  // Agrega createdAt y updatedAt automáticamente
});

export const UserModel = mongoose.model('User', userSchema);
```

#### Operaciones CRUD con Mongoose

```typescript
// CREATE
const user = await UserModel.create({
  email: 'test@example.com',
  password: hashedPassword,
  name: 'Test User'
});

// READ
const user = await UserModel.findOne({ email: 'test@example.com' });
const allUsers = await UserModel.find();

// UPDATE
await UserModel.findByIdAndUpdate(userId, { name: 'New Name' });

// DELETE
await UserModel.findByIdAndDelete(userId);
```

### PostgreSQL (Relacional) - Conceptos

Aunque el proyecto usa MongoDB, es importante conocer PostgreSQL:

#### Diferencias MongoDB vs PostgreSQL

| Característica | MongoDB (NoSQL) | PostgreSQL (SQL) |
|----------------|-----------------|------------------|
| **Estructura** | Documentos JSON | Tablas con filas y columnas |
| **Esquema** | Flexible | Rígido (definido previamente) |
| **Relaciones** | Documentos embebidos o referencias | Foreign Keys (llaves foráneas) |
| **Consultas** | find(), aggregate() | SELECT, JOIN, WHERE |
| **Escalabilidad** | Horizontal (sharding) | Vertical (más recursos) |
| **Transacciones** | Soporte básico | ACID completo |

#### Ejemplo de Query SQL
```sql
-- Crear tabla
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos
INSERT INTO users (email, password, name)
VALUES ('test@example.com', 'hashed_password', 'Test User');

-- Consultar datos
SELECT * FROM users WHERE email = 'test@example.com';

-- Unir tablas
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

#### Cuándo usar cada una

**MongoDB (NoSQL):**
- Datos no estructurados o semi-estructurados
- Necesitas escalabilidad horizontal rápida
- Desarrollo ágil con esquemas cambiantes
- Ejemplos: Logs, catálogos de productos, redes sociales

**PostgreSQL (SQL):**
- Datos altamente estructurados con relaciones complejas
- Necesitas transacciones ACID robustas
- Reportes y análisis complejos
- Ejemplos: Sistemas bancarios, ERPs, inventarios

---

## 7. Servicios AWS (Conceptos)

Aunque el proyecto no implementa AWS, es importante conocer estos servicios para la entrevista:

### AWS SNS (Simple Notification Service)

**¿Qué es?**
Servicio de mensajería pub/sub (publicación-suscripción) para enviar notificaciones.

**Casos de uso:**
- Enviar emails/SMS a usuarios
- Notificaciones push a aplicaciones móviles
- Alertas de sistema

**Ejemplo de implementación:**
```typescript
import AWS from 'aws-sdk';

const sns = new AWS.SNS({ region: 'us-east-1' });

// Publicar mensaje
await sns.publish({
  TopicArn: 'arn:aws:sns:us-east-1:123456789:MyTopic',
  Message: 'Nuevo usuario registrado: user@example.com',
  Subject: 'Nuevo Registro'
}).promise();
```

**Uso en el proyecto:**
Podríamos usar SNS para enviar email de confirmación cuando un usuario se registra.

### AWS SQS (Simple Queue Service)

**¿Qué es?**
Servicio de colas de mensajes para desacoplar componentes de aplicaciones.

**Casos de uso:**
- Procesamiento asíncrono de tareas pesadas
- Procesar uploads de imágenes
- Envío de emails masivos

**Ejemplo de implementación:**
```typescript
import AWS from 'aws-sdk';

const sqs = new AWS.SQS({ region: 'us-east-1' });

// Enviar mensaje a la cola
await sqs.sendMessage({
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789/MyQueue',
  MessageBody: JSON.stringify({
    userId: '64abc123',
    action: 'send-welcome-email'
  })
}).promise();

// Recibir mensajes de la cola
const messages = await sqs.receiveMessage({
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789/MyQueue',
  MaxNumberOfMessages: 10
}).promise();
```

**Uso en el proyecto:**
Podríamos usar SQS para procesar en background la generación de reportes de usuarios.

### AWS Lambda (Funciones Serverless)

**¿Qué es?**
Ejecuta código sin aprovisionar servidores. Pagas solo por el tiempo de ejecución.

**Casos de uso:**
- APIs REST sin servidor
- Procesamiento de eventos (upload de archivo → resize imagen)
- Tareas programadas (cron jobs)

**Ejemplo de Lambda function:**
```typescript
// handler.ts
export const handler = async (event: any) => {
  const { userId, email } = JSON.parse(event.body);

  // Lógica de negocio
  await sendWelcomeEmail(email);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email enviado' })
  };
};
```

**Uso en el proyecto:**
Podríamos crear una Lambda que se ejecute cada noche para limpiar usuarios inactivos.

### AWS CloudWatch (Monitoreo y Logs)

**¿Qué es?**
Servicio de monitoreo y observabilidad para recursos AWS.

**Casos de uso:**
- Logs centralizados de aplicaciones
- Métricas de rendimiento (CPU, memoria, requests)
- Alarmas y notificaciones

**Ejemplo:**
```typescript
import AWS from 'aws-sdk';

const cloudwatch = new AWS.CloudWatch({ region: 'us-east-1' });

// Publicar métrica personalizada
await cloudwatch.putMetricData({
  Namespace: 'CatAPI',
  MetricData: [{
    MetricName: 'UserRegistrations',
    Value: 1,
    Unit: 'Count',
    Timestamp: new Date()
  }]
}).promise();

// Crear alarma
await cloudwatch.putMetricAlarm({
  AlarmName: 'HighErrorRate',
  MetricName: 'Errors',
  Threshold: 10,
  ComparisonOperator: 'GreaterThanThreshold'
}).promise();
```

### Arquitectura AWS Ideal para el Proyecto

```
Usuario → CloudFront (CDN) → S3 (Frontend estático)
                                 ↓
                         API Gateway → Lambda Functions
                                 ↓
                         RDS (PostgreSQL) / DocumentDB (MongoDB)
                                 ↓
                         CloudWatch (Logs y Métricas)
                                 ↓
                         SNS (Notificaciones) + SQS (Colas)
```

---

## 8. Testing

### Backend - Vitest

#### Configuración (vitest.config.ts)
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
```

#### Ejemplo de Test - GetAllBreedsUseCase

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetAllBreedsUseCase } from '../src/application/use-cases/GetAllBreedsUseCase';
import { IBreedRepository } from '../src/domain/repositories/IBreedRepository';

// Mock del repositorio
const mockBreedRepository: IBreedRepository = {
  getAllBreeds: vi.fn(),
  getBreedById: vi.fn(),
  searchBreeds: vi.fn()
};

describe('GetAllBreedsUseCase', () => {
  let useCase: GetAllBreedsUseCase;

  beforeEach(() => {
    useCase = new GetAllBreedsUseCase(mockBreedRepository);
    vi.clearAllMocks();
  });

  it('debe retornar todas las razas cuando el repositorio responde correctamente', async () => {
    // Arrange
    const mockBreeds = [
      { id: 'abys', name: 'Abyssinian', origin: 'Egypt' },
      { id: 'beng', name: 'Bengal', origin: 'United States' }
    ];
    (mockBreedRepository.getAllBreeds as any).mockResolvedValue(mockBreeds);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual(mockBreeds);
    expect(mockBreedRepository.getAllBreeds).toHaveBeenCalledTimes(1);
  });

  it('debe lanzar error si el repositorio falla', async () => {
    // Arrange
    (mockBreedRepository.getAllBreeds as any).mockRejectedValue(new Error('API Error'));

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow('API Error');
  });
});
```

#### Ejecutar Tests
```bash
cd backend
npm test                 # Ejecutar todos los tests
npm run test:coverage    # Con cobertura de código
```

### Frontend - Jasmine + Karma

#### Configuración (karma.conf.js)
```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    }
  });
};
```

#### Ejemplo de Test - BreedHttpService

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BreedHttpService } from './breed-http.service';

describe('BreedHttpService', () => {
  let service: BreedHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BreedHttpService]
    });

    service = TestBed.inject(BreedHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no hay requests pendientes
  });

  it('debe obtener todas las razas', () => {
    const mockBreeds = [
      { id: 'abys', name: 'Abyssinian' },
      { id: 'beng', name: 'Bengal' }
    ];

    service.getAllBreeds().subscribe(breeds => {
      expect(breeds.length).toBe(2);
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/breeds');
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds); // Simular respuesta HTTP
  });
});
```

#### Ejemplo de Test - LoginComponent

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of({ token: 'fake-token' }))
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthHttpService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe validar email requerido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('debe validar formato de email', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
  });

  it('debe llamar al servicio de login cuando el formulario es válido', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
```

#### Ejecutar Tests
```bash
cd frontend
npm test                 # Ejecutar todos los tests
npm run test:coverage    # Con cobertura de código
```

### Diferencias Vitest vs Jasmine/Karma

| Aspecto | Vitest (Backend) | Jasmine/Karma (Frontend) |
|---------|------------------|--------------------------|
| **Entorno** | Node.js (terminal) | Navegador (Chrome) |
| **Velocidad** | Muy rápido | Más lento (abre navegador) |
| **Sintaxis** | Similar a Jest | Sintaxis propia de Jasmine |
| **Mocks** | `vi.fn()`, `vi.mock()` | `jasmine.createSpy()` |
| **Archivos** | `*.test.ts` | `*.spec.ts` |
| **Uso** | Lógica de negocio | Componentes e interfaz |

---

## 9. Docker y DevOps

### Docker Compose

#### docker-compose.yml (Configuración)
```yaml
version: '3.8'

services:
  # Base de datos MongoDB
  mongodb:
    image: mongo:latest
    container_name: catapi-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - catapi-network

  # Backend API (Node.js + Express)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: catapi-backend
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/catapi
      - PORT=3000
      - JWT_SECRET=your-super-secret-jwt-key
      - CAT_API_KEY=live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP
      - CORS_ORIGIN=http://localhost:4200
    depends_on:
      - mongodb
    networks:
      - catapi-network

  # Frontend (Angular + Nginx)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: catapi-frontend
    ports:
      - "4200:80"
    depends_on:
      - backend
    networks:
      - catapi-network

volumes:
  mongodb_data:

networks:
  catapi-network:
    driver: bridge
```

#### Dockerfile Backend (Multi-stage)
```dockerfile
# Etapa 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Etapa 2: Production
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

#### Dockerfile Frontend
```dockerfile
# Etapa 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Production con Nginx
FROM nginx:alpine

COPY --from=build /app/dist/cat-app-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Comandos Docker Compose

```bash
# Iniciar todos los servicios
docker-compose up

# Iniciar en background
docker-compose up -d

# Reconstruir imágenes
docker-compose up --build

# Ver logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (limpieza completa)
docker-compose down -v

# Ver estado de servicios
docker-compose ps

# Ejecutar comando en un contenedor
docker-compose exec backend sh
```

### Beneficios de Docker

1. **Portabilidad:** Funciona igual en cualquier máquina
2. **Aislamiento:** Cada servicio en su propio contenedor
3. **Reproducibilidad:** Mismo entorno en desarrollo y producción
4. **Escalabilidad:** Fácil escalar servicios con `docker-compose up --scale backend=3`

---

## 10. Preguntas Técnicas Frecuentes

### Node.js y Express

**P: ¿Qué es Node.js?**
R: Node.js es un runtime de JavaScript construido sobre el motor V8 de Chrome que permite ejecutar JavaScript del lado del servidor. Es asíncrono y basado en eventos, ideal para aplicaciones I/O intensivas como APIs REST.

**P: ¿Por qué usar Express?**
R: Express es un framework web minimalista para Node.js que simplifica la creación de APIs REST con middleware, routing y manejo de requests/responses.

**P: ¿Qué es middleware en Express?**
R: Funciones que se ejecutan en el ciclo request-response. Ejemplos: `app.use(cors())`, `app.use(express.json())`. Pueden modificar req/res o terminar el ciclo.

**P: ¿Cómo funciona `async/await`?**
R: Sintaxis que simplifica el manejo de promesas. `async` declara una función asíncrona, `await` pausa la ejecución hasta que la promesa se resuelva.

```typescript
// Sin async/await
function getData() {
  return fetch('/api/breeds')
    .then(res => res.json())
    .then(data => console.log(data));
}

// Con async/await
async function getData() {
  const res = await fetch('/api/breeds');
  const data = await res.json();
  console.log(data);
}
```

### Angular

**P: ¿Qué es Angular y en qué se diferencia de React/Vue?**
R: Angular es un framework completo (no librería) para SPAs con:
- TypeScript por defecto
- Dependency Injection nativo
- Estructura opinionada (módulos, componentes, servicios)
- RxJS integrado para programación reactiva

React y Vue son librerías más ligeras y flexibles.

**P: ¿Qué son los Observables en RxJS?**
R: Flujos de datos asíncronos que pueden emitir múltiples valores en el tiempo. Se usan en Angular para HTTP requests, eventos, etc.

**P: ¿Qué es Dependency Injection?**
R: Patrón donde las dependencias se inyectan automáticamente en lugar de crearlas manualmente. Angular lo implementa con decoradores `@Injectable()`.

```typescript
// Sin DI (malo)
export class Component {
  private service = new BreedService(); // Acoplamiento fuerte
}

// Con DI (bueno)
export class Component {
  constructor(private service: BreedService) {} // Inyectado por Angular
}
```

**P: ¿Qué son Guards e Interceptors?**
R:
- **Guards:** Controlan el acceso a rutas (ej: AuthGuard verifica si el usuario está logueado)
- **Interceptors:** Interceptan requests/responses HTTP (ej: agregar JWT automáticamente)

### Bases de Datos

**P: ¿Cuándo usar MongoDB vs PostgreSQL?**
R:
- **MongoDB:** Datos no estructurados, esquemas flexibles, escalabilidad horizontal (redes sociales, catálogos)
- **PostgreSQL:** Datos estructurados, relaciones complejas, transacciones críticas (bancos, inventarios)

**P: ¿Qué es ACID?**
R: Propiedades de transacciones en bases de datos relacionales:
- **A**tomicity: Todo o nada
- **C**onsistency: Datos válidos siempre
- **I**solation: Transacciones independientes
- **D**urability: Datos persistidos

**P: ¿Qué es un índice en bases de datos?**
R: Estructura que mejora la velocidad de búsquedas. Como un índice de libro.

```javascript
// MongoDB - Crear índice
db.users.createIndex({ email: 1 }); // Búsquedas por email más rápidas
```

### AWS

**P: ¿Qué diferencia hay entre SNS y SQS?**
R:
- **SNS (Pub/Sub):** Un mensaje → muchos suscriptores (notificaciones)
- **SQS (Cola):** Mensajes procesados uno a uno (tareas asíncronas)

**P: ¿Qué es serverless?**
R: Ejecutar código sin gestionar servidores. Pagas solo por ejecución. Ejemplo: AWS Lambda.

**P: ¿Para qué sirve CloudWatch?**
R: Monitoreo, logs centralizados, métricas y alarmas de aplicaciones en AWS.

### Testing

**P: ¿Qué tipos de tests existen?**
R:
- **Unitarios:** Probar funciones/clases aisladas (este proyecto tiene 59 tests unitarios)
- **Integración:** Probar módulos juntos
- **E2E (End-to-End):** Probar flujo completo de usuario (no implementado en este proyecto)

**P: ¿Qué es un mock?**
R: Objeto falso que simula el comportamiento de uno real. Usado para aislar tests.

```typescript
// Mock de repositorio
const mockRepo = {
  getAllBreeds: vi.fn().mockResolvedValue([{ id: '1', name: 'Test' }])
};
```

### Seguridad

**P: ¿Cómo funciona JWT?**
R: Token firmado que contiene información del usuario (payload). El servidor verifica la firma para validar autenticidad.

Estructura: `header.payload.signature`

**P: ¿Por qué hashear contraseñas con bcrypt?**
R: Almacenar contraseñas en texto plano es inseguro. Bcrypt usa salt + hashing para protegerlas.

```typescript
// Hashear
const hash = await bcrypt.hash('password123', 10);

// Verificar
const isValid = await bcrypt.compare('password123', hash);
```

**P: ¿Qué es CORS?**
R: Cross-Origin Resource Sharing. Permite que el frontend (localhost:4200) acceda al backend (localhost:3000) desde diferente origen.

### Docker

**P: ¿Qué es Docker?**
R: Plataforma para ejecutar aplicaciones en contenedores aislados con todas sus dependencias.

**P: ¿Diferencia entre imagen y contenedor?**
R:
- **Imagen:** Plantilla inmutable (receta)
- **Contenedor:** Instancia ejecutable de una imagen (plato cocinado)

**P: ¿Qué es Docker Compose?**
R: Herramienta para orquestar múltiples contenedores (MongoDB + Backend + Frontend en este proyecto).

---

## 11. Consejos para la Entrevista

### Aspectos Técnicos a Destacar

1. **Clean Architecture:**
   - Explica las 3 capas: Domain, Application, Infrastructure
   - Menciona los beneficios: testabilidad, mantenibilidad
   - Usa ejemplos del proyecto (GetAllBreedsUseCase)

2. **SOLID Principles:**
   - Prepara al menos 2 ejemplos de cada principio
   - Destaca el uso de interfaces (IBreedRepository)
   - Menciona Dependency Injection

3. **Testing:**
   - Habla de los 26 tests backend + 33 tests frontend
   - Explica el uso de mocks para aislar lógica
   - Menciona coverage (cobertura de código)

4. **Seguridad:**
   - JWT para autenticación stateless
   - Bcrypt para hashing de contraseñas (10 rounds)
   - CORS configurado para proteger el backend

5. **DevOps:**
   - Docker Compose para orquestar servicios
   - Multi-stage builds para optimizar imágenes
   - Variables de entorno para configuración

### Preguntas para Hacer al Entrevistador

1. "¿Qué servicios de AWS utilizan actualmente en producción?"
2. "¿Usan NestJS o planean migrar de Express a NestJS?"
3. "¿Cuál es el flujo de CI/CD que manejan?"
4. "¿Qué porcentaje de cobertura de tests esperan en los proyectos?"
5. "¿Trabajan con arquitecturas de microservicios?"

### Palabras Clave para Usar

- Clean Architecture
- SOLID Principles
- Dependency Injection
- Repository Pattern
- Use Cases
- JWT Stateless Authentication
- RxJS Observables
- Reactive Forms
- Guards e Interceptors
- Docker Compose
- Multi-stage builds
- MongoDB ODM (Mongoose)
- Express Middleware
- Vitest Unit Testing

### Puntos Débiles del Proyecto (y cómo justificarlos)

**1. No implementa servicios AWS:**
"Aunque el proyecto usa MongoDB local, entiendo los conceptos de SNS, SQS, Lambda y CloudWatch. Podría integrarlos así: SNS para notificaciones de registro, SQS para procesar tareas en background, Lambda para funciones serverless, y CloudWatch para monitoreo."

**2. No usa NestJS:**
"Implementé el proyecto en Express siguiendo Clean Architecture. NestJS ofrece Dependency Injection nativa y decoradores que facilitan el desarrollo. Estoy familiarizado con su estructura de módulos, controllers y providers."

**3. No usa PostgreSQL:**
"Usé MongoDB por la naturaleza del proyecto (catálogo de razas). Sin embargo, conozco PostgreSQL y entiendo cuándo usarlo: transacciones ACID, relaciones complejas, reportes. Podría agregar PostgreSQL para almacenar favoritos de usuarios con foreign keys."

**4. Tests no cubren 100%:**
"Implementé 59 tests unitarios cubriendo casos de uso críticos. Para producción, agregaría tests de integración y E2E con Cypress/Playwright para probar flujos completos."

---

## 12. Comandos Rápidos de Referencia

### Ejecutar el Proyecto

```bash
# Con Docker Compose (Recomendado)
docker-compose up --build

# Sin Docker - Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Sin Docker - Frontend
cd frontend
npm install
npm start

# Sin Docker - MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Testing

```bash
# Backend
cd backend
npm test                 # Ejecutar tests
npm run test:coverage    # Con cobertura

# Frontend
cd frontend
npm test                 # Ejecutar tests
npm run test:coverage    # Con cobertura
```

### Docker

```bash
# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Limpiar todo (incluyendo volúmenes)
docker-compose down -v
docker system prune -a --volumes
```

### Git

```bash
# Ver estado
git status

# Ver commits recientes
git log --oneline

# Ver cambios
git diff
```

---

## 13. Checklist de Preparación

### Antes de la Entrevista

- [ ] Ejecutar el proyecto con Docker Compose
- [ ] Probar todos los endpoints con Postman
- [ ] Ejecutar tests backend (26 tests) y frontend (33 tests)
- [ ] Repasar Clean Architecture y SOLID
- [ ] Entender flujo de autenticación JWT
- [ ] Conocer diferencias MongoDB vs PostgreSQL
- [ ] Estudiar conceptos de AWS (SNS, SQS, Lambda, CloudWatch)
- [ ] Repasar RxJS y Observables
- [ ] Conocer Guards e Interceptors de Angular
- [ ] Entender Docker Compose y multi-stage builds

### Durante la Entrevista

- [ ] Explicar arquitectura del proyecto (Clean Architecture)
- [ ] Mencionar SOLID con ejemplos
- [ ] Destacar testing (59 tests totales)
- [ ] Hablar de seguridad (JWT, Bcrypt, CORS)
- [ ] Mencionar Docker y contenedorización
- [ ] Preguntar sobre stack tecnológico de XpertGroup
- [ ] Mostrar interés en aprender NestJS y servicios AWS

---

## 14. Resumen Ejecutivo del Proyecto

### Elevator Pitch (30 segundos)

"Desarrollé una aplicación full-stack con Node.js, Express y Angular que consume The Cat API. Implementé Clean Architecture con SOLID Principles, separando el código en capas Domain-Application-Infrastructure. El sistema tiene autenticación JWT, 59 tests unitarios (Vitest y Jasmine), y está completamente contenerizado con Docker Compose. La arquitectura es escalable y fácil de mantener gracias al uso de Repository Pattern y Dependency Injection."

### Datos Clave

- **Líneas de código:** ~5,000 líneas
- **Tests:** 59 tests unitarios (26 backend + 33 frontend)
- **Endpoints:** 7 endpoints REST
- **Vistas:** 5 vistas (Home, Breeds, Search, Login, Register, Profile)
- **Arquitectura:** Clean Architecture con 3 capas
- **Patrones:** Repository, Use Case, Dependency Injection
- **Testing:** Vitest (backend) + Jasmine/Karma (frontend)
- **DevOps:** Docker + Docker Compose + Multi-stage builds
- **Seguridad:** JWT + Bcrypt + CORS
- **Base de datos:** MongoDB + Mongoose ODM

---

## 15. Recursos Adicionales

### Documentación Oficial

- **Node.js:** https://nodejs.org/docs/
- **Express:** https://expressjs.com/
- **Angular:** https://angular.io/docs
- **MongoDB:** https://www.mongodb.com/docs/
- **Docker:** https://docs.docker.com/
- **RxJS:** https://rxjs.dev/
- **Vitest:** https://vitest.dev/
- **The Cat API:** https://thecatapi.com/

### Artículos Recomendados

- Clean Architecture por Robert C. Martin
- SOLID Principles explicados
- JWT Authentication Best Practices
- Docker Multi-stage Builds

### Dentro del Proyecto

- `backend/ARCHITECTURE.md` - Análisis detallado de Clean Architecture
- `backend/EXTENSIONS.md` - Propuestas de extensión (AWS, NestJS, PostgreSQL)
- `README.md` - Documentación completa del proyecto

---

## 16. Glosario de Términos

- **API:** Application Programming Interface - Interfaz para comunicación entre aplicaciones
- **REST:** Representational State Transfer - Estilo arquitectónico para APIs
- **JWT:** JSON Web Token - Token de autenticación stateless
- **CRUD:** Create, Read, Update, Delete - Operaciones básicas de base de datos
- **ODM:** Object-Document Mapper - Mapea documentos de BD a objetos (Mongoose)
- **ORM:** Object-Relational Mapper - Mapea tablas de BD a objetos
- **SPA:** Single Page Application - Aplicación de una sola página
- **DI:** Dependency Injection - Inyección de dependencias
- **DTO:** Data Transfer Object - Objeto para transferir datos entre capas
- **Middleware:** Función que procesa requests antes del handler final
- **Observable:** Flujo de datos asíncrono (RxJS)
- **Guard:** Protector de rutas en Angular
- **Interceptor:** Interceptor de requests/responses HTTP
- **Mock:** Objeto falso para simular comportamiento en tests
- **Docker Image:** Plantilla inmutable para crear contenedores
- **Container:** Instancia ejecutable de una imagen Docker
- **Multi-stage build:** Dockerfile con múltiples etapas para optimizar tamaño

---

## ¡Buena Suerte en tu Entrevista!

**Recuerda:**
- Habla con confianza sobre tu proyecto
- Usa ejemplos concretos del código
- Demuestra conocimiento teórico y práctico
- Muestra interés en aprender tecnologías nuevas (NestJS, AWS)
- Pregunta sobre el stack tecnológico de XpertGroup

**Contacto del Autor:**
- **Nombre:** Carlos Garzón
- **Proyecto:** https://github.com/carlosgarzon/XpertGroup
- **LinkedIn:** [Tu perfil de LinkedIn]

---

*Documento creado específicamente para la preparación de la entrevista técnica con XpertGroup.*
*Fecha: Enero 2026*
