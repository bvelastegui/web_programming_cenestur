import useArticles from '/data/articles.js?v=20251221'
import { chunks } from '/js/helpers.js'
import { performSearch } from '/js/search.js'

const { getPaginated, getModules, getTags, getTotalCount } = useArticles()

// Estado del scroll infinito
const infiniteScrollState = {
  currentOffset: 1, // Empezamos en 1 porque el primer artículo se muestra como destacado
  perPage: 4,
  isLoading: false,
  hasMore: true
}

function loadModules () {
  const modules = getModules()
  const listOfModules = document.getElementById('list-of-modules')
  modules.forEach(module => {
    const li = document.createElement('li')
    li.innerHTML = `
<a class="dropdown-item" href="#">
  ${module}
</a>`
    listOfModules.appendChild(li)
  })
}

function loadLastArticle () {
  const lastArticle = getPaginated(1, 0)[0]

  const image = document.querySelector('#last-post .card-img-top.d-none')
  image.src = lastArticle.image_path
  image.classList.remove('d-none')
  document.querySelector('#last-post .card-img-top.placeholder').remove()

  const title = document.querySelector('#last-post .card-title')
  title.innerHTML = lastArticle.title

  const publishDate = document.querySelector('#last-post .post-publish-date')
  publishDate.innerHTML = `
<i class="bi bi-calendar3 me-1"></i>
${lastArticle.publish_date.toDateString()}
`

  const tagList = document.querySelector('#last-post .post-tags')
  tagList.innerHTML = ''
  lastArticle.tags.forEach(tag => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('badge', 'text-bg-success')
    tagEl.innerText = tag
    tagList.appendChild(tagEl)
  })

  const description = document.querySelector('#last-post .card-text')
  description.innerText = lastArticle.resume

  const postLink = document.querySelector('#last-post .post-link')
  postLink.href = lastArticle.path
}

function loadMoreArticles () {
  if (infiniteScrollState.isLoading || !infiniteScrollState.hasMore) return

  infiniteScrollState.isLoading = true
  const loadingIndicator = document.getElementById('loading-indicator')
  loadingIndicator.classList.remove('d-none')

  // Simulamos un pequeño delay para mostrar el loading
  setTimeout(() => {
    const articles = getPaginated(infiniteScrollState.perPage, infiniteScrollState.currentOffset)

    if (articles.length === 0) {
      infiniteScrollState.hasMore = false
      loadingIndicator.classList.add('d-none')
      infiniteScrollState.isLoading = false
      return
    }

    const postGridContainer = document.getElementById('post-grid')
    const cardTemplate = document.getElementById('blog-post-card')

    const rows = chunks(articles, 2)
    rows.forEach(rowArticles => {
      const row = document.createElement('div')
      row.classList.add('row')
      rowArticles.forEach(article => {
        const col = document.createElement('div')
        col.classList.add('col-6')
        const card = document.importNode(cardTemplate.content, true)
        card.querySelector('.card-title').innerText = article.title
        card.querySelector('.card-img-top').src = article.image_path
        card.querySelector(
          '.post-publish-date').innerHTML = `<i class="bi bi-calendar3 me-1"></i>${article.publish_date.toDateString()}`
        card.querySelector('.post-resume').innerText = article.resume
        card.querySelector('.post-link').href = article.path
        const tagsRender = []
        article.tags.forEach(tag => {
          tagsRender.push(`<span class="badge bg-success me-1">${tag}</span>`)
        })
        card.querySelector('.post-tags').innerHTML = tagsRender.join('')
        col.appendChild(card)
        row.appendChild(col)
      })
      postGridContainer.appendChild(row)
    })

    infiniteScrollState.currentOffset += articles.length
    infiniteScrollState.isLoading = false
    loadingIndicator.classList.add('d-none')

    // Verificar si hay más artículos (restamos 1 por el artículo destacado)
    if (infiniteScrollState.currentOffset >= getTotalCount()) {
      infiniteScrollState.hasMore = false
    }
  }, 300)
}

function setupInfiniteScroll () {
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    // Cargar más cuando estemos cerca del final (100px antes)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreArticles()
    }
  })
}

function loadTags () {
  const tags = getTags()

  const globalTagList = document.getElementById('global-tags-list')
  if (!globalTagList) return

  tags.forEach(tag => {
    const tagEl = document.createElement('a')
    tagEl.href = '#'
    tagEl.innerText = tag
    tagEl.addEventListener('click', (e) => {
      e.preventDefault()
      performSearch(tag)
    })
    globalTagList.appendChild(tagEl)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadLastArticle()
  loadMoreArticles() // Carga inicial de artículos
  loadTags()
  setupInfiniteScroll()
})