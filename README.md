# CRUEL — web oficial del cortometraje

Landing de **Cruel** (Dionysiacus Productions · CIFP A Farixa, Ourense, 2025), con estética editorial monocroma: hero a pantalla completa, sinopsis y ficha técnica, tráiler, tira de fotogramas con lightbox, reparto, créditos del equipo, prensa y contacto.

Desplegada en https://cruel-film.vercel.app

## Desarrollo

```bash
npm install
npm start        # http://localhost:3000
npm run build    # build de producción en /build
```

Stack: Create React App + React 19 + Framer Motion. Los estilos viven en `src/index.css` (CSS plano, sin Tailwind).

## Imágenes

Los fotogramas originales están en `public/galeria` (PNG sin comprimir, ~6 MB cada uno). La web usa las versiones optimizadas de `public/stills`, que se generan con:

```bash
node scripts/optimize-images.js
```

El script también produce los logos en blanco sobre transparente (`logo-dp.png`, `logos-farixa.png`).
