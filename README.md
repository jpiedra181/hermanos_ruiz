# Taller Hermanos Ruiz

Web del taller (ES / EN) construida con Astro, GSAP (ScrollTrigger + SplitText) y Lenis.

## Comandos

| Comando                        | Acción                                              |
| :----------------------------- | :-------------------------------------------------- |
| `npm install`                  | Instala dependencias                                |
| `npm run dev`                  | Servidor de desarrollo en `localhost:4321`          |
| `npm run build`                | Genera la web estática en `./dist/`                 |
| `npm run preview`              | Sirve el build de producción                        |
| `node scripts/prepare-media.mjs` | Regenera la secuencia del banner, los recortes de servicios y `og.jpg` |

## Estructura

```text
src/
├── components/
│   ├── Hero.astro          Banner: secuencia de 40 fotogramas en <canvas> ligada al scroll
│   ├── Marquee.astro       Cinta de servicios ligada al scroll
│   ├── Manifesto.astro     Frase que se ilumina palabra a palabra
│   ├── Journey.astro       Proceso en 6 pasos (escenario fijo en escritorio)
│   ├── JourneyScene.astro  Ilustraciones SVG animadas de cada paso
│   ├── Services.astro      Lista de servicios con previsualización que sigue al cursor
│   ├── About.astro         Historia, contadores y comparador 1996 / hoy
│   ├── Reviews.astro       Carrusel accesible de opiniones
│   ├── Contact.astro       Estado abierto/cerrado, formulario y mapa (Leaflet bajo demanda)
│   └── Footer.astro
├── scripts/                GSAP, scroll suave, revelados y mapa
├── i18n/                   Textos ES / EN (`*texto*` se muestra en cursiva cobre)
└── styles/global.css       Tokens de diseño y estilos base
assets/images/…             Fotogramas originales del banner (fuente, no se publican)
public/images/hero/seq/     Fotogramas optimizados (640 / 960 / 1280 px, WebP)
```

## Notas

- **Movimiento reducido**: con `prefers-reduced-motion` el banner es una imagen fija, no hay scroll suave ni autoplay y las animaciones se desactivan.
- **Formulario**: valida en el navegador pero no envía a ningún servidor. Conecta el `submit` de `Contact.astro` a tu backend o servicio de formularios.
- **Dominio**: define `site` en `astro.config.mjs` para generar `canonical`, `hreflang` y `og:image` con URL absoluta.
