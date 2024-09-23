const fs = require("fs");
const readline = require("readline");

const preguntaCantidadDatos = "Escribe la cantidad de datos que deseas ordenar (800, 8000, 80000): ";
const preguntaTipoOrdenamiento = `Que metodo deseas probar:  \n 1. ordenamiento por selección. \n 2. ordenamiento por inserción. \n 3. ordenamiento por burbuja mejorada. \n 4. ordenamiento por mergesort. \n 5. ordenamiento por quicksort. \n`;

// Función de ordenamiento por selección
function ordenarBySeleccion(arreglo) {
  for (let i = 0; i < arreglo.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arreglo.length; j++) {
      if (arreglo[j] < arreglo[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arreglo[i], arreglo[minIndex]] = [arreglo[minIndex], arreglo[i]];
    }
  }
  return arreglo;
}

// Función de ordenamiento por inserción
function ordenarByInsercion(arreglo) {
  for (let i = 1; i < arreglo.length; i++) {
    let llave = arreglo[i];
    let j = i - 1;

    // Mueve los elementos del arreglo que son mayores que la llave a una posición adelante de su posición actual
    while (j >= 0 && arreglo[j] > llave) {
      arreglo[j + 1] = arreglo[j];
      j = j - 1;
    }
    arreglo[j + 1] = llave;
  }
  return arreglo;
}

// Función de ordenamiento burbuja mejorada
function ordenarByBurbujaMejorada(arreglo) {
  let n = arreglo.length;
  let esIntercambiado;

  do {
    esIntercambiado = false;
    for (let i = 0; i < n - 1; i++) {
      if (arreglo[i] > arreglo[i + 1]) {
        // Intercambiar los elementos
        [arreglo[i], arreglo[i + 1]] = [arreglo[i + 1], arreglo[i]];
        esIntercambiado = true;
      }
    }
    // Reducir el rango de comparación ya que el último elemento está en su lugar correcto
    n--;
  } while (esIntercambiado);

  return arreglo;
}

// Funciones de ordenamiento mergesort
function ordenarByMergesort(arreglo) {
  if (arreglo.length <= 1) {
    return arreglo;
  }

  const mitadArreglo = Math.floor(arreglo.length / 2);
  const arregloIzq = arreglo.slice(0, mitadArreglo);
  const arregloDer = arreglo.slice(mitadArreglo);

  return combinarMergesort(ordenarByMergesort(arregloIzq), ordenarByMergesort(arregloDer));
}

function combinarMergesort(arregloIzq, arregloDer) {
  let result = [];
  let izqIndex = 0;
  let derIndex = 0;

  while (izqIndex < arregloIzq.length && derIndex < arregloDer.length) {
    if (arregloIzq[izqIndex] < arregloDer[derIndex]) {
      result.push(arregloIzq[izqIndex]);
      izqIndex++;
    } else {
      result.push(arregloDer[derIndex]);
      derIndex++;
    }
  }

  return result.concat(arregloIzq.slice(izqIndex)).concat(arregloDer.slice(derIndex));
}

// Función de ordenamiento quicksort
function ordenarByQuicksort(arreglo) {
  if (arreglo.length <= 1) {
    return arreglo;
  }

  const pivote = arreglo[Math.floor(arreglo.length / 2)];
  const arregloIzq = [];
  const arregloDer = [];

  for (let i = 0; i < arreglo.length; i++) {
    if (i === Math.floor(arreglo.length / 2)) continue;
    if (arreglo[i] < pivote) {
      arregloIzq.push(arreglo[i]);
    } else {
      arregloDer.push(arreglo[i]);
    }
  }

  return [...ordenarByQuicksort(arregloIzq), pivote, ...ordenarByQuicksort(arregloDer)];
}

function ejecutarOrdenamientos(cantidadDatos, tipoOrden) {
  console.time("Tiempo de ejecución");

  // Leer el archivo de entrada y convertirlo en un arreglo de números y ejecutar las diferentes funciones de ordenamiento.
  fs.readFile(`Entrada-${cantidadDatos}.txt`, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    // Convertir el contenido del archivo en un arreglo de números
    const numeros = data.split("\n").map(Number);

    if (Number(tipoOrden) === 1) {
      // Ordenar el arreglo de números por selección
      const numerosOrdenadosBySeleccion = ordenarBySeleccion(numeros);
      console.log("Números ordenados por selección: " + JSON.stringify(numerosOrdenadosBySeleccion));
    } else if (Number(tipoOrden) === 2) {
      // Ordenar el arreglo de números por inserción
      const numerosOrdenadosByInsercion = ordenarByInsercion(numeros);
      console.log("Números ordenados por inserción: " + JSON.stringify(numerosOrdenadosByInsercion));
    } else if (Number(tipoOrden) === 3) {
      // Ordenar el arreglo de números por burbuja mejorada
      const numerosOrdenadosByBurbujaMejorada = ordenarByBurbujaMejorada(numeros);
      console.log("Números ordenados por burbuja mejorada: " + JSON.stringify(numerosOrdenadosByBurbujaMejorada));
    } else if (Number(tipoOrden) === 4) {
      // Ordenar el arreglo de números por mergesort
      const numerosOrdenadosByMergesort = ordenarByMergesort(numeros);
      console.log("Números ordenados por mergesort: " + JSON.stringify(numerosOrdenadosByMergesort));
    } else if (Number(tipoOrden) === 5) {
      // Ordenar el arreglo de números por quicksort
      const numerosOrdenadosByQuicksort = ordenarByQuicksort(numeros);
      console.log("Números ordenados por quicksort: " + JSON.stringify(numerosOrdenadosByQuicksort));
    }

    // Validacion tiempo final de ejecución del codigo.
    console.timeEnd("Tiempo de ejecución");
  });
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function preguntar(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

async function main() {
  const cantidadDatos = await preguntar(preguntaCantidadDatos);
  const tipoOrdenamiento = await preguntar(preguntaTipoOrdenamiento);

  ejecutarOrdenamientos(cantidadDatos, tipoOrdenamiento);
  rl.close();
}

main();
