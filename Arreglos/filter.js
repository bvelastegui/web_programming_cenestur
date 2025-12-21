let numeros = [7, 8, 9, 10, 25, 26, 30, 43]

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] > 10) console.log(numeros[i])
}

// no modifica el arreglo original, retorna un nuevo arreglo
let numGreaterThan20 = numeros.filter(numero => numero > 20)

console.log(numGreaterThan20)