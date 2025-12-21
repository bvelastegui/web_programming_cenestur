let numeros = [1, 2, 3, 4, 5];
let frutas = ["Banana", "Apple", "Uva"]
// longitud o el tamano del array
console.log(frutas.length);
// leer un array Get o un Select
console.log(frutas[0]);

/*
CRUD
C reate
R read
U pdate
D delete
 */

//Modificar o Update
frutas[0] = "mango"
console.log(frutas);

// Metodos basicos
// agregar Create
frutas.push("Banana") // agrega un elemento al final
frutas.unshift("Pera"); /// Agregar un elemento pero al principio
console.log(frutas);

// Delete
frutas.pop() // Elimina el último elemento del array
frutas.shift() // Elimina el primer elemento del array
console.log(frutas);

// Eliminar o adicionar elementos en una posicion especifica
frutas.splice(1, 1);
console.log(frutas);
// adicionar
frutas.splice(1, 0, "Kiwi");
console.log(frutas);