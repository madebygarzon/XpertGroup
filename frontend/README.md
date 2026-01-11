# Cat Breeds App - Angular Frontend

Frontend de la aplicación Cat Breeds desarrollado con Angular 17, TypeScript y Clean Architecture.

## Tecnologías Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **SCSS** - Estilos
- **Jasmine/Karma** - Testing

## Arquitectura

El proyecto sigue **Clean Architecture** adaptada a Angular:

```
src/app/
├── core/                    # Capa de Dominio + Aplicación
│   ├── models/             # Entidades del dominio
│   ├── repositories/       # Interfaces de repositorios (abstracciones)
│   ├── services/           # Implementaciones HTTP de repositorios
│   ├── guards/             # Guards de autenticación
│   └── interceptors/       # Interceptors HTTP
├── shared/                  # Componentes compartidos
│   └── components/         # Navbar, Loader, Carousel
├── features/                # Módulos por funcionalidad
│   ├── home/              # Vista principal
│   ├── breeds/            # Razas (lista y búsqueda)
│   ├── auth/              # Login y registro
│   └── profile/           # Perfil protegido
└── environments/           # Configuración de entornos
```

## Principios SOLID Aplicados

### 1. Single Responsibility Principle
Cada componente tiene una única responsabilidad:
- **Componentes**: Solo manejan la vista y eventos del usuario
- **Servicios**: Solo manejan la comunicación HTTP
- **Repositorios**: Abstracciones de acceso a datos

### 2. Open/Closed Principle
Las abstracciones permiten extender funcionalidad sin modificar código existente:
```typescript
// Repositorio abstracto
abstract class BreedRepository {
  abstract getAll(): Observable<Breed[]>;
}

// Implementación HTTP
class BreedHttpService extends BreedRepository {
  // Implementación específica
}

// Fácil agregar nueva implementación sin cambiar código existente
class BreedLocalStorageService extends BreedRepository {
  // Nueva implementación
}
```

### 3. Liskov Substitution Principle
Las implementaciones son intercambiables:
```typescript
// En core.module.ts
{ provide: BreedRepository, useClass: BreedHttpService }

// Puede cambiarse por cualquier implementación
{ provide: BreedRepository, useClass: BreedMockService }
```

### 4. Interface Segregation Principle
Interfaces específicas por funcionalidad:
- `BreedRepository` - Solo operaciones de razas
- `ImageRepository` - Solo operaciones de imágenes
- `AuthRepository` - Solo operaciones de autenticación

### 5. Dependency Inversion Principle
Los componentes dependen de abstracciones, no de implementaciones:
```typescript
export class BreedsListComponent {
  constructor(
    private breedRepository: BreedRepository, // ← Abstracción
    private imageRepository: ImageRepository  // ← Abstracción
  ) {}
}
```

## Vistas Implementadas

### Vista 1: Breeds List
- ✅ Lista desplegable de razas
- ✅ Carrusel de imágenes por raza
- ✅ Información detallada de la raza
- ✅ Tabla con todas las razas

**Ruta**: `/breeds`

### Vista 2: Search
- ✅ Input de búsqueda
- ✅ Botón de búsqueda
- ✅ Filtrado de tabla por coincidencias
- ✅ Limpiar búsqueda

**Ruta**: `/search`

### Vista 3: Login
- ✅ Formulario de login
- ✅ Validación
- ✅ Integración con backend
- ✅ Almacenamiento de token JWT

**Ruta**: `/auth/login`

### Vista 4: Register
- ✅ Formulario de registro
- ✅ Validación de campos
- ✅ Confirmación de contraseña
- ✅ Creación de usuario

**Ruta**: `/auth/register`

### Vista 5: Profile (Protegida)
- ✅ Información del usuario logueado
- ✅ Protegida por AuthGuard
- ✅ Redirige a login si no autenticado
- ✅ Acciones de usuario

**Ruta**: `/profile` (requiere autenticación)

## Instalación y Uso

### Prerrequisitos
- Node.js >= 18.x
- npm o yarn
- Backend ejecutándose en `http://localhost:3000`

### Pasos

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en desarrollo:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

3. Ejecutar pruebas:
```bash
npm test
```

4. Build para producción:
```bash
npm run build
```

## Características Implementadas

### Diseño Responsivo
- ✅ Mobile-first approach
- ✅ Grid layouts adaptativos
- ✅ Media queries para tablets y móviles
- ✅ Touch-friendly en móviles

### Autenticación
- ✅ JWT storage en localStorage
- ✅ AuthInterceptor para agregar token a requests
- ✅ AuthGuard para proteger rutas
- ✅ Auto-login si token válido

### UX/UI
- ✅ Loading spinners
- ✅ Error messages
- ✅ Success feedback
- ✅ Smooth transitions
- ✅ Accessible navigation

### Gestión de Estado
- ✅ RxJS Observables
- ✅ Reactive forms con FormsModule
- ✅ Local state management

## Scripts Disponibles

```bash
npm start                # Desarrollo con hot-reload
npm run build           # Build para producción
npm test                # Ejecutar pruebas unitarias
npm run test:coverage   # Cobertura de pruebas
npm run lint            # Ejecutar ESLint
```

## Estructura de Rutas

```
/                    → Home page
/breeds             → Lista de razas con carrusel
/search             → Búsqueda de razas
/auth/login         → Login
/auth/register      → Registro
/profile            → Perfil (protegido)
```

## Docker

### Build de la imagen:
```bash
docker build -t catapi-frontend .
```

### Ejecutar contenedor:
```bash
docker run -p 4200:80 catapi-frontend
```

### Usar docker-compose (desde raíz del proyecto):
```bash
docker-compose up
```

Esto levantará:
- Backend en `http://localhost:3000`
- Frontend en `http://localhost:4200`
- MongoDB en puerto 27017

## Integración con Backend

El frontend consume los siguientes endpoints:

### Breeds
- `GET /api/breeds` - Todas las razas
- `GET /api/breeds/:id` - Raza por ID
- `GET /api/breeds/search?q=query` - Búsqueda

### Images
- `GET /api/images/imagesbybreedid?breed_id=xxx` - Imágenes por raza

### Auth
- `POST /api/users/login` - Login
- `POST /api/users/register` - Registro

## Variables de Entorno

Configuradas en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

Para producción (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api.com/api'
};
```

## Pruebas Unitarias

Las pruebas se encuentran en archivos `*.spec.ts` junto a cada componente/servicio.

Ejemplos de pruebas:
- Componentes: Verifican rendering y eventos
- Servicios: Mocks de HTTP requests
- Guards: Verifican redirecciones

## Buenas Prácticas

✅ **Clean Architecture**: Separación clara de responsabilidades
✅ **SOLID**: Aplicado en toda la arquitectura
✅ **Dependency Injection**: Uso de providers e inyección
✅ **Reactive Programming**: RxJS Observables
✅ **Type Safety**: TypeScript strict mode
✅ **Error Handling**: try-catch y error handlers
✅ **Code Splitting**: Módulos lazy-loaded (futuro)
✅ **Responsive Design**: Mobile-first
✅ **Accessibility**: ARIA labels y semantic HTML

## Mejoras Futuras

- [ ] Lazy loading de módulos
- [ ] PWA support
- [ ] Internacionalización (i18n)
- [ ] State management con NgRx
- [ ] E2E testing con Cypress
- [ ] Server-Side Rendering (SSR)

## Autor

Carlos Garzón

## Licencia

MIT
