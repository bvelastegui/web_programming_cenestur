import useArticles from '/js/data/articles.js?v=251222.1'

const { search } = useArticles()

function createSearchModal () {
  if (document.getElementById('searchModal')) return

  const modalHTML = `
    <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="searchModalLabel">
              <i class="bi bi-search"></i> Resultados de búsqueda
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted" id="search-query-info"></p>
            <div id="search-results-list"></div>
            <div id="no-results" class="text-center py-4 d-none">
              <i class="bi bi-emoji-frown fs-1 text-muted"></i>
              <p class="mt-2 text-muted">No se encontraron artículos que coincidan con tu búsqueda.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', modalHTML)
}

function performSearch (query) {
  createSearchModal()

  const results = search(query)
  const resultsContainer = document.getElementById('search-results-list')
  const noResults = document.getElementById('no-results')
  const queryInfo = document.getElementById('search-query-info')

  resultsContainer.innerHTML = ''
  queryInfo.innerHTML = `Buscando: <strong>"${query}"</strong> - ${results.length} resultado(s)`

  if (results.length === 0) {
    noResults.classList.remove('d-none')
  } else {
    noResults.classList.add('d-none')

    results.forEach(article => {
      const resultItem = document.createElement('div')
      resultItem.classList.add('card', 'mb-3')
      resultItem.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${article.image_path}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${article.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.resume}</p>
              <p class="card-text">
                <small class="text-muted">
                  <i class="bi bi-calendar3"></i> ${article.publish_date.toDateString()}
                </small>
              </p>
              <div class="mb-2">
                ${article.tags.map(tag => `<span class="badge bg-success me-1">${tag}</span>`).join('')}
              </div>
              <a href="${article.path}" class="btn btn-primary btn-sm">Leer artículo <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      `
      resultsContainer.appendChild(resultItem)
    })
  }

  const searchModal = new bootstrap.Modal(document.getElementById('searchModal'))
  searchModal.show()
}

function setupSearch () {
  const searchForm = document.getElementById('search-form')
  const searchInput = document.getElementById('search-input')

  if (!searchForm || !searchInput) return

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = searchInput.value.trim()
    if (query) {
      performSearch(query)
    }
  })
}

function init () {
  setupSearch()
}

document.addEventListener('DOMContentLoaded', init)

export { performSearch, setupSearch }
