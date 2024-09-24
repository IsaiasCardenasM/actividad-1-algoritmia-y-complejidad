const fs = require("fs");
const readline = require("readline");

const preguntaCantidadDatos = "Escribe la cantidad de datos que deseas ordenar (800, 8000, 80000): ";
const preguntaTipoOrdenamiento = `Que metodo deseas probar:  \n 1. ordenamiento por selección. \n 2. ordenamiento por inserción. \n 3. ordenamiento por burbuja mejorada. \n 4. ordenamiento por mergesort. \n 5. ordenamiento por quicksort. \n`;
const textoTipoMetodo = { 1: "selección", 2: "inserción", 3: "burbuja mejorada", 4: "mergesort", 5: "quicksort" };

// Función de ordenamiento por selección
function ordenarBySeleccion(arreglo) {
  // Recorre el arreglo hasta el penúltimo elemento
  for (let i = 0; i < arreglo.length - 1; i++) {
    // Asume que el elemento actual es el menor
    let minIndex = i;
    // Compara el elemento actual con los siguientes
    for (let j = i + 1; j < arreglo.length; j++) {
      // Si encuentra un elemento menor, actualiza minIndex
      if (arreglo[j] < arreglo[minIndex]) {
        minIndex = j;
      }
    }
    // Si minIndex ha cambiado, intercambia los elementos
    if (minIndex !== i) {
      [arreglo[i], arreglo[minIndex]] = [arreglo[minIndex], arreglo[i]];
    }
  }
  // Devuelve el arreglo ordenado
  return arreglo;
}

// Función de ordenamiento por inserción
function ordenarByInsercion(arreglo) {
  // Recorre el arreglo desde el segundo elemento
  for (let i = 1; i < arreglo.length; i++) {
    // Guarda el valor actual en una variable llave
    let llave = arreglo[i];
    // Inicializa j como el índice anterior a i
    let j = i - 1;

    // Mueve los elementos mayores que la llave una posición adelante
    while (j >= 0 && arreglo[j] > llave) {
      arreglo[j + 1] = arreglo[j];
      j = j - 1;
    }
    // Coloca la llave en su posición correcta
    arreglo[j + 1] = llave;
  }
  // Devuelve el arreglo ordenado
  return arreglo;
}

// Función de ordenamiento burbuja mejorada
function ordenarByBurbujaMejorada(arreglo) {
  // Obtiene la longitud del arreglo
  let n = arreglo.length;
  let esIntercambiado;

  // Repite el proceso mientras haya intercambios
  do {
    esIntercambiado = false;
    // Recorre el arreglo hasta el penúltimo elemento no ordenado
    for (let i = 0; i < n - 1; i++) {
      // Si el elemento actual es mayor que el siguiente, intercámbialos
      if (arreglo[i] > arreglo[i + 1]) {
        [arreglo[i], arreglo[i + 1]] = [arreglo[i + 1], arreglo[i]];
        esIntercambiado = true;
      }
    }
    // Reduce el rango de comparación
    n--;
  } while (esIntercambiado);

  // Devuelve el arreglo ordenado
  return arreglo;
}

// Funciones de ordenamiento mergesort
function ordenarByMergesort(arreglo) {
  // Si el arreglo tiene un solo elemento o está vacío, ya está ordenado
  if (arreglo.length <= 1) {
    return arreglo;
  }

  // Encuentra el punto medio del arreglo
  const mitadArreglo = Math.floor(arreglo.length / 2);
  // Divide el arreglo en dos mitades
  const arregloIzq = arreglo.slice(0, mitadArreglo);
  const arregloDer = arreglo.slice(mitadArreglo);

  // Ordena recursivamente ambas mitades y las combina
  return combinarMergesort(ordenarByMergesort(arregloIzq), ordenarByMergesort(arregloDer));
}

function combinarMergesort(arregloIzq, arregloDer) {
  let result = [];
  let izqIndex = 0;
  let derIndex = 0;

  // Combina los arreglos ordenados
  while (izqIndex < arregloIzq.length && derIndex < arregloDer.length) {
    if (arregloIzq[izqIndex] < arregloDer[derIndex]) {
      result.push(arregloIzq[izqIndex]);
      izqIndex++;
    } else {
      result.push(arregloDer[derIndex]);
      derIndex++;
    }
  }

  // Añade los elementos restantes de ambos arreglos
  return result.concat(arregloIzq.slice(izqIndex)).concat(arregloDer.slice(derIndex));
}

// Función de ordenamiento quicksort
function ordenarByQuicksort(arreglo) {
  // Si el arreglo tiene un solo elemento o está vacío, ya está ordenado
  if (arreglo.length <= 1) {
    return arreglo;
  }

  // Selecciona el pivote como el elemento del medio
  const pivote = arreglo[Math.floor(arreglo.length / 2)];
  const arregloIzq = [];
  const arregloDer = [];

  // Divide el arreglo en dos subarreglos
  for (let i = 0; i < arreglo.length; i++) {
    if (i === Math.floor(arreglo.length / 2)) continue;
    if (arreglo[i] < pivote) {
      arregloIzq.push(arreglo[i]);
    } else {
      arregloDer.push(arreglo[i]);
    }
  }

  // Ordena recursivamente ambos subarreglos y los combina con el pivote
  return [...ordenarByQuicksort(arregloIzq), pivote, ...ordenarByQuicksort(arregloDer)];
}

const metodosOrdenamiento = {
  1: ordenarBySeleccion,
  2: ordenarByInsercion,
  3: ordenarByBurbujaMejorada,
  4: ordenarByMergesort,
  5: ordenarByQuicksort,
};

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
    const tipo = Number(tipoOrden);

    const numerosOrdenados = metodosOrdenamiento[tipo](numeros);
    console.log(`Números ordenados por ${textoTipoMetodo[tipo]}: ${JSON.stringify(numerosOrdenados)}`);
    // Validacion tiempo final de ejecución del codigo.
    console.timeEnd("Tiempo de ejecución");
  });
}

// Crea una interfaz de lectura para la entrada estándar (teclado) y la salida estándar (consola)
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Función que realiza una pregunta al usuario y devuelve una promesa con la respuesta
function preguntar(pregunta) {
  return new Promise((resolve) => {
    // Hace una pregunta al usuario
    rl.question(pregunta, (respuesta) => {
      // Resuelve la promesa con la respuesta del usuario
      resolve(respuesta);
    });
  });
}

// Función que valida si la cantidad ingresada está permitida
function validarCantidad(cantidad) {
  // Define las cantidades permitidas
  const cantidadesPermitidas = [800, 8000, 80000];
  // Verifica si la cantidad ingresada está en el arreglo de cantidades permitidas
  return cantidadesPermitidas.includes(parseInt(cantidad));
}

// Función que valida si el tipo de ordenamiento ingresado está permitido
function validarTipoOrdenamiento(tipo) {
  // Define los tipos de ordenamiento permitidos
  const tiposPermitidos = ["1", "2", "3", "4", "5"];
  // Verifica si el tipo ingresado está en el arreglo de tipos permitidos
  return tiposPermitidos.includes(tipo);
}

// Función principal que ejecuta el flujo del programa
async function main() {
  let cantidadDatos;
  // Bucle que pregunta por la cantidad de datos hasta que se ingrese una cantidad permitida
  do {
    // Pregunta al usuario por la cantidad de datos
    cantidadDatos = await preguntar(preguntaCantidadDatos);
    // Si la cantidad no es permitida, muestra un mensaje de error
    if (!validarCantidad(cantidadDatos)) {
      console.log("Cantidad no permitida. Por favor, ingresa una de las siguientes opciones: 800, 8000, 80000.");
    }
  } while (!validarCantidad(cantidadDatos)); // Repite mientras la cantidad no sea permitida

  let tipoOrdenamiento;
  // Bucle que pregunta por el tipo de ordenamiento hasta que se ingrese un tipo permitido
  do {
    // Pregunta al usuario por el tipo de ordenamiento
    tipoOrdenamiento = await preguntar(preguntaTipoOrdenamiento);
    // Si el tipo no es permitido, muestra un mensaje de error
    if (!validarTipoOrdenamiento(tipoOrdenamiento)) {
      console.log("Tipo de ordenamiento no permitido. Por favor, elige una opción del 1 al 5.");
    }
  } while (!validarTipoOrdenamiento(tipoOrdenamiento)); // Repite mientras el tipo no sea permitido

  // Cierra la interfaz de lectura
  rl.close();
  // Llama a la función que ejecuta los ordenamientos con los datos ingresados
  ejecutarOrdenamientos(cantidadDatos, tipoOrdenamiento);
}

// Llama a la función principal para iniciar el programa
main();
