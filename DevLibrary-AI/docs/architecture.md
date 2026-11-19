# Arquitectura de DevLibrary AI

La interfaz usa HTML para el contenido y la navegación, y una hoja CSS compartida para la presentación. GitHub Pages publica la demostración estática. La versión conversacional usa Python para recibir las preguntas y devolver HTML.

| Ruta | Responsabilidad |
| --- | --- |
| `index.html` | Portada, navegación y respuestas desplegables. |
| `biblioteca.html` | Catálogo con enlaces a documentación por tecnología. |
| `estados.html` | Galería de conversaciones, mensajes y alertas de ejemplo. |
| `css/styles.css` | Colores, tipografía, distribución adaptable y estilos de los estados. |
| `assets/icons/brand.svg` | Logotipo y favicon local. |
| `server/app.py` y `server/chat.html` | Formulario, historial y respuestas de la versión conversacional. |
| `server/library.py` y `server/catalogo.json` | Búsqueda de fichas y referencias en el catálogo. |

## Componentes

- El encabezado y la barra lateral enlazan la portada, la biblioteca, los estados y las categorías técnicas.
- Las preguntas de portada usan `details` y `summary`. Cada respuesta reúne una explicación, un bloque `pre` / `code` y un enlace de referencia.
- La galería representa mensajes de usuario y asistente, entrada vacía, conversación larga, espera, errores y fuentes. El formulario allí es de demostración.
- Las alertas contienen un título y una explicación. La alerta de conexión usa el ancla `#conexion`, que CSS resalta cuando se abre desde un enlace.
- La biblioteca agrupa tecnologías por área. El apartado de privacidad explica el alcance de la maqueta.

El navegador controla los desplegables y el foco. Los enlaces y las preguntas se pueden recorrer con el teclado. Los bloques largos se desplazan dentro de su contenedor.

En la versión con servidor, los formularios envían la pregunta con HTTP POST. El servidor busca una ficha y redirige a la respuesta para evitar repetir el envío al recargar. Una cookie temporal identifica la conversación, que se conserva en memoria. Si faltan resultados, el chat muestra un aviso y enlaza la referencia general cuando reconoce la tecnología.
