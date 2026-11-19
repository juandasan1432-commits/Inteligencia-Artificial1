// Fichas introductorias de DevAtlas Codex.
const technologyCards = [
  {
    "id": "bash",
    "title": "Bash",
    "summary": "Intérprete de comandos y lenguaje de scripting en sistemas tipo Unix. Sirve para automatizar comandos de terminal.",
    "code": "for archivo in *.txt; do\n  printf \"%s\\n\" \"$archivo\"\ndone",
    "detail": "El bucle recorre los nombres que coinciden con el patrón.",
    "sources": [
      [
        "Bash",
        "https://www.gnu.org/software/bash/manual/"
      ]
    ]
  },
  {
    "id": "c",
    "title": "C",
    "summary": "Lenguaje compilado procedural con control explícito de memoria y punteros. Permite construir sistemas y programas cercanos al hardware.",
    "code": "#include <stdio.h>\nint main(void) {\n  printf(\"Hola C\\n\");\n  return 0;\n}",
    "detail": "main es el punto de entrada y printf muestra texto.",
    "sources": [
      [
        "C",
        "https://en.cppreference.com/w/c"
      ]
    ]
  },
  {
    "id": "ciberseguridad",
    "title": "Ciberseguridad",
    "summary": "Conjunto de prácticas para proteger confidencialidad, integridad y disponibilidad de sistemas y datos. Es prevenir accesos indebidos, pérdidas y manipulaciones de información.",
    "code": "// Ejemplo defensivo de consulta parametrizada\ncursor.execute(\"SELECT * FROM users WHERE id = ?\", (user_id,))",
    "detail": "El valor se manda como parámetro, no se mezcla con el texto de la consulta SQL.",
    "sources": [
      [
        "Ciberseguridad",
        "https://owasp.org/www-project-top-ten/"
      ]
    ]
  },
  {
    "id": "cpp",
    "title": "C++",
    "summary": "Lenguaje compilado multiparadigma con acceso a recursos de bajo nivel y abstracciones. Se usa para programas eficientes, juegos y herramientas.",
    "code": "#include <iostream>\nint main() {\n  int edad = 20;\n  std::cout << edad << \"\\n\";\n}",
    "detail": "Se declara un entero y se escribe en la salida estándar.",
    "sources": [
      [
        "C++",
        "https://en.cppreference.com/w/cpp"
      ]
    ]
  },
  {
    "id": "csharp",
    "title": "C#",
    "summary": "Lenguaje tipado de propósito general usado ampliamente con .NET. Sirve para aplicaciones, APIs, escritorio y videojuegos.",
    "code": "int edad = 21;\nConsole.WriteLine(edad);",
    "detail": "Se crea una variable entera y se muestra por consola.",
    "sources": [
      [
        "C#",
        "https://learn.microsoft.com/es-es/dotnet/csharp/"
      ]
    ]
  },
  {
    "id": "css",
    "title": "CSS",
    "summary": "Lenguaje de hojas de estilo que aplica presentación a documentos HTML. Es la ropa y el diseño de una página.",
    "code": "h1 {\n  color: rebeccapurple;\n  font-size: 2rem;\n}",
    "detail": "El selector encuentra elementos y las declaraciones cambian su apariencia.",
    "sources": [
      [
        "CSS",
        "https://developer.mozilla.org/es/docs/Web/CSS"
      ]
    ]
  },
  {
    "id": "dart",
    "title": "Dart",
    "summary": "Lenguaje de programación orientado a objetos que se usa mucho con Flutter. Ayuda a construir aplicaciones multiplataforma.",
    "code": "void main() {\n  final edad = 20;\n  print(edad);\n}",
    "detail": "final fija la variable una vez y print muestra su valor.",
    "sources": [
      [
        "Dart",
        "https://dart.dev/language"
      ]
    ]
  },
  {
    "id": "docker",
    "title": "Docker",
    "summary": "Plataforma para empaquetar y ejecutar aplicaciones en contenedores. Facilita ejecutar un programa con sus dependencias.",
    "code": "docker build -t mi-app .\ndocker run --rm mi-app",
    "detail": "El primer comando crea una imagen y el segundo inicia un contenedor.",
    "sources": [
      [
        "Docker",
        "https://docs.docker.com/get-started/"
      ]
    ]
  },
  {
    "id": "git",
    "title": "Git",
    "summary": "Sistema de control de versiones distribuido. Guarda versiones de tu código y permite colaborar.",
    "code": "git status\ngit add archivo.js\ngit commit -m \"Agregar ejemplo\"",
    "detail": "status muestra cambios, add prepara y commit registra una versión.",
    "sources": [
      [
        "Git",
        "https://git-scm.com/doc"
      ]
    ]
  },
  {
    "id": "go",
    "title": "Go",
    "summary": "Lenguaje compilado de tipado estático con concurrencia y biblioteca estándar amplia. Facilita crear servicios y herramientas eficientes.",
    "code": "package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hola Go\") }",
    "detail": "main ejecuta la función y fmt.Println imprime texto.",
    "sources": [
      [
        "Go",
        "https://go.dev/doc/"
      ]
    ]
  },
  {
    "id": "html",
    "title": "HTML",
    "summary": "Lenguaje de marcado que define la estructura semántica de una página web. Es el esqueleto de una página.",
    "code": "<main>\n  <h1>Hola</h1>\n  <p>Estoy aprendiendo HTML.</p>\n</main>",
    "detail": "El navegador interpreta etiquetas y crea elementos en la página.",
    "sources": [
      [
        "HTML",
        "https://developer.mozilla.org/es/docs/Web/HTML"
      ]
    ]
  },
  {
    "id": "java",
    "title": "Java",
    "summary": "Java es un lenguaje con tipos estáticos que normalmente se ejecuta en la máquina virtual de Java (JVM).",
    "code": "class Hola {\n  public static void main(String[] args) {\n    System.out.println(\"Hola, Java\");\n\n    int total = 2 + 3;\n    System.out.println(\"Total: \" + total); // Total: 5\n  }\n}",
    "detail": "main es el punto de entrada. El primer println imprime un saludo. El segundo muestra el resultado de una suma guardada en una variable de tipo int.",
    "sources": [
      [
        "Java",
        "https://dev.java/learn/"
      ]
    ]
  },
  {
    "id": "javascript",
    "title": "JavaScript",
    "summary": "Lenguaje de programación de alto nivel con funciones, objetos y ejecución en navegador o servidor. Da comportamiento a las páginas y a muchos programas.",
    "code": "// 1. Mostrar un mensaje\nconsole.log(\"Hola, JavaScript\");\n\n// 2. Usar una función con argumentos\nfunction sumar(a, b) {\n  return a + b;\n}\nconsole.log(sumar(2, 3)); // 5\n\n// 3. Transformar un arreglo\nconst numeros = [3, 5, 7];\nconst doble = numeros.map(n => n * 2);\nconsole.log(doble); // [6, 10, 14]",
    "detail": "Puedes pegar los ejemplos en la consola del navegador. console.log muestra cada resultado. map crea un arreglo con el doble de cada número.",
    "sources": [
      [
        "MDN — Guía de JavaScript",
        "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide"
      ]
    ]
  },
  {
    "id": "kotlin",
    "title": "Kotlin",
    "summary": "Lenguaje estáticamente tipado interoperable con Java, usado también en Android. Hace cómodo escribir aplicaciones móviles y de servidor.",
    "code": "fun main() {\n    val nombre = \"Kotlin\"\n    println(\"Hola $nombre\")\n}",
    "detail": "val declara una referencia de solo lectura y println escribe.",
    "sources": [
      [
        "Kotlin",
        "https://kotlinlang.org/docs/home.html"
      ]
    ]
  },
  {
    "id": "nextjs",
    "title": "Next.js",
    "summary": "Framework de React para aplicaciones web con renderizado y enrutamiento integrados. Añade herramientas listas para crear una app completa con React.",
    "code": "export default function Page() {\n  return <h1>Bienvenido</h1>;\n}",
    "detail": "El framework convierte el componente exportado en contenido de página según su estructura de rutas.",
    "sources": [
      [
        "Next.js",
        "https://nextjs.org/docs"
      ]
    ]
  },
  {
    "id": "nodejs",
    "title": "Node.js",
    "summary": "Entorno de ejecución de JavaScript fuera del navegador basado en V8. Permite usar JavaScript para herramientas y servidores.",
    "code": "const fs = require(\"node:fs\");\nconsole.log(fs.existsSync(\"package.json\"));",
    "detail": "require carga la biblioteca estándar y el método comprueba si existe el archivo.",
    "sources": [
      [
        "Node.js",
        "https://nodejs.org/en/learn"
      ]
    ]
  },
  {
    "id": "php",
    "title": "PHP",
    "summary": "Lenguaje de scripting de servidor utilizado para crear aplicaciones web. Genera respuestas web desde el servidor.",
    "code": "<?php\n$nombre = \"Ana\";\necho \"Hola \" . $nombre;",
    "detail": "La variable contiene texto; . concatena cadenas y echo las envía a la salida.",
    "sources": [
      [
        "PHP",
        "https://www.php.net/manual/es/"
      ]
    ]
  },
  {
    "id": "python",
    "title": "Python",
    "summary": "Lenguaje interpretado de propósito general con sintaxis basada en indentación. Sirve para automatizar, crear APIs, analizar datos y aprender algoritmos.",
    "code": "numeros = [2, 4, 6]\ntotal = sum(numeros)\nprint(total)",
    "detail": "La lista almacena números; sum los acumula y print muestra 12.",
    "sources": [
      [
        "Python",
        "https://docs.python.org/3/"
      ]
    ]
  },
  {
    "id": "react",
    "title": "React",
    "summary": "Biblioteca de JavaScript para construir interfaces por componentes declarativos. Permite dividir la interfaz en piezas reutilizables.",
    "code": "function Saludo({ nombre }) {\n  return <h1>Hola {nombre}</h1>;\n}",
    "detail": "React convierte la descripción del componente en elementos de interfaz.",
    "sources": [
      [
        "React",
        "https://react.dev/learn"
      ]
    ]
  },
  {
    "id": "ruby",
    "title": "Ruby",
    "summary": "Lenguaje dinámico orientado a objetos con sintaxis expresiva. Permite escribir programas legibles, también aplicaciones web.",
    "code": "numeros = [1, 2, 3]\nputs numeros.sum",
    "detail": "El arreglo contiene tres elementos y sum los suma.",
    "sources": [
      [
        "Ruby",
        "https://www.ruby-lang.org/en/documentation/"
      ]
    ]
  },
  {
    "id": "rust",
    "title": "Rust",
    "summary": "Lenguaje compilado de sistemas con modelo de propiedad y préstamos para seguridad de memoria. Permite crear programas rápidos con reglas que evitan muchos errores de memoria.",
    "code": "fn main() {\n    let nombre = String::from(\"Rust\");\n    println!(\"Hola {nombre}\");\n}",
    "detail": "String posee sus datos y println! imprime el texto.",
    "sources": [
      [
        "Rust",
        "https://doc.rust-lang.org/book/"
      ]
    ]
  },
  {
    "id": "sql",
    "title": "SQL",
    "summary": "Lenguaje declarativo para consultar y manipular datos relacionales. Permite preguntar y actualizar información en tablas.",
    "code": "SELECT nombre FROM coders WHERE activo = TRUE;",
    "detail": "SELECT elige la columna y WHERE filtra las filas.",
    "sources": [
      [
        "SQL",
        "https://www.postgresql.org/docs/current/tutorial-sql.html"
      ]
    ]
  },
  {
    "id": "svelte",
    "title": "Svelte",
    "summary": "Framework que compila componentes en JavaScript eficiente. Ayuda a crear interfaces con menos código de ejecución.",
    "code": "<script>\n  let nombre = \"Svelte\";\n</script>\n<h1>Hola {nombre}</h1>",
    "detail": "La expresión en la plantilla inserta el valor de la variable.",
    "sources": [
      [
        "Svelte",
        "https://svelte.dev/docs/svelte/overview"
      ]
    ]
  },
  {
    "id": "swift",
    "title": "Swift",
    "summary": "Lenguaje compilado para ecosistemas Apple y otros entornos. Permite crear apps para iPhone y Mac.",
    "code": "let nombre = \"Swift\"\nprint(\"Hola \\(nombre)\")",
    "detail": "let define una constante y la interpolación coloca su valor en el texto.",
    "sources": [
      [
        "Swift",
        "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/"
      ]
    ]
  },
  {
    "id": "typescript",
    "title": "TypeScript",
    "summary": "Superset de JavaScript con sistema de tipos estático que se transpila a JavaScript. Es JavaScript con ayudas para detectar errores antes de ejecutarlo.",
    "code": "function saludar(nombre: string): string {\n  return `Hola ${nombre}`;\n}",
    "detail": "El compilador comprueba tipos y produce JavaScript para ejecutar.",
    "sources": [
      [
        "TypeScript",
        "https://www.typescriptlang.org/docs/"
      ]
    ]
  },
  {
    "id": "vue",
    "title": "Vue",
    "summary": "Framework progresivo de JavaScript para interfaces reactivas. Organiza vistas con componentes y datos que actualizan la pantalla.",
    "code": "<script setup>\nimport { ref } from \"vue\";\nconst contador = ref(0);\n</script>\n<template><button @click=\"contador++\">{{ contador }}</button></template>",
    "detail": "ref crea un estado reactivo; el botón lo aumenta y la vista se actualiza.",
    "sources": [
      [
        "Vue",
        "https://vuejs.org/guide/introduction.html"
      ]
    ]
  }
];
