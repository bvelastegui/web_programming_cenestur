const notas = [
  10,
  8.90,
  9.66,
  6.5,
  9.51,
  7.8,
  8,
]

// el método slice crea una copia superficial del arreglo,
// no modifica el arreglo original, los parámetros indican donde
// empieza y donde termina la copia, el nuevo arreglo no incluye el elemento
// que se encuentra en la posición que se pasa al parámetro fin
const notasMed = notas.slice(3, 5)

console.log(notas)
console.log(notasMed)
