const notas = [
  10,
  8.90,
  9.66,
  6.5,
  9.51,
  7.8,
  8,
]

const notasMat = [10, 8, 7.7, 9.2];
const notasDes = [6.5, 8.76, 9.56, 10];

// la función concat une dos o más arreglos, no modifica el arreglo original
// y retorna un nuevo arreglo
const notasActualizadas = notas.concat(notasMat, notasDes);

console.log({ notas }, { notasActualizadas });