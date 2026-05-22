# Kalitán Frontend

Landing page profesional de Kalitán construida con React y Vite. Este frontend está preparado para escalar y consumir una API REST de Spring Boot.

## Instalación

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Copia el archivo de variables de entorno:

```bash
copy .env.example .env
```

4. Ejecuta la aplicación:

```bash
npm run dev
```

5. Abre `http://localhost:5173`.

## Estructura recomendada

- `src/components`: componentes visuales reutilizables.
- `src/pages`: páginas completas, como la landing.
- `src/layouts`: layouts comunes con navbar y footer.
- `src/routes`: rutas de React Router.
- `src/services`: capa de acceso a API.
- `src/utils`: datos, constantes y contenido estático.
- `src/assets`: imágenes y logos.

## Configuración del backend

La URL base del backend usa la variable de entorno:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Buenas prácticas aplicadas

- Componentes pequeños y con responsabilidad única.
- Separación entre UI y consumo de datos.
- Capa de servicios para llamadas HTTP.
- Estilos modulares por componente.
- Responsive desde el inicio.

## Siguientes pasos

- Crear rutas de autenticación y paneles de usuario.
- Conectar los servicios con el backend Spring Boot.
- Implementar manejo de estados y context API si es necesario.
