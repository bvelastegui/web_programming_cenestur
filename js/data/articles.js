/**
 * @typedef Article
 * @type {object}
 * @property {string} path
 * @property {string} title
 * @property {Date} publish_date
 * @property {string} resume
 * @property {string} module
 * @property {string} image_path
 * @property {string[]} tags
 */

/**
 * @type {Article[]}
 */
const articles = [
  {
    path: '/blog/introduccion-python.html',
    publish_date: new Date("2026-01-06T00:00"),
    title: 'Introducción a Python: Conceptos Básicos y Fundamentos',
    module: 'Unidad 2',
    resume: 'Aprende los fundamentos de Python desde cero: sintaxis básica, operadores aritméticos, lógicos y de comparación, condicionales if-elif-else y bucles for y while. Tutorial completo para principiantes.',
    image_path: '/images/python-basics.png',
    tags: [
      'python',
      'operadores',
      'condicionales',
      'loops',
    ],
  },
  {
    path: '/blog/tienda-filtrado-dinamico.html',
    publish_date: new Date("2026-01-05T00:00"),
    title: 'Tienda en Línea con Filtrado Dinámico usando JavaScript',
    module: 'Unidad 1',
    resume: 'Aprende a crear una tienda en línea funcional con JavaScript usando map, filter y forEach para implementar búsqueda dinámica y filtrado de productos. Proyecto práctico con interfaz moderna y responsiva.',
    image_path: '/images/store.png',
    tags: [
      'javascript',
      'arrays',
      'map',
      'filter',
      'dom',
    ],
  },
  {
    path: '/blog/arreglos-javascript.html',
    publish_date: new Date("2025-12-19T00:00"),
    title: 'Arreglos en JavaScript: Métodos y Operaciones CRUD',
    module: 'Unidad 1',
    resume: 'Los arreglos son una de las estructuras de datos más fundamentales en JavaScript. Aprende operaciones CRUD, métodos de iteración (forEach, map, filter) y métodos útiles como join, concat y slice.',
    image_path: '/images/arreglos-javascript.png',
    tags: [
      'javascript',
      'arrays',
      'crud',
    ],
  },
  {
    path: '/blog/the-cats-api.html',
    publish_date: new Date("2025-12-15T00:00"),
    title: 'Consumiendo APIs con JavaScript: The Cat API',
    module: 'Unidad 1',
    resume: 'Una de las habilidades más importantes en el desarrollo web moderno es saber consumir APIs externas. En este artículo aprenderemos a usar fetch y async/await para obtener imágenes aleatorias de gatos desde The Cat API.',
    image_path: '/images/the-cats-api.png',
    tags: [
      'javascript',
      'api',
      'fetch',
      'async-await',
    ],
  },
  {
    path: '/blog/formulario-dom-javascript.html',
    publish_date: new Date("2025-12-14T00:00"),
    title: 'Manipulando Formularios con JavaScript y el DOM',
    module: 'Unidad 1',
    resume: 'Después de aprender a crear formularios con HTML y Bootstrap, el siguiente paso es darles vida con JavaScript. En este artículo aprenderemos a manipular el DOM para crear un formulario de operaciones matemáticas completamente interactivo.',
    image_path: '/images/formulario-dom-javascript.png',
    tags: [
      'javascript',
      'dom',
      'bootstrap',
      'formularios',
    ],
  },
  {
    path: '/blog/formulario-html-bootstrap.html',
    publish_date: new Date("2025-12-13T00:00"),
    title: 'Creando tu Primer Formulario Web con HTML5 y Bootstrap 5',
    module: 'Unidad 1',
    resume: 'Cuando empezamos en el mundo del desarrollo web, uno de los primeros retos que enfrentamos es crear formularios funcionales y visualmente atractivos. En este artículo, analizaremos paso a paso cómo construir un formulario de operaciones matemáticas utilizando HTML5 y Bootstrap 5.',
    image_path: '/images/formulario-html-bootstrap.png',
    tags: [
      'html',
      'css',
      'bootstrap',
      'formularios',
    ],
  },
  {
    path: '/blog/git-github.html',
    publish_date: new Date("2025-12-12T00:00"),
    title: 'Implementación de Git y GitHub: Guía Completa',
    module: 'Unidad 1',
    resume: 'Git es una herramienta fundamental en el flujo de trabajo de los desarrolladores. Aprende a instalar y configurar Git, crear una cuenta en GitHub, generar claves SSH y publicar tu primer repositorio.',
    image_path: '/images/git-github.png',
    tags: [
      'git',
      'github',
      'ssh',
    ],
  },
]

export default function useArticles () {
  function getByTag (tag) {
    return articles.filter(article => article.tags.includes(tag))
  }

  function getByModule (module) {
    return articles.filter(article => article.module === module)
  }

  function getTags () {
    const carry = []
    articles.forEach((article) => {
      article.tags.forEach(tag => {
        if (!carry.includes(tag)) {
          carry.push(tag)
        }
      })
    })

    return carry
  }

  function getPaginated (limit = 5, offset = 0) {
    return articles.sort((a, b) => a.publish_date < b.publish_date ? 1 : -1).
      slice(offset, offset + limit)
  }

  function getTotalCount () {
    return articles.length
  }

  function getModules () {
    return articles.reduce((carry, article) => {
      if (!carry.includes(article.module)) {
        carry.push(article.module)
      }

      return carry
    }, [])
  }

  function getLatestArticle () {
    return articles.pop()
  }

  function search (query) {
    if (!query || query.trim() === '') {
      return []
    }

    const normalizedQuery = query.toLowerCase().trim()

    return articles.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(normalizedQuery)
      const resumeMatch = article.resume.toLowerCase().includes(normalizedQuery)
      const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      const moduleMatch = article.module.toLowerCase().includes(normalizedQuery)

      return titleMatch || resumeMatch || tagsMatch || moduleMatch
    })
  }

  return {
    getByTag,
    getByModule,
    getTags,
    getModules,
    getPaginated,
    getLatestArticle,
    getTotalCount,
    search,
  }
};