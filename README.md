# REST API de Gestión de Usuarios

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

## Descripción

Sistema fullstack para gestionar usuarios con operaciones CRUD completas. Backend REST API con Node.js + Express + Prisma 7 + PostgreSQL, y frontend con React 19 + TypeScript + Material-UI.

**Características principales:**

- ✅ CRUD completo de usuarios (Crear, Leer, Actualizar, Eliminar)
- ✅ Validaciones en cliente y servidor con Zod
- ✅ Arquitectura MVC profesional
- ✅ UI moderna con Material-UI v7
- ✅ Prisma 7 con las últimas características
- ✅ TypeScript para type-safety
- ✅ Enrutamiento con React Router v7

## Screenshots

### Página Principal

![Home Page](./docs/screenshots/home.png)

### Formulario de Registro

![Register](./docs/screenshots/register.png)

### Detalle de Usuario

![User Detail](./docs/screenshots/user-detail.png)

## 🛠️ Stack Tecnológico

### Backend

- **Node.js** + **Express 5** - Framework web
- **Prisma 7** - ORM con adapter para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **Zod** - Validación de esquemas
- **Morgan** - Logger de requests HTTP
- **CORS** - Manejo de peticiones cross-origin

### Frontend

- **React 19** + **TypeScript** - UI library con tipado estático
- **Vite** - Build tool ultra rápido
- **Material-UI v7** - Componentes UI
- **React Router v7** - Enrutamiento
- **Zod** - Validación cliente

## 📁 Estructura del Proyecto

```
restAPI_persons/
├── docs/
│   └── screenshots/
│       ├── home.png
│       ├── register.png
│       └── user-detail.png
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   │   └── users.controllers.js
│   │   ├── routes/
│   │   │   └── users.routes.js
│   │   ├── schemas/
│   │   │   └── user.schema.js
│   │   ├── prisma.js
│   │   ├── db.js
│   │   └── index.js
│   ├── prisma.config.ts
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── home/
    │   │   │   └── HomePage.tsx
    │   │   ├── register/
    │   │   │   └── RegisterPage.tsx
    │   │   └── User/
    │   │       └── userInfo.tsx
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── layout.tsx
    │   │   │   └── navbar.tsx
    │   │   ├── user/
    │   │   │   └── usersTable.tsx
    │   │   └── register/
    │   │       └── registerForm.tsx
    │   ├── api/
    │   │   └── users.ts
    │   ├── actions/
    │   │   └── user.ts
    │   ├── types/
    │   │   └── user.ts
    │   ├── utils/
    │   │   └── formats.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── globals.css
    ├── public/
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── vite.config.ts
    └── package.json
```

## 🔌 API Endpoints

**Base URL**: `http://localhost:1234/api`

| Método | Endpoint          | Descripción                |
| ------ | ----------------- | -------------------------- |
| GET    | `/users`          | Obtener todos los usuarios |
| GET    | `/users/:id`      | Obtener usuario por ID     |
| POST   | `/users/register` | Crear nuevo usuario        |
| PUT    | `/users/:id`      | Actualizar usuario         |
| DELETE | `/users/:id`      | Eliminar usuario           |

## ⚙️ Instalación y Configuración

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **PostgreSQL** 14+ ([Descargar](https://www.postgresql.org/download/))
- **Git** ([Descargar](https://git-scm.com/))
- **npm** o **yarn** (viene con Node.js)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Angelmrn/restAPI_persons.git
cd restAPI_persons
```

### 2. Configurar Base de Datos PostgreSQL

# Opción A: Crear Base de Datos con psql (Terminal)

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE personas_test;

# Verificar que se creó
\l

# Salir
\q
```

# Opción B: Crear Base de Datos con pgAdmin (GUI)

Abre pgAdmin
Click derecho en "Databases" → "Create" → "Database..."
Name: personas_test
Click "Save"
Nota: No necesitas crear las tablas manualmente. Prisma las creará automáticamente en el siguiente paso.

### 3. Configurar Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales toma los .env.example com referencia
# DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/personas_test"
# PORT=1234
```

# Inicializar Prisma

```bash
# Generar cliente Prisma
npx prisma generate

# Crear tablas en la base de datos (automático desde schema.prisma)
npx prisma db push

# (Opcional) Ver datos en interfaz gráfica
npx prisma studio
```

# Verificacion:

Si ves ✔ Generated Prisma Client → Cliente generado correctamente
Si ves 🚀 Your database is now in sync with your Prisma schema → Tablas creadas

```bash
# Iniciar servidor backend
npm run dev:1
```

El backend estará disponible en: http://localhost:1234

### 4. Configurar Frontend

Abre una nueva terminal (deja el backend corriendo)

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

# Contenido del archivo .env:

VITE_API_URL=http://localhost:1234/api

```bash
# Iniciar servidor frontend
npm run dev
```
