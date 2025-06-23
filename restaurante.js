// Caja de comentarios aleatorios
const comentarios = {
  positivos: [
    "¡Excelente elección!",
    "Buena selección!.",
    "¡Ah, un clásico!"
  ],
  errores: [
    "Opción no está disponible.",
    "Error: Por favor elige una opción válida.",
    "Opción incorrecta. Inténtalo de nuevo."
  ]
};

// Menú completo con 3 opciones por cada categoría
const menu = {
  desayuno: {
    "Plato Principal": {
      "Huevos Benedictinos": 12,
      "Tostadas Francesas": 10,
      "Omelette del Chef": 11
    },
    "Acompañamiento": {
      "Fruta Fresca": 5,
      "Yogur con Granola": 6,
      "Pan Integral": 4
    },
    "Bebida": {
      "Café": 3,
      "Jugo Natural": 4,
      "Té": 3
    }
  },
  comida: {
    "Entrada": {
      "Ensalada César": 8,
      "Sopa del Día": 7,
      "Bruschettas": 9
    },
    "Plato Fuerte": {
      "Pasta Carbonara": 15,
      "Pizza Margarita": 14,
      "Pollo a la Parrilla": 16
    },
    "Postre": {
      "Tiramisú": 7,
      "Flan": 5,
      "Helado": 6
    }
  },
  cena: {
    "Entrada": {
      "Carpaccio": 10,
      "Crema de Espárragos": 8,
      "Tartar de Atún": 12
    },
    "Plato Principal": {
      "Filete Mignon": 25,
      "Salmón a la Parrilla": 22,
      "Risotto de Champiñones": 18
    },
    "Bebida": {
      "Vino Tinto": 12,
      "Cóctel Sin Alcohol": 8,
      "Agua Mineral": 4
    }
  }
};

// Función para obtener comentario aleatorio
function getComentarioAleatorio(tipo) {
  const lista = comentarios[tipo];
  return lista[Math.floor(Math.random() * lista.length)];
}

// Función para mostrar opciones
function mostrarOpciones(categoria, opciones) {
  let mensaje = `=== ${categoria} ===\n\n`;
  let i = 1;
  for (const [opcion, precio] of Object.entries(opciones)) {
    mensaje += `${i}. ${opcion} - $${precio}\n`;
    i++;
  }
  return mensaje;
}

// Función para seleccionar horario
function seleccionarHorario() {
  let hora, formato;
  
  // Seleccionar formato de hora
  do {
    formato = prompt("¿En qué formato desea ingresar la hora?\n(12 o 24):");
    if (formato !== "12" && formato !== "24") {
      alert("Error: Ingrese 12 o 24");
    }
  } while (formato !== "12" && formato !== "24");

  // Validar hora
  do {
    hora = parseInt(prompt(`Ingrese la hora (formato ${formato}h):`));
    if (isNaN(hora) || (formato === "12" && (hora < 1 || hora > 12)) || 
        (formato === "24" && (hora < 0 || hora > 23))) {
      alert(`Error: Hora inválida para formato ${formato}h`);
    }
  } while (isNaN(hora) || (formato === "12" && (hora < 1 || hora > 12)) || 
          (formato === "24" && (hora < 0 || hora > 23)));

  // Ajustar formato 12h
  if (formato === "12") {
    const ampm = prompt("¿AM o PM?:").toUpperCase();
    if (ampm === "PM" && hora !== 12) hora += 12;
    if (ampm === "AM" && hora === 12) hora = 0;
  }

  // Determinar menú
  if (hora >= 6 && hora < 12) return "desayuno";
  if (hora >= 12 && hora < 18) return "comida";
  return "cena";
}

// Función principal
function main() {
  alert("¡Bienvenido a nuestro restaurante JS Puro!");
  
  // Seleccionar horario
  const tipoMenu = seleccionarHorario();
  alert(`Hora seleccionada: Menú de ${tipoMenu}`);
  
  const pedido = [];
  
  // Seleccionar 3 platos
  for (const [categoria, opciones] of Object.entries(menu[tipoMenu])) {
    let platoSeleccionado;
    let precioSeleccionado;
    let opcionValida = false;
    
    do {
      const seleccion = prompt(
        `${mostrarOpciones(categoria, opciones)}\n` +
        `Elija un número para ${categoria}:`
      );
      
      // Validar selección
      const opcionesArray = Object.entries(opciones);
      if (seleccion >= 1 && seleccion <= opcionesArray.length) {
        platoSeleccionado = opcionesArray[seleccion-1][0];
        precioSeleccionado = opcionesArray[seleccion-1][1];
        opcionValida = true;
        alert(getComentarioAleatorio("positivos"));
      } else {
        alert(getComentarioAleatorio("errores"));
      }
    } while (!opcionValida);
    
    pedido.push({
      categoria,
      plato: platoSeleccionado,
      precio: precioSeleccionado
    });
  }
  
  // Mostrar factura
  let factura = "=== FACTURA DETALLADA ===\n\n";
  let total = 0;
  
  pedido.forEach((item, index) => {
    factura += `${index+1}. [${item.categoria}] ${item.plato} - $${item.precio}\n`;
    total += item.precio;
  });
  
  factura += `\nTOTAL A PAGAR: $${total}\n\n¡Gracias por su visita!`;
  alert(factura);
}

main();