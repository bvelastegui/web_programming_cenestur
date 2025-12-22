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
    path: '/blog/arreglos-javascript.html',
    publish_date: new Date(2025, 12, 19),
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
    publish_date: new Date(2025, 12, 15),
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
    publish_date: new Date(2025, 12, 14),
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
    publish_date: new Date(2025, 12, 13),
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
]

export default function useArticles () {
  function getByTag (tag) {
    return articles.filter(article => article.tags.includes(tag))
  }

  function getByModule (module) {
    return articles.filter(article => article.module === module)
  }

  function getTags () {
    const carry = [];
    articles.forEach((article) => {
      article.tags.forEach(tag => {
        if (!carry.includes(tag)) {
          carry.push(tag)
        }
      })
    })

    return carry;
  }

  function getPaginated (limit = 5, offset = 0) {
    return articles.sort((a, b) => a.publish_date < b.publish_date ? 1 : -1).
      slice(offset, limit)
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

  return {
    getByTag,
    getByModule,
    getTags,
    getModules,
    getPaginated,
    getLatestArticle,
  }
};