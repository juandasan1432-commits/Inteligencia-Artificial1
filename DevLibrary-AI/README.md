# DevLibrary AI

Biblioteca conversacional en español sobre programación y ciberseguridad defensiva. Usa HTML5, CSS3, JavaScript e iconos SVG locales.

## Cómo abrirla

1. Extrae el ZIP y abre `index.html` en un navegador moderno.
2. Escribe una consulta y pulsa **Enter** o **Enviar consulta**. También puedes hacer clic en cualquiera de las cuatro preguntas sugeridas para enviarla al chat.
3. En **Biblioteca** puedes explorar los temas y sus referencias. En **Estados** puedes recorrer ejemplos de interfaz.

El chat requiere conexión para responder. Busca fichas en el navegador y muestra explicaciones, ejemplos y referencias. Si pierde la conexión, muestra un error con un código y permite volver a intentar la consulta.

## Archivos

- [index.html](index.html) contiene la bienvenida y el compositor.
- [biblioteca.html](biblioteca.html) reúne enlaces oficiales y fuentes primarias por tecnología.
- [estados.html](estados.html) reúne las vistas de ejemplo y una respuesta educativa sobre funciones de Python.
- [css/styles.css](css/styles.css) centraliza los tokens visuales, distribución, componentes y adaptación a pantalla.
- `js/topics.js` contiene las fichas introductorias del kit DevAtlas. `js/library.js` añade fichas por concepto y selecciona la respuesta. `js/chat.js` conecta las consultas y los botones con la conversación.
- `assets/icons/` contiene la marca y los iconos locales.
- [Arquitectura](docs/architecture.md) explica los componentes, las decisiones técnicas y los contratos propuestos.
- [Estados](docs/ui-states.md) documenta las vistas y cómo comprobarlas.

## Alcance de esta versión

Las respuestas proceden de fichas seleccionadas por tema, concepto y expresiones como «dame ejemplos de JS». Si falta una ficha y se reconoce la tecnología, el chat enlaza su documentación. La conversación vive en la página y se vacía al recargarla o iniciar otra.

La interfaz ofrece navegación por teclado, foco visible, reducción de movimiento y desplazamiento independiente para el código. El chat funciona sin dependencias externas, telemetría ni credenciales.

## Verificación

Prueba una consulta escrita, cada botón sugerido y una consulta fuera de cobertura. Comprueba que cada respuesta aparezca en la conversación, que los ejemplos se puedan leer en móvil y que las referencias abran la documentación correspondiente.
