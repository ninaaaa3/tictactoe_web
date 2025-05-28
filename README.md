# Tic Tac Toe - Vue.js Game

Este proyecto es un juego de **Tic Tac Toe** (Gato) desarrollado con **Vue.js**. Permite jugar en modo **Jugador vs Jugador** (PvP) o **Jugador vs CPU**, con distintos niveles de dificultad gracias a un algoritmo Minimax optimizado. El diseño es responsivo, soporta los navegadores más populares y cuenta con pruebas unitarias, integración continua y dockerización. q

## Características

- Modo Jugador vs Jugador (PvP)
- Modo Jugador vs CPU (IA con algoritmo Minimax, dificultad ajustable)
- Interfaz moderna y responsiva
- Pruebas unitarias con [Vitest](https://vitest.dev/)
- Dockerfile listo para despliegue
- Flujo CI/CD automatizado con GitHub Actions
- Gestión de dependencias con **pnpm**

## Instalación y Ejecución Local

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

**Requisitos:**

- Node.js (v16+ recomendado)
- [pnpm](https://pnpm.io/) (instalar con `npm install -g pnpm`)


**Instalar dependencias:**

```bash
pnpm install
```

Accede a [http://localhost:8080](http://localhost:8080) o el puerto indicado en consola.

---

## Testing

Ejecuta los tests unitarios usando Vitest:

```bash
pnpm run test
```

Los tests cubren tanto la lógica de la IA, el modo PvP, como los componentes principales del juego.

---

## Docker

Puedes ejecutar la aplicación dentro de un contenedor Docker.

**Construcción de la imagen:**

```bash
docker build -t usuario/tic-tac-toe-vue .
```

**Ejecución del contenedor:**

```bash
docker run -p 8080:80 usuario/tic-tac-toe-vue
```

Accede a [http://localhost:8080](http://localhost:8080).

---

## CI/CD con GitHub Actions

El repositorio incluye un workflow en `.github/workflows/main.yml` que se activa con cada `push`:

- Ejecuta linter y pruebas unitarias.
- Construye y publica la imagen en DockerHub (reemplaza los secretos y el usuario por los tuyos).

---

## Despliegue en DockerHub

La imagen del juego está disponible en DockerHub:

[https://hub.docker.com/r/ninaaa/vue-app]

Puedes descargarla directamente con:

```bash
docker pull ninaaa/vue-app
```

## Autores

- [Karina](https://github.com/ninaaaa3)
- [Demis](https://github.com/drijksb)


## Créditos

- [Vue.js](https://vuejs.org/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/)