async function obtenerDatos () {
  const data = await fetch('https://api.thecatapi.com/v1/images/search')
  const res = await data.json()

  const imagen = document.getElementById('imagen')
  imagen.src = res[0].url
}
