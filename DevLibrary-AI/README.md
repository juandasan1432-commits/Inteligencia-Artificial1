# DevLibrary AI

Biblioteca conversacional en español sobre programación y ciberseguridad defensiva. La interfaz usa HTML y CSS con un logotipo SVG local. Python procesa las preguntas y devuelve cada respuesta como HTML.

## Uso

Con Python 3.10 o posterior, ejecuta esto desde la carpeta `DevLibrary-AI`.

```bash
python server/app.py
```

Abre [el chat local](http://localhost:8071/), escribe una consulta o selecciona una pregunta sugerida. Cada envío carga una página con la respuesta y sus referencias, o con un aviso si el catálogo no cubre la pregunta.

GitHub Pages publica la [demostración estática](https://juandasan1432-commits.github.io/Inteligencia-Artificial1/). El chat que recibe preguntas requiere un alojamiento compatible con Python WSGI.

## Archivos

- [index.html](index.html) contiene la portada y las preguntas desplegables.
- [biblioteca.html](biblioteca.html) reúne la documentación oficial por tecnología.
- [estados.html](estados.html) muestra la conversación de ejemplo y las alertas.
- [css/styles.css](css/styles.css) organiza los estilos y el diseño adaptable.
- `server/` contiene el servidor WSGI, la plantilla HTML y el catálogo utilizado por el buscador.
- [Arquitectura](docs/architecture.md) y [estados](docs/ui-states.md) describen los componentes y cómo probarlos.
