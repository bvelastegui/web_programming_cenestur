/**
 * Dark Mode Toggle - Bootstrap Style
 * Gestiona el cambio de tema entre claro, oscuro y auto
 */

const THEME_KEY = 'theme'
const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'
const AUTO_THEME = 'auto'

function getStoredTheme () {
  return localStorage.getItem(THEME_KEY)
}

function setStoredTheme (theme) {
  localStorage.setItem(THEME_KEY, theme)
}

function getPreferredTheme () {
  const storedTheme = getStoredTheme()
  if (storedTheme) {
    return storedTheme
  }
  return AUTO_THEME
}

function getSystemTheme () {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME
}

function setTheme (theme) {
  const effectiveTheme = theme === AUTO_THEME ? getSystemTheme() : theme
  document.documentElement.setAttribute('data-bs-theme', effectiveTheme)
  updateActiveState(theme)
}

function updateActiveState (theme) {
  // Actualizar el icono del botón principal
  const themeIcon = document.getElementById('theme-icon')
  if (themeIcon) {
    themeIcon.className = getIconClass(theme)
  }

  // Actualizar el estado activo en el dropdown
  const dropdownItems = document.querySelectorAll('[data-bs-theme-value]')
  dropdownItems.forEach(item => {
    const isActive = item.getAttribute('data-bs-theme-value') === theme
    item.classList.toggle('active', isActive)
    item.setAttribute('aria-pressed', isActive)

    // Actualizar el icono de check
    const checkIcon = item.querySelector('.bi-check2')
    if (checkIcon) {
      checkIcon.style.opacity = isActive ? '1' : '0'
    }
  })
}

function getIconClass (theme) {
  switch (theme) {
    case DARK_THEME:
      return 'bi bi-moon-stars-fill'
    case LIGHT_THEME:
      return 'bi bi-sun-fill'
    case AUTO_THEME:
    default:
      return 'bi bi-circle-half'
  }
}

function handleThemeChange (theme) {
  setStoredTheme(theme)
  setTheme(theme)
}

function initTheme () {
  // Aplicar tema guardado o preferido
  const theme = getPreferredTheme()
  setTheme(theme)

  // Escuchar cambios en preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme === AUTO_THEME || !storedTheme) {
      setTheme(AUTO_THEME)
    }
  })

  // Configurar los items del dropdown
  const dropdownItems = document.querySelectorAll('[data-bs-theme-value]')
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
      const theme = item.getAttribute('data-bs-theme-value')
      handleThemeChange(theme)
    })
  })
}

// Aplicar tema lo antes posible para evitar parpadeos
const earlyTheme = getPreferredTheme()
const effectiveEarlyTheme = earlyTheme === AUTO_THEME ? getSystemTheme() : earlyTheme
document.documentElement.setAttribute('data-bs-theme', effectiveEarlyTheme)

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTheme)

export { handleThemeChange, setTheme, getPreferredTheme }
