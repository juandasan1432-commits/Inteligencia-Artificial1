const conceptCards = [
  {
    title: 'console.log() en JavaScript',
    topics: ['javascript', 'typescript', 'nodejs'],
    terms: ['console log', 'console', 'consola', 'consol log', 'consolelog', 'imprimir en javascript', 'imprimir en js', 'print to console'],
    summary: 'console es el objeto que da acceso a la consola del entorno. Su método console.log() muestra mensajes y valores. En el navegador aparecen en las herramientas de desarrollo y en Node.js se escriben en la terminal.',
    code: 'console.log("Hola, mundo");\n\nconst total = 3 + 4;\nconsole.log("Total:", total); // Total: 7\n\nconsole.log({ producto: "Libro", precio: 12 });',
    detail: 'Puedes pasar varios argumentos para ver una etiqueta junto a su valor. Es útil para depurar sin modificar el contenido de la página.',
    sources: [['MDN — console.log()', 'https://developer.mozilla.org/es/docs/Web/API/console/log_static']],
  },
  {
    title: 'Variables en JavaScript',
    topics: ['javascript', 'typescript', 'nodejs'],
    terms: ['variable', 'variables', 'const', 'let', 'var', 'declarar una variable'],
    summary: 'Usa const cuando el nombre conservará el mismo valor y let cuando necesites reasignarlo. Ambas declaraciones tienen alcance de bloque.',
    code: 'const nombre = "Ana";\nlet puntos = 0;\npuntos += 10;\nconsole.log(nombre, puntos); // Ana 10',
    detail: 'Una declaración con const impide reasignar el nombre. El contenido de un objeto guardado en esa constante puede cambiar.',
    sources: [['MDN — Gramática y tipos', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types']],
  },
  {
    title: 'Funciones en JavaScript',
    topics: ['javascript', 'typescript', 'nodejs'],
    terms: ['funcion', 'funciones', 'function', 'functions', 'arrow function', 'arrow functions', 'funcion flecha', 'funciones flecha'],
    summary: 'Una función agrupa una tarea reutilizable. Puede recibir argumentos y devolver un valor con return. Las funciones flecha ofrecen una sintaxis abreviada.',
    code: 'function saludar(nombre) {\n  return "Hola, " + nombre;\n}\n\nconst duplicar = numero => numero * 2;\nconsole.log(saludar("Ana")); // Hola, Ana\nconsole.log(duplicar(4)); // 8',
    detail: 'saludar devuelve un texto. duplicar usa el retorno implícito de una función flecha escrita como una sola expresión.',
    sources: [['MDN — Funciones', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions']],
  },
  {
    title: 'Bucles en JavaScript',
    topics: ['javascript', 'typescript', 'nodejs'],
    terms: ['bucle', 'bucles', 'ciclo', 'ciclos', 'for', 'while', 'for of'],
    summary: 'Usa for...of para recorrer los valores de un arreglo. Usa while cuando quieras repetir mientras se cumpla una condición.',
    code: 'const nombres = ["Ana", "Luis"];\nfor (const nombre of nombres) {\n  console.log(nombre);\n}',
    detail: 'El bucle imprime Ana y luego Luis. La variable nombre toma un valor nuevo en cada iteración.',
    sources: [['MDN — Bucles e iteración', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Loops_and_iteration']],
  },
  {
    title: 'Map en JavaScript',
    topics: ['javascript', 'typescript', 'nodejs'],
    terms: ['map objeto', 'new map', 'map clave valor', 'map claves', 'clave valor en javascript'],
    summary: 'Map almacena pares de clave y valor. Usa set para guardar un valor, get para recuperarlo y has para comprobar que existe su clave.',
    code: 'const precios = new Map();\nprecios.set("libro", 12);\nconsole.log(precios.get("libro")); // 12\nconsole.log(precios.has("libro")); // true',
    detail: 'Para transformar los elementos de un arreglo, consulta Array.prototype.map().',
    sources: [['MDN — Map', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map']],
  },
  {
    title: 'System.out.println() en Java',
    topics: ['java'],
    terms: ['system out println', 'system out print', 'println', 'printstream', 'consola', 'imprimir en java', 'console log en java', 'console log java'],
    summary: 'System.out es el flujo de salida estándar de Java. println() escribe un valor y termina la línea. print() escribe el valor y deja el cursor en la misma línea.',
    code: 'public class Ejemplo {\n    public static void main(String[] args) {\n        System.out.println("Hola, mundo");\n        int total = 3 + 4;\n        System.out.println("Total: " + total);\n    }\n}',
    detail: 'Guarda este ejemplo en Ejemplo.java. Al ejecutar la clase, la salida muestra Hola, mundo y Total: 7 en líneas separadas.',
    sources: [['Oracle — PrintStream', 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/PrintStream.html']],
  },
  {
    title: 'Map en Java',
    topics: ['java'],
    terms: ['map', 'hashmap', 'map objeto', 'mapa', 'pares clave valor'],
    summary: 'Map<K,V> es la interfaz de Java para asociar claves únicas con valores. HashMap es una de sus implementaciones. put guarda una asociación y get recupera el valor de una clave.',
    code: 'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Ejemplo {\n    public static void main(String[] args) {\n        Map<String, Integer> precios = new HashMap<>();\n        precios.put("libro", 12);\n        System.out.println(precios.get("libro")); // 12\n    }\n}',
    detail: 'String indica el tipo de cada clave e Integer el tipo de cada valor.',
    sources: [['Oracle — Interfaz Map', 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Map.html']],
  },
  {
    title: 'Clases y métodos en Java',
    topics: ['java'],
    terms: ['clase', 'clases', 'metodo', 'metodos', 'constructor', 'constructores', 'objetos', 'class'],
    summary: 'Una clase define datos y métodos. Un objeto es una instancia de esa clase. El constructor inicializa los datos del objeto cuando lo creas con new.',
    code: 'class Libro {\n    private final String titulo;\n\n    Libro(String titulo) {\n        this.titulo = titulo;\n    }\n\n    String describir() {\n        return "Libro: " + titulo;\n    }\n}',
    detail: 'Si creas new Libro("Aprende Java"), el método describir() de esa instancia devuelve Libro: Aprende Java.',
    sources: [['dev.java — Classes and Objects', 'https://dev.java/learn/classes-objects/']],
  },
  {
    title: 'JavaScript y TypeScript',
    topics: ['javascript', 'typescript'],
    needsAllTopics: true,
    terms: ['diferencia', 'diferencias', 'diferencian', 'comparar', 'comparacion', 'vs', 'cual'],
    summary: 'JavaScript puede ejecutarse en el navegador. TypeScript amplía JavaScript con un sistema de tipos que detecta errores antes de ejecutar el programa. Habitualmente se convierte a JavaScript para ejecutarlo.',
    code: 'function saludar(nombre: string): string {\n  return "Hola, " + nombre;\n}',
    detail: 'TypeScript comprueba que nombre sea una cadena. Al generar JavaScript se eliminan las anotaciones de tipos.',
    sources: [['Manual de TypeScript', 'https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html']],
  },
  {
    title: 'Funciones en Python',
    topics: ['python'],
    terms: ['funcion', 'funciones', 'def', 'return', 'parametro', 'parametros', 'argumentos', 'lambda'],
    summary: 'Una función agrupa código reutilizable. Usa def para declararla y return para devolver un resultado al código que la llamó.',
    code: 'def paginas_pendientes(total, leidas):\n    return total - leidas\n\nprint(paginas_pendientes(180, 65))  # 115',
    detail: 'total y leidas son parámetros. Al invocar la función, los argumentos 180 y 65 ocupan sus posiciones en ese orden.',
    sources: [['Tutorial de Python — Definir funciones', 'https://docs.python.org/es/3/tutorial/controlflow.html#defining-functions']],
  },
  {
    title: 'Bucles en Python',
    topics: ['python'],
    terms: ['for', 'while', 'bucle', 'bucles', 'ciclo', 'ciclos', 'range', 'iterar', 'recorrer'],
    summary: 'Usa for cuando quieras recorrer elementos de una colección. Usa while para repetir una acción mientras una condición se cumpla.',
    code: 'for numero in range(1, 4):\n    print(numero)  # 1, 2 y 3',
    detail: 'range incluye el inicio y excluye el final. En cada vuelta, numero toma el siguiente valor.',
    sources: [['Tutorial de Python — La sentencia for', 'https://docs.python.org/es/3/tutorial/controlflow.html#for-statements']],
  },
  {
    title: 'Listas en Python',
    topics: ['python'],
    terms: ['lista', 'listas', 'append', 'pop', 'sort', 'sorted'],
    summary: 'Una lista guarda elementos en orden. Puedes acceder a ellos por índice, cambiar su contenido y agregar nuevos elementos.',
    code: 'frutas = ["pera", "mango"]\nfrutas.append("uva")\nprint(frutas[0])  # pera',
    detail: 'append añade un elemento al final de la lista. El índice 0 corresponde al primer elemento.',
    sources: [['Tutorial de Python — Listas', 'https://docs.python.org/es/3/tutorial/datastructures.html#more-on-lists']],
  },
  {
    title: 'Diccionarios en Python',
    topics: ['python'],
    terms: ['diccionario', 'diccionarios', 'dict', 'clave valor', 'key value'],
    summary: 'Un diccionario asocia claves únicas con valores. Puedes consultar un valor con su clave y usar get para indicar un valor de respaldo.',
    code: 'curso = {"tema": "Python"}\nprint(curso["tema"])  # Python\nprint(curso.get("nivel", "inicial"))  # inicial',
    detail: 'get devuelve el valor de la clave si existe o el valor de respaldo si falta.',
    sources: [['Tutorial de Python — Diccionarios', 'https://docs.python.org/es/3/tutorial/datastructures.html#dictionaries']],
  },
  {
    title: 'Excepciones en Python',
    topics: ['python'],
    terms: ['try except', 'excepcion', 'excepciones', 'valueerror', 'manejar errores'],
    summary: 'Usa try y except para gestionar errores que puedes prever. Captura el tipo de excepción concreto para que otros fallos sigan siendo visibles.',
    code: 'try:\n    paginas = int("diez")\nexcept ValueError:\n    print("Escribe un número entero")',
    detail: 'int lanza ValueError cuando la cadena no representa un entero. Python entonces ejecuta el bloque except.',
    sources: [['Tutorial de Python — Manejo de excepciones', 'https://docs.python.org/es/3/tutorial/errors.html#handling-exceptions']],
  },
  {
    title: 'Arreglos en JavaScript',
    topics: ['javascript', 'typescript'],
    terms: ['arreglo', 'arreglos', 'array', 'arrays', 'map', 'array map', 'array prototype map', 'filter', 'reduce', 'foreach'],
    summary: 'Un arreglo guarda una secuencia de valores. map transforma cada elemento, filter selecciona los que cumplen una condición y reduce combina valores en un resultado.',
    code: 'const numeros = [2, 3, 4];\nconsole.log(numeros.map(n => n * 2)); // [4, 6, 8]\nconsole.log(numeros.filter(n => n > 2)); // [3, 4]',
    detail: 'map conserva la cantidad de elementos. filter puede devolver menos elementos. Ambos crean un arreglo nuevo. Map, con mayúscula, es una estructura de clave y valor.',
    sources: [
      ['MDN — Array.prototype.map()', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map'],
      ['MDN — Array', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array'],
    ],
  },
  {
    title: 'Promesas y async/await en JavaScript',
    topics: ['javascript', 'typescript', 'nodejs'],
    terms: ['promesa', 'promesas', 'promise', 'promises', 'await', 'async', 'asincrono', 'asincronas', 'asincronia'],
    summary: 'Una promesa representa una operación que puede completarse o fallar más adelante. await espera su resultado dentro de una función async sin bloquear la ejecución del resto del programa.',
    code: 'async function mostrar() {\n  const mensaje = await Promise.resolve("Listo");\n  console.log(mensaje);\n}\nmostrar();',
    detail: 'Una función async devuelve una promesa. Si la promesa esperada se rechaza, puedes capturar el error con try/catch.',
    sources: [['MDN — Uso de promesas', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises']],
  },
  {
    title: 'Alineación con Flexbox',
    topics: ['css', 'html'],
    terms: ['flexbox', 'display flex', 'centrar', 'justify content', 'align items'],
    summary: 'Flexbox organiza elementos a lo largo de un eje principal. Puedes usar justify-content y align-items para centrar el contenido en ambos ejes.',
    code: '.contenedor {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 12rem;\n}',
    detail: 'El espacio disponible en el contenedor permite apreciar el centrado vertical.',
    sources: [['MDN — Flexbox', 'https://developer.mozilla.org/es/docs/Learn_web_development/Core/CSS_layout/Flexbox']],
  },
  {
    title: 'Cuadrículas con CSS Grid',
    topics: ['css', 'html'],
    terms: ['grid', 'cuadricula', 'grid template columns'],
    summary: 'CSS Grid organiza elementos en filas y columnas. grid-template-columns define el número de columnas y cuánto espacio ocupa cada una.',
    code: '.tarjetas {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}',
    detail: 'Las dos columnas reparten el espacio sobrante. gap fija la separación entre las celdas.',
    sources: [['MDN — CSS Grid Layout', 'https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout']],
  },
  {
    title: 'JOIN en SQL',
    topics: ['sql'],
    terms: ['join', 'joins', 'unir tablas', 'inner join', 'left join'],
    summary: 'JOIN combina filas de dos tablas según una condición. INNER JOIN conserva solo filas que tienen coincidencia. LEFT JOIN conserva además todas las filas de la tabla de la izquierda.',
    code: 'SELECT c.nombre, p.total\nFROM clientes AS c\nLEFT JOIN pedidos AS p ON p.cliente_id = c.id;',
    detail: 'Cada cliente aparece aunque no tenga pedidos. En ese caso, p.total viene como NULL.',
    sources: [['PostgreSQL — Joins Between Tables', 'https://www.postgresql.org/docs/current/tutorial-join.html']],
  },
  {
    title: 'Ramas en Git',
    topics: ['git'],
    terms: ['rama', 'ramas', 'branch', 'switch', 'merge', 'fusionar'],
    summary: 'Una rama es una referencia móvil a un commit. Permite trabajar en un cambio de manera independiente y después integrarlo con merge.',
    code: 'git switch -c mejora-documentacion',
    detail: 'switch -c crea la rama desde el commit actual y la deja activa. Tus siguientes commits harán avanzar esa rama.',
    sources: [['Git — git switch', 'https://git-scm.com/docs/git-switch']],
  },
  {
    title: 'Prevención de XSS',
    topics: ['ciberseguridad', 'javascript', 'html'],
    terms: ['xss', 'cross site scripting'],
    summary: 'Una vulnerabilidad XSS aparece cuando la aplicación interpreta datos no confiables como código de la página. Para mostrar texto proporcionado por el usuario, usa textContent y evita insertar ese contenido como HTML.',
    code: 'const mensaje = document.querySelector("#mensaje");\nmensaje.textContent = textoDelUsuario;',
    detail: 'Usa protección específica para cada contexto. Si tu aplicación admite HTML enriquecido, usa un sanitizador mantenido y una política CSP como capa adicional.',
    sources: [['OWASP — XSS Prevention Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html']],
  },
  {
    title: 'Listas enlazadas en C++',
    topics: ['cpp'],
    terms: ['listas enlazadas', 'lista enlazada', 'lista ligada', 'listas ligadas', 'linked list', 'std list', 'forward list'],
    summary: 'Cada nodo de una lista enlazada guarda un dato y un enlace al siguiente. std::list es una lista doblemente enlazada que también permite recorrer los elementos hacia atrás.',
    code: '#include <list>\n#include <iostream>\n\nint main() {\n    std::list<int> numeros{2, 3};\n    numeros.push_front(1);\n    for (int numero : numeros) std::cout << numero << " ";\n}',
    detail: 'push_front inserta el nuevo elemento al principio. El bucle recorre la lista en orden y muestra 1 2 3.',
    sources: [['Microsoft Learn — Clase list', 'https://learn.microsoft.com/es-es/cpp/standard-library/list-class?view=msvc-170']],
  },
];

const aliases = {
  c: ['lenguaje c', 'programacion en c'],
  cpp: ['cpp', 'cplusplus'],
  csharp: ['csharp', 'c sharp'],
  go: ['golang', 'lenguaje go', 'programacion en go'],
  html: ['html5'],
  css: ['css3'],
  javascript: ['js', 'ecmascript', 'javascrip', 'javascipt'],
  typescript: ['ts'],
  nodejs: ['nodejs', 'node'],
  nextjs: ['nextjs'],
  sql: ['postgresql', 'mysql', 'sqlite'],
  ciberseguridad: ['seguridad web', 'seguridad informatica', 'owasp'],
};

function normalizeQuery(value) {
  return value.toLowerCase().normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\bc\+\+/g, 'cplusplus').replace(/\bc#/g, 'csharp')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
    .replace(/\bjava script\b/g, 'javascript')
    .replace(/\b(node|next) js\b/g, '$1js');
}

const examplePrompt = /^(?:(?:dame|dime|muestra|muestrame|pon|ponme|quiero|necesito|puedes darme|puedes mostrarme) )?(?:(?:un|unos|algunos|otros|varios|dos|tres) )?ejemplos?(?: (?:de|en|con|sobre))?(?: |$)|^(?:show me |give me )?(?:some |an )?examples?(?: (?:of|in|with))?(?: |$)/;
const topicPrompt = /^(?:que es|que significa|como funciona|para que sirve|explica(?:me)?|define|introduccion a|quiero aprender(?: sobre)?|hablame de|what is|documentacion(?: de| sobre)?|referencias?(?: de| sobre)?|docs(?: de| for)?) /;

function matchQuery(question, previous) {
  const query = normalizeQuery(question.replace(/(?<![.\p{L}\p{N}_])Map\b/gu, 'Map objeto'))
    .replace(/ por favor$/, '');
  const has = term => ` ${query} `.includes(` ${normalizeQuery(term)} `);
  const target = query.replace(examplePrompt, '').replace(topicPrompt, '');
  const wantsExamples = examplePrompt.test(query);
  const topics = technologyCards.filter(card => {
    if (card.id === 'c' || card.id === 'go') {
      return target === normalizeQuery(card.title) || aliases[card.id].some(has);
    }
    return [card.title, ...(aliases[card.id] ?? [])].some(has);
  });
  const ids = topics.map(card => card.id);
  const ranked = conceptCards
    .filter(card => card.needsAllTopics
      ? card.topics.every(topic => ids.includes(topic))
      : !ids.length || card.topics.some(topic => ids.includes(topic)))
    .map(card => ({
      card,
      score: card.terms.reduce((best, term) => {
        const words = normalizeQuery(term);
        if (!has(words)) return best;
        return Math.max(best, 2 * words.split(' ').length + (target === words ? 1 : 0));
      }, 0),
    }))
    .filter(match => match.score > 0)
    .map(match => ({
      ...match,
      score: match.score + (!ids.length && match.card.topics.some(topic => previous?.topics?.includes(topic)) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);

  if (ranked.length) {
    // Evita elegir arbitrariamente cuando una pregunta coincide igual con dos fichas.
    if (ranked[1]?.score === ranked[0].score) {
      const [first, second] = ranked.map(match => match.card);
      return {
        kind: 'clarify',
        summary: `¿Quieres saber sobre ${first.title} o sobre ${second.title}?`,
        sources: [first.sources[0], second.sources[0]],
      };
    }
    return ranked[0].card;
  }
  if (!target && wantsExamples && previous) {
    if (previous.code) return { ...previous, summary: 'Este ejemplo muestra el concepto de la ficha anterior.' };
    const topic = technologyCards.find(card => previous.topics?.length === 1 && previous.topics[0] === card.id);
    if (topic) return { ...topic, topics: previous.topics };
  }
  if (ids.length === 1) {
    const card = topics[0];
    const names = [card.title, ...(aliases[card.id] ?? [])].map(normalizeQuery);
    if (names.includes(target)) return { ...card, topics: ids };
  }
  if (/^(?:hola|buenas|buenos dias|buenas tardes|buenas noches)$/.test(query)) {
    return { summary: '¡Hola! Pregúntame sobre programación. Puedes empezar con «¿Cómo se usa JOIN en SQL?».' };
  }
  if (topics.length) {
    const related = conceptCards.filter(card => card.topics.some(topic => ids.includes(topic)))
      .slice(0, 3).map(card => card.title);
    return {
      title: `Documentación de ${topics.map(card => card.title).join(' y ')}`,
      summary: 'No encontré una ficha para el concepto que pediste. Puedes buscarlo en la documentación de la tecnología.',
      detail: related.length ? `También puedes preguntar por ${related.join(', ')}.` : '',
      sources: topics.slice(0, 3).flatMap(card => card.sources),
      topics: ids,
    };
  }
  return {
    kind: 'unanswered',
    summary: 'No encontré una ficha para esa pregunta. Prueba con el nombre de la tecnología y el concepto, por ejemplo «¿Cómo funcionan las promesas en JavaScript?».',
  };
}
