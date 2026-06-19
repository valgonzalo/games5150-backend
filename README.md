# GameCat - Backend (API)

Este repositorio contiene el backend completo para el Trabajo Integrador Final, desarrollado utilizando Node.js, Express y Sequelize (PostgreSQL). Implementa una API RESTful estructurada en capas, con autenticación JWT, envío de correos electrónicos y operaciones CRUD.

## 🚀 Tecnologías y Arquitectura
- **Node.js + Express**: Servidor web rápido y robusto.
- **Sequelize ORM**: Gestión e interacción con la base de datos relacional (PostgreSQL).
- **Arquitectura en Capas**: 
  - `routes/`: Define los endpoints de la API.
  - `controllers/`: Intercepta las solicitudes (req/res) y delega tareas.
  - `services/`: Contiene la lógica de negocio pura.
  - `repositories/`: Capa de acceso directo a la base de datos.
- **Seguridad**:
  - `bcrypt`: Hashing de contraseñas.
  - `jsonwebtoken`: Autenticación segura y sin estado mediante JWT.
  - Validación de correos electrónicos mediante `nodemailer`.

## 🛠 Instalación y Despliegue Local

1. **Clonar y entrar al directorio:**
   ```bash
   git clone <URL_DEL_REPO>
   cd gamecat-backend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (`.env`):**
   Crea un archivo `.env` en la raíz con el siguiente formato:
   ```env
   PORT=8080
   DB_URL=postgres://tu_usuario:tu_password@tu_host:5432/tu_db
   JWT_SECRET=tu_secreto_super_seguro
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=tu_correo@gmail.com
   SMTP_PASS=tu_contraseña_de_aplicacion
   FRONTEND_URL=http://localhost:5175
   ```

4. **Sembrar la Base de Datos (Crear Tablas e Insertar Datos):**
   Esto borrará y creará de nuevo la base de datos inicial.
   ```bash
   npm run seed
   ```

5. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

## 📚 Documentación de Endpoints (API)

A continuación, un resumen de los endpoints principales. 
*(Para probarlos fácilmente, importa el archivo `GameCat_Postman_Collection.json` en tu aplicación de Postman).*

### Autenticación (`/api/auth`)
- `POST /api/auth/register` - Registra un nuevo usuario y envía email de verificación.
- `POST /api/auth/login` - Autentica al usuario y devuelve el Token JWT.
- `GET /api/auth/verify?verification_token=...` - Verifica el correo electrónico del usuario.
- `GET /api/auth/me` - (Protegido) Devuelve los datos del usuario actual autenticado por JWT.

### Juegos (`/api/games`)
- `GET /api/games` - Obtiene todos los juegos (Permite query params: `?search=X&platform=Y&sort=Z`).
- `GET /api/games/:id` - Obtiene los detalles de un juego específico por ID.
- `POST /api/games` - (Protegido / Admin) Crea un nuevo juego en el catálogo.
- `PUT /api/games/:id` - (Protegido / Admin) Modifica un juego existente.
- `DELETE /api/games/:id` - (Protegido / Admin) Elimina un juego.

### Géneros (`/api/genres`)
- `GET /api/genres` - Obtiene la lista de todos los géneros disponibles.
- `POST /api/genres` - (Protegido / Admin) Crea un nuevo género.

### Lista de Deseados (`/api/wishlist`)
- `GET /api/wishlist` - (Protegido) Obtiene todos los juegos guardados por el usuario.
- `POST /api/wishlist` - (Protegido) Agrega un juego a la lista de deseados `{ "game_id": 1 }`.
- `DELETE /api/wishlist/:id` - (Protegido) Elimina un juego de la lista.

## 👥 Credenciales de Prueba (Ya verificadas)
- **Admin**: `admin@gamecat.com` / `Admin1234!`
- **Usuario Normal**: `user@gamecat.com` / `User1234!`
