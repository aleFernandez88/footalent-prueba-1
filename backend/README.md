# Backend - Footalent API

Backend API desarrollada con Node.js, Express, TypeScript, Prisma ORM y Swagger para documentación.

## 📋 Descripción

Este backend proporciona una API RESTful para la aplicación Footalent. Está construido con tecnologías modernas y sigue las mejores prácticas de desarrollo.

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web para Node.js
- **TypeScript** - Superset de JavaScript con tipado estático
- **Prisma ORM** - ORM moderno para acceso a base de datos
- **PostgreSQL** - Base de datos relacional
- **Swagger** - Documentación interactiva de la API

## 📁 Estructura de Directorios

```
backend/
├── src/                    # Código fuente TypeScript
│   ├── config/            # Archivos de configuración
│   │   ├── database.ts    # Configuración de Prisma
│   │   └── swagger.ts     # Configuración de Swagger
│   ├── routes/            # Definición de rutas
│   │   ├── index.ts       # Rutas principales
│   │   └── test.routes.ts # Rutas de prueba
│   └── server.ts          # Archivo principal del servidor
├── prisma/                # Configuración de Prisma
│   └── schema.prisma      # Schema de la base de datos
├── dist/                  # Código compilado (generado)
├── .env.example           # Ejemplo de variables de entorno
├── .gitignore            # Archivos ignorados por Git
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── README.md             # Este archivo
```

## 🚀 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- pnpm (gestor de paquetes)

### Pasos de instalación

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` y configura las variables según tu entorno, especialmente `DATABASE_URL`.

3. **Configurar la base de datos:**
   ```bash
   # Generar el cliente de Prisma
   pnpm prisma:generate
   
   # Ejecutar migraciones
   pnpm prisma:migrate
   ```

4. **Iniciar el servidor en modo desarrollo:**
   ```bash
   pnpm dev
   ```

## 📜 Scripts Disponibles

- `pnpm dev` - Inicia el servidor en modo desarrollo con hot-reload
- `pnpm build` - Compila TypeScript a JavaScript
- `pnpm start` - Inicia el servidor en modo producción (requiere build previo)
- `pnpm prisma:generate` - Genera el cliente de Prisma
- `pnpm prisma:migrate` - Ejecuta las migraciones de la base de datos
- `pnpm prisma:studio` - Abre Prisma Studio (interfaz visual para la BD)

## 🌐 Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Disponibles

- `GET /` - Información general de la API
- `GET /api/health` - Health check del servidor
- `GET /api/test` - Endpoint de prueba
- `GET /api-docs` - Documentación interactiva de Swagger

## 📚 Documentación

La documentación completa de la API está disponible en Swagger UI cuando el servidor está corriendo:

```
http://localhost:3000/api-docs
```

## 🔧 Configuración

### Variables de Entorno

El archivo `.env` contiene las siguientes variables:

- `PORT` - Puerto del servidor (default: 3000)
- `NODE_ENV` - Entorno de ejecución (development/production)
- `DATABASE_URL` - URL de conexión a PostgreSQL
- `SWAGGER_HOST` - Host para Swagger (default: localhost:3000)
- `SWAGGER_SCHEMES` - Esquemas para Swagger (http/https)

### Base de Datos

La conexión a PostgreSQL se configura mediante Prisma. El archivo `prisma/schema.prisma` define el schema de la base de datos.

Para crear nuevas migraciones:
```bash
pnpm prisma:migrate dev --name nombre_de_la_migracion
```

## 📝 Desarrollo

### Agregar Nuevas Rutas

1. Crea un archivo de rutas en `src/routes/` (ej: `users.routes.ts`)
2. Importa y usa el router en `src/routes/index.ts`
3. Documenta los endpoints con comentarios Swagger

### Ejemplo de Ruta

```typescript
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (req, res) => {
  res.json({ users: [] });
});

export default router;
```

## 🔒 Seguridad

- Las variables sensibles deben estar en `.env` (nunca commitear este archivo)
- En producción, usa HTTPS
- Implementa autenticación y autorización según sea necesario
- Valida y sanitiza todas las entradas del usuario

## 📦 Producción

Para desplegar en producción:

1. Compila el código:
   ```bash
   pnpm build
   ```

2. Asegúrate de que las variables de entorno estén configuradas correctamente

3. Ejecuta las migraciones:
   ```bash
   pnpm prisma:migrate deploy
   ```

4. Inicia el servidor:
   ```bash
   pnpm start
   ```

## 🤝 Contribución

1. Crea una rama para tu feature
2. Realiza tus cambios
3. Asegúrate de que el código compile sin errores
4. Crea un Pull Request

## 📄 Licencia

ISC

