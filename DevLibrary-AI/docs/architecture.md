# Arquitectura de DevLibrary AI

La maqueta usa HTML para el contenido y la navegación, y una hoja CSS compartida para la presentación. GitHub Pages publica las páginas y sus recursos locales.

| Ruta | Responsabilidad |
| --- | --- |
| `index.html` | Portada, navegación y respuestas desplegables. |
| `biblioteca.html` | Catálogo con enlaces a documentación por tecnología. |
| `estados.html` | Galería de conversaciones, mensajes y alertas de ejemplo. |
| `css/styles.css` | Colores, tipografía, distribución adaptable y estilos de los estados. |
| `assets/icons/brand.svg` | Logotipo y favicon local. |

## Componentes

- El encabezado y la barra lateral enlazan la portada, la biblioteca, los estados y las categorías técnicas.
- Las preguntas de portada usan `details` y `summary`. Cada respuesta reúne una explicación, un bloque `pre` / `code` y un enlace de referencia.
- La galería representa mensajes de usuario y asistente, entrada vacía, conversación larga, espera, errores y fuentes. El formulario allí es de demostración.
- Las alertas contienen un título y una explicación. La alerta de conexión usa el ancla `#conexion`, que CSS resalta cuando se abre desde un enlace.
- La biblioteca agrupa tecnologías por área. El apartado de privacidad explica el alcance de la maqueta.

El navegador controla los desplegables y el foco. Los enlaces y las preguntas se pueden recorrer con el teclado. Los bloques largos se desplazan dentro de su contenedor. La interfaz no envía consultas ni comprueba la conexión.
