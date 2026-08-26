# Martis Esthetic & Dental Clinic Group — Demo

Sitio demostrativo (one-page) para **Martis Esthetic & Dental Clinic Group**, clínica de
odontología y estética en San Pedro de Macorís, República Dominicana.

Construido por **NEXIX Tech Studio**.

## Stack

React 18 · TypeScript · Vite 6 · Framer Motion 11 · CSS vanilla (sin framework de estilos).

## Arrancar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Sistema de diseño

La paleta no es inventada: se extrajo del logotipo y de fotogramas del video real de la clínica.

| Token | Hex | Uso |
|---|---|---|
| Marfil | `#FAF7F2` | Fondo principal (nunca `#FFF`) |
| Crema | `#F2EAE0` | Secciones alternas y tarjetas |
| Arena | `#E4D6C5` | Bloques suaves y bordes |
| Caramelo | `#C9A784` | Del cuero de los sillones |
| Dorado Martis | `#C6A15B` | El del logotipo — sólo filetes de 1px |
| Champagne | `#E3C88D` | Brillo del dorado sobre fondo oscuro |
| Espresso | `#2E2A26` | Tipografía (negro cálido, nunca `#000`) |
| Topo | `#7A7068` | Texto secundario |
| Nocturno | `#211E1B` | Sólo dos secciones: el video y el cierre |

Proporción **85 / 12 / 3**: base clara, acento cálido, dorado real. Tipografía
**Cormorant Garamond** (títulos) + **Jost** (interfaz), elegidas por su parecido con las dos
tipografías del logotipo.

El **arco** que enmarca imágenes y video reproduce la arquitectura real de la clínica
(sala de espera y arco de mármol de la recepción).

## Estructura

```
src/
  i18n.tsx           diccionario ES/EN + datos reales de la clínica
  index.css          tokens, reset, botones, cursor, grano
  components/        una sección por archivo
  styles/            una hoja por sección
  hooks/             useParallax
public/media/        video optimizado, fotogramas y logotipo recortado
assets-source/       material original entregado por el cliente
```

## Notas

- El video vertical (9:16) se usa en su formato nativo dentro de marcos en arco; nunca
  recortado a apaisado.
- `clinic-loop.mp4` (sin audio, 3.4 MB) alimenta el hero; `clinic.mp4` (con audio, 5.6 MB)
  se carga en diferido sólo al acercarse la sección "El espacio".
- Las fotografías de la galería son fotogramas extraídos del propio video.
- El formulario de contacto no usa backend: **redacta el mensaje y abre WhatsApp con él
  ya escrito**. Para que el texto viaje prefijado hace falta rellenar `CLINIC.whatsappNumber`
  en `src/i18n.tsx` con el número completo y sólo dígitos (ej. `18091234567`) — el link corto
  `wa.me/message/...` no admite texto. Sin el número configurado, el sitio copia el mensaje
  al portapapeles y abre el link corto.
- Los testimonios son texto de muestra, pendientes de reemplazar por reseñas reales.
- El horario de atención es un marcador de posición pendiente de confirmar con la clínica.
