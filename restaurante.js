
const prompt = require('prompt-sync')(); // Reemplaza window.prompt()

// Menú del restaurante
const menu = {
  desayuno: { "chocolate con churros": 15, "crepes rellenos": 13, "zumo tropical": 12 },
  comida: { "pasta": 10, "pizza": 9, "lasaña": 10 },
  cena: { "esparragos": 11, "pollo": 13, "pescado": 20 }
};

// Función para mostrar el menú
function mostrarMenu(tipoMenu) {
  console.log(`\n=== Menú de ${tipoMenu.toUpperCase()} ===`);
  for (const [plato, precio] of Object.entries(menu[tipoMenu])) {
    console.log(`${plato}: $${precio}`);
  }
}

// Función para seleccionar menú
function seleccionarMenu() {
  let tipoMenu;
  do {
    tipoMenu = prompt("¿Qué menú desea? (Desayuno/Comida/Cena): ").toLowerCase();
    if (!menu[tipoMenu]) {
      console.log(" Menú no válido. Elige entre: Desayuno, Comida o Cena.");
    }
  } while (!menu[tipoMenu]);
  return tipoMenu;
}

// Función para elegir plato
function elegirPlato(tipoMenu) {
  mostrarMenu(tipoMenu);
  const opciones = menu[tipoMenu];
  let platoElegido;
  do {
    platoElegido = prompt(`Escribe el nombre del plato que desea de ${tipoMenu}: `).toLowerCase();
    if (!opciones[platoElegido]) {
      console.log(` Plato no disponible. Opciones válidas: ${Object.keys(opciones).join(", ")}`);
    }
  } while (!opciones[platoElegido]);
  return { nombre: platoElegido, precio: opciones[platoElegido] };
}

// Función para generar factura
function generarFactura(platos) {
  console.log("\n=== FACTURA ===");
  let total = 0;
  platos.forEach((plato, index) => {
    console.log(`${index + 1}. ${plato.nombre.toUpperCase()}: $${plato.precio}`);
    total += plato.precio;
  });
  console.log(`\nTOTAL A PAGAR: $${total}`);
}

// Función principal
function main() {
  console.log("¡Bienvenido al Restaurante JS Puro!");
  const tipoMenu = seleccionarMenu();
  const platos = [];
  
  const cantidad = parseInt(prompt("¿Cuántos platos deseas ordenar? (Máximo 3): "));
  for (let i = 0; i < cantidad; i++) {
    platos.push(elegirPlato(tipoMenu));
  }
  
  generarFactura(platos);
  console.log("¡Gracias por su pedido!");
}

// Ejecutar el programa
main();
