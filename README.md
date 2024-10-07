
# PokeAPI Node.js con TypeScript

Este proyecto es una API construida con Node.js y TypeScript que interactúa con la PokeAPI para gestionar información de Pokémon. La API permite listar, capturar, liberar y administrar Pokémon, además de incorporar autenticación con tokens JWT y documentación con Swagger. También se proporciona un Dockerfile para facilitar la implementación con Docker.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
  - [Clonar el Repositorio](#clonar-el-repositorio)
  - [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
  - [Instalar Dependencias](#instalar-dependencias)
  - [Iniciar la Aplicación](#iniciar-la-aplicación)
- [Uso de Docker](#uso-de-docker)
  - [Construir la Imagen de Docker](#construir-la-imagen-de-docker)
  - [Ejecutar el Contenedor](#ejecutar-el-contenedor)
- [Documentación de la API](#documentación-de-la-api)
- [Endpoints Disponibles](#endpoints-disponibles)
  - [Autenticación](#autenticación)
  - [Pokémon](#pokémon)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Consideraciones Finales](#consideraciones-finales)
- [Autor](#autor)

## Características

- **Importar Pokémon**: Importa los primeros 150 Pokémon desde la PokeAPI a una base de datos local.
- **Listar Pokémon**: Lista Pokémon con paginación y filtros por nombre y tipo.
- **Capturar y Liberar Pokémon**: Permite capturar hasta 6 Pokémon; si se intenta capturar un séptimo, el más antiguo es liberado automáticamente.
- **Autenticación**: Implementa autenticación con JWT y un usuario admin por defecto (admin:admin).
- **Documentación**: Incluye documentación interactiva con Swagger en `/api-docs`.
- **Docker**: Proporciona un Dockerfile y configuración de Docker Compose para facilitar la implementación.

## Tecnologías Utilizadas

- **Node.js** y **TypeScript**: Plataforma y lenguaje principal del backend.
- **Express**: Framework web para crear la API REST.
- **Sequelize**: ORM para interactuar con la base de datos SQLite.
- **SQLite**: Base de datos ligera para almacenamiento local.
- **JWT (jsonwebtoken)**: Para autenticación basada en tokens.
- **bcrypt**: Para encriptar contraseñas.
- **Swagger**: Para documentación interactiva de la API.
- **Docker**: Para contenedorización de la aplicación.

## Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)
- **Docker** (opcional, si se desea ejecutar con Docker)

## Instalación

### Clonar el Repositorio

```bash
git clone git@github.com:nicoGG/pokemon-backend.git
cd pokemon-backend
```

### Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```dotenv
SECRET_KEY=tu_clave_secreta
```

**Nota**: Reemplaza `tu_clave_secreta` por una cadena segura. Este secreto se utiliza para firmar los tokens JWT.

### Instalar Dependencias

```bash
npm install
```

### Iniciar la Aplicación

Primero, compila el proyecto TypeScript:

```bash
npm run build
```

Luego, inicia la aplicación:

```bash
npm run serve
```

La API estará disponible en `http://localhost:3000`.

## Uso de Docker

### Construir la Imagen de Docker

```bash
docker build -t pokemon-backend .
```

### Ejecutar el Contenedor

```bash
docker run -p 3000:3000 -v $(pwd)/data:/app/data --env SECRET_KEY=tu_clave_secreta pokemon-backend
```

**Nota**: Asegúrate de reemplazar `tu_clave_secreta` por tu clave secreta real.

También puedes utilizar Docker Compose para simplificar este proceso:

```bash
docker-compose up --build
```

## Documentación de la API

La documentación interactiva de la API está disponible en:

```
http://localhost:3000/api-docs
```

Esta documentación está generada con Swagger y permite probar los endpoints directamente desde el navegador.

## Endpoints Disponibles

### Autenticación

- **POST `/api/auth/login`**: Iniciar sesión y obtener un token JWT.

### Pokémon

- **POST `/api/pokemon/import`**: Importar los primeros 150 Pokémon desde la PokeAPI.
- **GET `/api/pokemon`**: Listar Pokémon con paginación y filtros.
- **POST `/api/pokemon/capture/:id`**: Capturar un Pokémon por ID.
- **POST `/api/pokemon/release/:id`**: Liberar un Pokémon capturado por ID.
- **GET `/api/pokemon/captured`**: Listar Pokémon capturados.

## Ejemplos de Uso

### 1. Importar Pokémon

Ejecuta este endpoint una vez para importar los Pokémon a la base de datos.

```http
POST /api/pokemon/import
```

### 2. Autenticación

Obtén un token JWT para acceder a los endpoints protegidos.

**Solicitud**

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin"
}
```

**Respuesta Exitosa**

```json
{
  "token": "jwt_token_aquí"
}
```

### 3. Listar Pokémon

Listar Pokémon con opciones de paginación y filtros.

**Solicitud**

```http
GET /api/pokemon?page=1&name=pika&type=electric
Authorization: Bearer jwt_token_aquí
```

**Respuesta Exitosa**

```json
{
  "pokemons": [
    {
      "id": 25,
      "name": "pikachu",
      "types": ["electric"],
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      "captured": false,
      "captureDate": null
    }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "totalPokemons": 1
}
```

### 4. Capturar un Pokémon

Captura un Pokémon especificando su ID.

**Solicitud**

```http
POST /api/pokemon/capture/25
Authorization: Bearer jwt_token_aquí
```

**Respuesta Exitosa**

```json
{
  "message": "Pokémon capturado exitosamente"
}
```

### 5. Listar Pokémon Capturados

Obtén la lista de Pokémon que has capturado.

**Solicitud**

```http
GET /api/pokemon/captured
Authorization: Bearer jwt_token_aquí
```

**Respuesta Exitosa**

```json
[
  {
    "id": 25,
    "name": "pikachu",
    "types": ["electric"],
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "captured": true,
    "captureDate": "2023-10-10T12:00:00Z"
  }
]
```

## Consideraciones Finales

- **Límite de Captura**: Solo puedes tener 6 Pokémon capturados al mismo tiempo. Si intentas capturar un séptimo, el más antiguo será liberado automáticamente.
- **Seguridad**: Asegúrate de utilizar un `SECRET_KEY` seguro y de no exponerlo en repositorios públicos.
- **Persistencia de Datos**: Al utilizar Docker, se monta un volumen para la carpeta `data`, lo que garantiza que los datos de la base de datos persistan entre reinicios del contenedor.
- **Actualización Continua**: Si agregas o modificas endpoints, recuerda actualizar las anotaciones Swagger para mantener la documentación al día.

## Autor

Desarrollado por Nicolas Galdames.

---

¡Gracias por utilizar esta API! Si tienes alguna pregunta o sugerencia, no dudes en contactarme.
