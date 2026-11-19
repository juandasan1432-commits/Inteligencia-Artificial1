# Arquitectura de DevLibrary AI

DevLibrary AI es una biblioteca conversacional en HTML, CSS y JavaScript. La portada envía consultas al buscador local. Este normaliza las palabras y ordena las fichas por tema y coincidencias de concepto. La interfaz muestra el resultado como texto, código y enlaces. La galería de estados contiene ejemplos independientes.

## Estructura

| Ruta | Responsabilidad |
| --- | --- |
| `index.html` | Bienvenida, navegación, preguntas sugeridas, compositor y avisos. |
| `estados.html` | Galería de estados. `#muestra` lleva a la respuesta de ejemplo sobre funciones en Python. |
| `biblioteca.html` | Catálogo de tecnologías y enlaces a documentación oficial. |
| `css/styles.css` | Tokens, estilos base, distribución, componentes, estados y adaptación al tamaño de la pantalla. |
| `js/` | Fichas introductorias, recuperación por tema y concepto, y manejo de la conversación. |
| `assets/icons/` | Identidad gráfica e iconos locales. |
| `docs/` | Arquitectura y [guía de estados](ui-states.md). |
| `README.md` | Instrucciones para abrir y usar el chat. |

## Componentes

| Componente | Función y estructura |
| --- | --- |
| `ChatHeader` | Encabezado con marca y modo de respuestas de la biblioteca. |
| `Sidebar` | Navegación complementaria, biblioteca, categorías, ciberseguridad e historial de muestra. Usa enlaces para los destinos disponibles. |
| `WelcomeScreen` | Bienvenida y botones de consultas que muestran su respuesta en el chat. |
| `ChatMessage` | Mensaje identificable por su autor y estructura visual. Una respuesta extensa reúne título, definición técnica, explicación sencilla, ejemplo, funcionamiento y buenas prácticas. |
| `ChatComposer` | Formulario con etiqueta, campo multilínea y envío con botón o Enter. Mayús + Enter agrega una línea. |
| `LoadingIndicator` | Indicador «Pensando» durante la búsqueda local. Se reemplaza por el resultado. |
| `ErrorMessage` | Avisos de entrada inválida, falta de resultados, fallo interno con reintento y pérdida de conexión. |
| `CodeBlock` | `pre` y `code` con lenguaje visible y desplazamiento horizontal en el propio bloque. |
| `SourcesList` | Lista de referencias con enlaces descriptivos. En la muestra las referencias se presentan con el alcance indicado en la página. |
| `AIDisclaimer` | Aviso sobre posibles errores en las fichas y recomendación de verificar información importante. |
| `TechnologyCard` | Tarjeta de tecnología o categoría con nombre, descripción y documentación de referencia. |

## Implementación visual y accesibilidad

- La semántica nativa separa encabezado, navegación, contenido principal y pie. Los títulos describen cada sección, los enlaces indican su destino y los campos tienen etiqueta. El orden de lectura se conserva al cambiar de ancho.
- La hoja compartida centraliza la paleta oscura, tipografía, espaciado y dimensiones en propiedades CSS. Grid organiza las regiones y tarjetas. Flexbox alinea grupos de controles y elementos de navegación. La tipografía de sistema y los iconos locales reducen solicitudes externas.
- En pantallas estrechas el contenido se reordena en una columna. En anchos mayores la navegación lateral deja espacio para una columna de lectura acotada. Los mensajes se adaptan al ancho disponible y el código largo se desplaza dentro de su bloque.
- El diseño ofrece foco visible, contraste, etiquetas y navegación por teclado. El historial usa `role="log"` y el foco vuelve al compositor tras el envío. `prefers-reduced-motion` permite reducir las animaciones de la galería.
- El desplegable «Proyecto y privacidad» de `index.html#proyecto` explica el tratamiento de las consultas. Las preguntas se procesan en el navegador y se conservan en la página. Antes de mostrar una respuesta, el chat confirma la conexión mediante una solicitud `HEAD` al sitio sin transmitir la consulta. Al abrir una copia desde el disco, el chat usa el estado de red del navegador.

## Contrato propuesto para la integración

Las siguientes rutas describen una API futura para esta interfaz. El cliente gestionaría la interacción y sus estados. La API validaría las consultas y coordinaría el recuperador, el proveedor de IA opcional y el almacenamiento.

| Ruta | Petición | Respuesta JSON |
| --- | --- | --- |
| `POST /api/chat` | `{message: string, topic?: string}`, con `topic` como identificador del catálogo. | `{answer: string, sources: Citation[], mode: "local" \| "ai"}`. `local` identifica una respuesta del servicio local y `ai` una respuesta generada con el proveedor opcional. |
| `GET /api/topics` | Sin cuerpo. | Lista de `{slug: string, name: string, area: string}`. |

Cada `Citation` incluiría `origin` (nombre de la documentación), `title` (página o sección), `url` (enlace directo) y `topic` (tecnología). `version` y `consultedAt` serían opcionales. Se incluiría la versión cuando sea pertinente y conste en la fuente. La fecha de consulta se consignaría solo si existe un registro verificable de la consulta. Las citas corresponderían a fragmentos que fundamenten la respuesta. Si `sources` está vacío, la interfaz mostraría «No se dispone de una fuente verificada para esta respuesta» y permitiría reformular la pregunta. `mode` identificaría cómo se produjo la respuesta, mientras que `sources` indicaría qué evidencia la respalda.

## Pasos de integración

1. Añadir un cliente JavaScript para validar el borrador, enviar y cancelar solicitudes, presentar los estados del chat y gestionar el foco. El servidor validaría también tipo, tamaño y tema de la entrada. Presentar errores comprensibles y conservar el borrador para reintentar después de un fallo.
2. Mantener un catálogo de identificadores estables y fichas Markdown curadas en español. Ingerir únicamente documentación autorizada o resúmenes propios. Registrar tecnología, versión, tema, título y URL canónica. Para incorporar una tecnología, agregar su entrada y fichas, reconstruir el índice y comprobar consultas representativas.
3. Indexar secciones en SQLite FTS5 y recuperar fragmentos por relevancia, con filtros de tecnología y versión cuando correspondan. Comprobar si los fragmentos respaldan la respuesta y evitar presentar versiones antiguas como vigentes. Evaluar la búsqueda con preguntas representativas antes de considerar un índice semántico.
4. Servir primero respuestas a partir de las fichas. Con autorización explícita, habilitar un proveedor de IA en el servidor y distinguir las afirmaciones respaldadas por fragmentos del contexto general. Mantener disponible el modo local para revertir la integración con el proveedor o recuperarse de un fallo.
5. Incorporar historial y controles de privacidad como funciones explícitas. Definir retención y borrado, minimizar datos enviados al proveedor y mantener las métricas operativas separadas del contenido de las conversaciones. Probar entrada vacía, cancelación, timeout, error de red, ausencia de fuentes, citas, teclado y anchos estrechos antes de conectar el servicio.

## Seguridad y alcance temático

- Validar la entrada en el servidor y emplear consultas parametrizadas, con tratamiento seguro de operadores de búsqueda FTS. Definir límites de tamaño y tasa, tiempos de espera, manejo de errores y políticas de origen y contenido apropiadas para el despliegue.
- Renderizar contenido como texto por defecto. Si se admite Markdown, deshabilitar HTML crudo, sanear el resultado y restringir los esquemas de URL. Tratar preguntas y fragmentos recuperados como datos de procedencia no confiable, separados de las instrucciones del modelo. Mantener las credenciales en variables de entorno del servidor, fuera del cliente, del repositorio y de los registros. Evitar registrar preguntas y revisar dependencias cuando se incorporen.
- Aceptar consultas de programación, informática, ingeniería de software y ciberseguridad, incluidas las preguntas introductorias relacionadas con esas materias. Para consultas claramente ajenas, usar «Soy un asistente especializado en programación, desarrollo de software y ciberseguridad. Puedo ayudarte con documentación técnica, conceptos, errores de código y buenas prácticas.»
- En ciberseguridad, priorizar prevención, detección, revisión defensiva y mitigación. Redirigir solicitudes que faciliten daño, explotación o acceso indebido hacia explicaciones conceptuales y medidas de protección. Mantener el código y los fragmentos recuperados como material de lectura.
