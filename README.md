# Kalitan

Landing page SaaS para una plataforma de economia circular enfocada en rescatar excedentes de alimentos y conectar negocios, voluntarios, asociaciones y beneficiarios.

## Stack

- React + Vite
- JavaScript
- React Router DOM
- Axios
- CSS separado por componente
- Preparado para backend Spring Boot
- Preparado para PostgreSQL/Supabase en una etapa futura

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm run dev
```

Build de produccion:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Estructura

```text
src/
  assets/
    images/
    icons/
    logos/
    illustrations/
  components/
    layout/
    sections/
    ui/
  context/
  hooks/
  layouts/
  pages/
  routes/
  services/
  styles/
  utils/
```

## Responsive

La landing esta construida mobile first con grids fluidos, imagenes escalables, navbar responsive y menu hamburguesa para tablet/movil. Los breakpoints principales estan documentados en `RESPONSIVE_GUIDE.md`.

## Dark Mode

El tema claro/oscuro se maneja con `ThemeProvider`, Context API, variables CSS y persistencia en `localStorage`. Mas detalle en `THEME_SYSTEM.md`.

## Assets

Los assets usados por la landing estan organizados en:

- `src/assets/images`
- `src/assets/logos`
- `src/assets/icons`
- `src/assets/illustrations`
