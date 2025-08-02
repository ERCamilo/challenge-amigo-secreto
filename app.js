
let nuevoNombre = "";
let listaAmigos = [];
let amigoSecreto = "";
let sorteoRealizado = false;

const cuadroTexto = document.getElementById("amigo");
const listaAmigosHTML = document.getElementById("listaAmigos");
const boton = document.getElementById("sortear");
const cuadroResultado = document.getElementById("resultado");
const textoBotonSorteo = document.getElementById("textoBotonSorteo");
const iconoSortear = document.getElementById("iconoSortear");
const textoResultado = document.getElementById("resultado-nombre");

const imagenAnimada = "assets/gif.gif";
const imagenOriginal = "assets/amigo-secreto.png";
const imagenCelebracion = "assets/amigo-secreto-descubierto.png";
const imagenPersonaje = document.getElementById("imagen");




// Event listeners
cuadroTexto.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    agregarAmigo();
  }
});




function agregarAmigosDesdeLista() {

  let listaAuxiliar = cuadroTexto.value.split(",");
  let listadoDeAmigos = [];

  for (const amigo of listaAuxiliar) {
    if (listadoDeAmigos.includes(amigo)) {
      continue;
    }
    listadoDeAmigos.push(amigo);
  }
  for (const amigo of listadoDeAmigos) {
    cuadroTexto.value = amigo;
    agregarAmigo();


  }
}



function agregarAmigo() {
  nuevoNombre = cuadroTexto.value.trim();

  if (!nuevoNombre) {
    mostrarMensaje("⚠️ El nombre no puede estar vacío", "error");
    return;
  }

  if (listaAmigos.some(amigo => amigo.toLowerCase() === nuevoNombre.toLowerCase())) {
    mostrarMensaje("⚠️ Este nombre ya existe en la lista", "error");
    return;
  }

  if (listaAmigos.length >= 20) {
    mostrarMensaje("⚠️ Máximo 20 amigos permitidos", "error");
    return;
  }

  listaAmigos.push(nuevoNombre);
  cuadroTexto.value = "";
  mostrarListaAmigos();
  actualizarMensajeEstado();

  // Scroll to the newly added friend
  setTimeout(() => {
    const newFriend = document.getElementById(`amigo-${listaAmigos.length - 1}`);
    if (newFriend) {
      newFriend.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function mostrarListaAmigos() {
  listaAmigosHTML.innerHTML = "";

  listaAmigos.forEach((amigo, index) => {
    const linea = document.createElement("li");
    linea.id = `amigo-${index}`;
    linea.innerText = `${index + 1}. ${amigo}`;
    linea.addEventListener('click', () => eliminarAmigo(index));
    linea.title = "Haz clic para eliminar";
    listaAmigosHTML.appendChild(linea);
  });
}

function eliminarAmigo(index) {
  if (sorteoRealizado) return;

  if (confirm(`¿Eliminar a ${listaAmigos[index]} de la lista?`)) {
    listaAmigos.splice(index, 1);
    mostrarListaAmigos();
    actualizarMensajeEstado();
  }
}

function sortearAmigo() {
  if (listaAmigos.length < 2) {
    mostrarMensaje("⚠️ Necesitas al menos 2 amigos para sortear", "error");
    return;
  }

  // Preparar animación de ruleta
  iconoSortear.className = "button-icon-girar";
  boton.disabled = true;
  imagenPersonaje.setAttribute("src", imagenAnimada)
  cuadroResultado.innerText = "🎲 Sorteando...";

  // Determinar el ganador antes de empezar la animación
  const indiceGanador = Math.floor(Math.random() * listaAmigos.length);

  // Iniciar la animación de ruleta
  iniciarAnimacionRuleta(indiceGanador);
}

function iniciarAnimacionRuleta(indiceGanador) {

  let pasos = 0;

  // Calcular cuántos pasos necesitamos
  const ciclosCompletos = 3; // Mínimo 3 vueltas completas
  const pasosAdicionales = Math.floor(Math.random() * listaAmigos.length); // 0 a (longitud-1) pasos extra

  // El total de pasos será: ciclos completos + pasos adicionales
  // Y el último paso debe caer exactamente en el ganador
  const totalPasos = (ciclosCompletos * listaAmigos.length) + pasosAdicionales + 1;

  // Calcular el índice inicial para que después de totalPasos, terminemos en indiceGanador
  let indiceInicial = (indiceGanador - totalPasos + 1 + listaAmigos.length * 100) % listaAmigos.length;
  let indiceActual = indiceInicial;

  console.log(`Ganador objetivo: ${indiceGanador}`);
  console.log(`Total pasos: ${totalPasos}`);
  console.log(`Índice inicial: ${indiceInicial}`);
  console.log(`Verificación: (${indiceInicial} + ${totalPasos} - 1) % ${listaAmigos.length} = ${(indiceInicial + totalPasos - 1) % listaAmigos.length}`);



  function iluminarSiguiente() {
    // Quitar todas las clases de resaltado
    document.querySelectorAll('.name-list li').forEach(li => {
      li.classList.remove('resaltado');
    });

    // Iluminar el elemento actual
    const elementoActual = document.getElementById(`amigo-${indiceActual}`);
    if (elementoActual) {
      elementoActual.classList.add('resaltado');
      console.log(`Paso ${pasos + 1}/${totalPasos}, iluminando índice: ${indiceActual}`);
    }

    pasos++;

    // Si hemos completado todos los pasos, finalizar
    if (pasos >= totalPasos) {
      console.log(`Finalizando. Último iluminado: ${indiceActual}, Ganador esperado: ${indiceGanador}`);
      finalizarSorteo(indiceGanador, indiceActual);
      return;
    }

    // Calcular velocidad basada en qué tan cerca estamos del final
    let velocidad;
    const pasosRestantes = totalPasos - pasos;

    if (pasos <= ciclosCompletos * listaAmigos.length) {
      // Fase de aceleración: empezar lento y acelerar
      velocidad = Math.max(50, 200 - (pasos * 3));
    } else if (pasosRestantes > 8) {
      // Fase rápida: velocidad constante
      velocidad = 50;
    } else {
      // Fase de desaceleración: desacelerar dramáticamente en los últimos pasos
      const factor = Math.pow(1.5, 9 - pasosRestantes);
      velocidad = 50 * factor;
    }

    // Mover al siguiente índice DESPUÉS de verificar si terminamos
    indiceActual = (indiceActual + 1) % listaAmigos.length;

    // Continuar la animación
    setTimeout(iluminarSiguiente, velocidad);
  }

  // Iniciar la animación
  iluminarSiguiente();

}

function finalizarSorteo(indiceGanador, ultimoIluminado) {
  // Quitar todos los resaltados
  document.querySelectorAll('.name-list li').forEach(li => {
    li.classList.remove('resaltado');
  });

  // Mostrar el ganador
  setTimeout(() => {
    const nombreAmigoSecreto = listaAmigos[indiceGanador];
    const elementoGanador = document.getElementById(`amigo-${indiceGanador}`);

    // Verificar que terminamos en el lugar correcto
    if (ultimoIluminado !== indiceGanador) {
      console.error(`Error: último iluminado ${ultimoIluminado}, ganador ${indiceGanador}`);
    }

    if (elementoGanador) {
      elementoGanador.classList.add("ganador");
    }

    cuadroResultado.innerText = ``;
    textoResultado.innerText = `¡${nombreAmigoSecreto}!`;
    cuadroResultado.style.setProperty("opacity", 0)
    textoResultado.style.setProperty("opacity", 1);
    sorteoRealizado = true;
    actualizarInterfaceSorteoRealizado();

    iconoSortear.classList.remove("spinning");
    boton.disabled = false;

    // Scroll al ganador
    elementoGanador.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 500);
  iconoSortear.className = "button-icon";
  imagenPersonaje.setAttribute("src", imagenCelebracion);

}

function reintentarSorteo() {
  sorteoRealizado = false;
  imagenPersonaje.setAttribute("src", imagenOriginal);

  // Remove winner highlighting and roulette effects
  document.querySelectorAll('.ganador, .resaltado').forEach(el => {
    el.classList.remove('ganador', 'resaltado');
  });

  actualizarInterfaceSorteoNoRealizado();
  actualizarMensajeEstado();
}

function funcionalidadBoton() {
  if (boton.disabled) return;

  if (sorteoRealizado) {
    reintentarSorteo();
    cuadroResultado.style.setProperty("opacity", 1);
    textoResultado.style.setProperty("opacity", 0);
  } else {
    sortearAmigo();
  }
}

function actualizarMensajeEstado() {
  if (listaAmigos.length === 0) {
    cuadroResultado.innerText = "¡Añade al menos 2 amigos para comenzar!";
  } else if (listaAmigos.length === 1) {
    cuadroResultado.innerText = "¡Añade un amigo más para poder sortear!";
  } else {
    cuadroResultado.innerText = `👌🏻 ${listaAmigos.length} amigos listos para el sorteo`;
  }
}

function mostrarMensaje(mensaje, tipo) {
  cuadroResultado.innerText = mensaje;
  cuadroResultado.style.color = tipo === "error" ? "#d32f2f" : "#2e7d32";

  setTimeout(() => {
    cuadroResultado.style.color = "";
    actualizarMensajeEstado();
  }, 3000);
}

function actualizarInterfaceSorteoRealizado() {
  boton.className = "button-draw2";
  textoBotonSorteo.innerText = "Nuevo Sorteo";
  iconoSortear.innerText = "🔄";
}

function actualizarInterfaceSorteoNoRealizado() {
  boton.className = "button-draw";
  textoBotonSorteo.innerText = "Sortear Amigo Secreto";
  iconoSortear.innerText = "🎲";
}

// Initialize
actualizarMensajeEstado();
cuadroTexto.focus();

