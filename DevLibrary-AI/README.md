# DevLibrary AI

Maqueta navegable en español para una biblioteca conversacional de programación y ciberseguridad defensiva. Usa HTML5, CSS3 e iconos SVG locales.

## Cómo abrirla

1. Extrae el ZIP y abre `index.html` en un navegador moderno.
2. En **Biblioteca** puedes explorar los cinco grupos temáticos y abrir sus referencias.
3. En **Estados** puedes recorrer los ejemplos de conversación, fuentes, carga y error.

La maqueta abre directamente desde el disco, sin instalación ni servidor. Los enlaces a documentación externa requieren conexión. Los formularios permiten escribir un borrador en pantalla con el envío deshabilitado.

## Archivos

- [index.html](index.html) contiene la bienvenida y el compositor.
- [biblioteca.html](biblioteca.html) reúne enlaces oficiales y fuentes primarias por tecnología.
- [estados.html](estados.html) reúne las vistas de ejemplo y una respuesta educativa sobre funciones de Python.
- [css/styles.css](css/styles.css) centraliza los tokens visuales, distribución, componentes y adaptación a pantalla.
- `assets/icons/` contiene la marca y los iconos locales.
- [Arquitectura](docs/architecture.md) explica los componentes, las decisiones técnicas y los contratos propuestos.
- [Estados](docs/ui-states.md) documenta las vistas y cómo comprobarlas.

## Alcance de esta versión

La navegación, los enlaces, el desplegable de privacidad y el campo de texto usan controles nativos. Las conversaciones, la carga y los errores se ilustran con contenido fijo. El envío, el historial persistente, la generación de respuestas, la recuperación documental y la copia de código requieren integración futura.

La entrega aplica estructura semántica, foco visible, contraste, diseños de una y dos columnas, reducción de movimiento y desplazamiento independiente para el código. La maqueta carece de dependencias de ejecución, telemetría y credenciales. Los ejemplos citados distinguen la documentación usada para prepararlos de los enlaces generales del catálogo.

## Verificación

Se revisaron la estructura HTML, los enlaces internos, los recursos SVG y las referencias del catálogo. En Chromium con JavaScript desactivado se comprobó la adaptación de las tres páginas a 320, 390, 768, 1024 y 1440 píxeles, el recorrido por teclado, el movimiento reducido, el desplazamiento de código e historial, y el comportamiento local de los formularios. La prueba en este entorno usó un servidor HTTP local porque la política de Chromium bloquea las URL `file://`.
