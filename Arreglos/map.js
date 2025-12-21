let numeros = [7, 8, 9, 10, 25, 26, 30, 43]

// no modifica el arreglo original, retorna un nuevo arreglo
let numWhit12Percent = numeros.map((numero) => numero + (numero * 0.12));
console.log(numWhit12Percent);