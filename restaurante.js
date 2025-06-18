
// Menú del restaurante

const menu = {
  desayuno: { "chocolate con churros": 15, "crepes rellenos": 13, "zumo tropical": 12 },
  comida: { "pasta": 10, "pizza": 9, "lasaña": 10 },
  cena: { "esparragos": 11, "pollo": 13, "pescado": 20 }
};

// Función para mostrar el menú

function mostrarMenu(tipoMenu) {
  let mensaje = `=== Menú de ${tipoMenu.toUpperCase()} ===\n\n`;
  for (const [plato, precio] of Object.entries(menu[tipoMenu])) {
  mensaje += `${plato}: $${precio}\n`;
  }
  alert(mensaje);
}

// Función para seleccionar menú

function seleccionarMenu() {
  let tipoMenu;
  do {
    tipoMenu = prompt("¿Qué menú desea? (Desayuno/Comida/Cena): ").toLowerCase();
    if (!menu[tipoMenu]) {
      alert(" Menú no válido. Elige entre: Desayuno, Comida o Cena.");
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
      alert(` Plato no disponible. Opciones válidas: ${Object.keys(opciones).join("\n")}`);
    }
  } while (!opciones[platoElegido]);
  return { nombre: platoElegido, precio: opciones[platoElegido] };
}

// Función para generar factura

function generarFactura(platos) {
  let factura = "=== FACTURA ===\n\n";
  let total = 0;

  platos.forEach((plato, index) => {
    factura += `${index + 1}. ${plato.nombre.toUpperCase()}: $${plato.precio}\n`;
    total += plato.precio;
  });

  factura += `\nTOTAL A PAGAR: $${total}\n\nGracias por su pedido!`;
  alert(factura);
}

// Función principal

function main() {
  alert("¡Bienvenido al Restaurante JS Puro!");
  const tipoMenu = seleccionarMenu();
  const platos = [];
  
  const cantidad = parseInt(prompt("¿Cuántos platos deseas ordenar? (Máximo 3): "));
  for (let i = 0; i < cantidad; i++) {
    platos.push(elegirPlato(tipoMenu));
  }
  
  generarFactura(platos);
  alert("¡Gracias por su pedido!");
}

// Ejecutar el programa

main();
