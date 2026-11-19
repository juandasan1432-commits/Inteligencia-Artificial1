# Estados de la interfaz

Los ejemplos son contenido estático. Usa **Estados** en el encabezado para saltar a cada vista.

| Estado | Vista | Comportamiento de la maqueta |
| --- | --- | --- |
| Vacío inicial | [Inicio](../index.html) | Bienvenida, identificación de IA, cuatro preguntas sugeridas y compositor. Las sugerencias abren una respuesta guardada o una referencia del catálogo. |
| Carga | [Mensaje pendiente](../estados.html#carga) | Consulta de ejemplo, texto «Generando respuesta...» e indicador visual con un espacio reservado. La preferencia de movimiento reducido detiene el giro. |
| Respuesta | [Funciones en Python](../estados.html#muestra) | Mensajes con autor, definición técnica, explicación sencilla, código, funcionamiento, prácticas y fuentes. El código muestra lenguaje y salida esperada. |
| Error | [Cinco ejemplos de error](../estados.html#error) | Generación fallida, conexión fallida, servicio no disponible, entrada inválida y tiempo agotado. Cada mensaje ofrece orientación contextual. |
| Sin resultados documentales | [Sin referencias](../estados.html#sin-resultados) | Aviso de ausencia de una fuente verificada, orientación general y sugerencia de reformulación. |
| Entrada vacía | [Formulario de muestra](../estados.html#entrada-vacia) | Etiqueta y ayuda contextual. El campo admite un borrador local y el envío permanece deshabilitado. |
| Conversación extensa | [Historial largo](../estados.html#extensa) | Mensajes diferenciados por autor, historial con desplazamiento vertical y bloques de código con desplazamiento independiente cuando hace falta. |
| Fuentes disponibles | [Fuentes consultadas](../estados.html#fuentes) | Dos secciones oficiales de Python 3, con título, procedencia, URL directa y fecha de consulta. |
| Consulta fuera de tema | [Ejemplo de alcance](../estados.html#fuera-de-tema) | Mensaje breve que redirige a programación, desarrollo y ciberseguridad. |

## Recorrido de comprobación

1. Abre Inicio y usa Tab para alcanzar el enlace «Saltar al contenido», las sugerencias y el campo de consulta. Comprueba el indicador de foco.
2. En una ventana estrecha, comprueba que **Chat**, **Biblioteca** y **Estados** siguen accesibles. Recorre los temas del catálogo desde Biblioteca y los historiales de muestra desde Estados.
3. En Historial largo, enfoca la zona de mensajes y usa las flechas para desplazarte. En un bloque largo, usa el desplazamiento horizontal dentro del bloque.
4. Activa la opción de reducir movimiento del sistema y vuelve a Carga. El texto permanece visible y el indicador queda quieto.
5. Escribe un borrador y pulsa Intro. El campo agrega una línea. El compositor no transmite la consulta.

## Transiciones previstas

El cliente futuro validará el borrador y podrá iniciar la carga, cancelar, mostrar la respuesta o recuperar un error conservando el texto. El servidor determinará si hay fuentes verificadas. Los anuncios de cambios y la gestión del foco se incorporarán y probarán junto con esas transiciones. La copia de código requiere una acción de cliente con confirmación accesible.
