const notas = [
  10,
  8.90,
  9.66,
  6.5,
  9.51,
  7.8,
  8,
]

// CRUD

// Create
notas.push(9.55); // creamos un nuevo elemento al final del arreglo
notas.unshift(7.77); // creamos un nuevo elemento al principio del arreglo

// Read
console.log(notas); // leemos todo el arreglo
console.log(notas[3]); // leemos el 3er elemento del arreglo

// Update
for (let i = 0; i < notas.length; i++) {
  if (notas[i] > 9.5) {
    notas[i] = 10; // se actualiza las notas mayores a 9.5
  }
}

// Delete
notas.pop() // elimina el último elemento del arreglo
notas.shift() // elimina el primer elemento del arreglo
notas.splice(2, 1) // elimina un elemento empezando en la segunda posición

// Notas mayores a 7
const notasGreaterThan7 = notas.filter(numero => numero > 7)
console.log(notasGreaterThan7)

// Utilizamos la función sort para ordenar de mayor a menor
// y con la función at obtenemos el primer elemento
// el cual sería el mejor promedio
const notaMasAlta = notas.sort((a, b) => a < b ? 1 : -1).at(0);
console.log(notaMasAlta);