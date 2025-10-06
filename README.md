# Task Manager App 🚀

Este repositorio contiene un proyecto completo de **gestión de tareas** con arquitectura de **microservicios**, desarrollado con **Node.js, TypeScript, MySQL y React (Vite)**.

---

## Estructura del proyecto

```
TaskManager/
  users/      --> Microservicio de usuarios y autenticación
  tasks/      --> Microservicio de tareas
  frontend/   --> Aplicación React + Vite
  docker-compose.yml
```

- Cada microservicio tiene su propio `package.json`, `tsconfig.json` y `.env`.
- El frontend utiliza Vite y React para la interfaz de usuario.

---

## Tecnologías

- **Backend:** Node.js + TypeScript, MySQL, JWT, bcrypt
- **Frontend:** React 18 + Vite
- **Docker:** Docker & Docker Compose
- **Autenticación:** Tokens JWT con refresh tokens

---

## Configuración de variables de entorno

Cada microservicio y el frontend necesitan su archivo `.env` con variables similares a:

**users/.env y tasks/.env**
```
DB_HOST=mysql
DB_USER=task_user
DB_PASSWORD=task_pass
DB_NAME=task_manager_db
JWT_SECRET=mi_secreto
```

**frontend/.env**
```
VITE_API_USERS_URL=http://localhost:3001/api/v1
VITE_API_TASKS_URL=http://localhost:3002/api/v1
```

> Nota: No subir `.env` al repositorio por seguridad.

---

## Levantar la aplicación con Docker Compose

Desde la raíz del proyecto (`TaskManager/`), ejecutar:

```bash
docker compose up --build
```

Esto levantará:

- **MySQL** en el contenedor `mysql` con la base de datos `task_manager_db`.
- **Users API** en el contenedor `task-manager-users` (puerto 3001).
- **Tasks API** en el contenedor `task-manager-tasks` (puerto 3002).
- **Frontend** en el contenedor `task-manager-frontend` (puerto 5173).

### Acceder a la aplicación

- Frontend: [http://localhost:5173](http://localhost:5173)
- Users API: [http://localhost:3001](http://localhost:3001)
- Tasks API: [http://localhost:3002](http://localhost:3002)

---

## Comandos útiles

- **Levantar contenedores en segundo plano:**

```bash
docker compose up -d
```

- **Detener contenedores:**

```bash
docker compose down
```

- **Ver logs de un servicio específico:**

```bash
docker compose logs -f tasks
```

- **Entrar a un contenedor para ejecutar comandos SQL o Node:**

```bash
docker exec -it task-manager-mysql mysql -u task_user -p
docker exec -it task-manager-users bash
```

---

## Buenas prácticas

- No subir archivos `.env` ni `node_modules`.
- Usar `.gitignore` unificado para todos los microservicios y frontend.
- Mantener la base de datos persistente usando **volúmenes de Docker**.
- Cada usuario solo puede operar sus propias tareas.

---

## Autor

- **Nicolás Agudelo**

