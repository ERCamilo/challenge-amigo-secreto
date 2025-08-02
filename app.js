let nuevoNombre = "";
let listaAmigos = [];
let amigoSecreto = "";
let sorteoRealizado = false;

const cuadroTexto = document.getElementById("amigo");
const listaAmigosHTML = document.getElementById("listaAmigos");
const boton = document.getElementById("sortear");
const imagen = document.getElementById("imagen");
const cuadroResultado = document.getElementById("resultado");

//Imágenes
const imagenBotonSortear = document.getElementById("iconoSortear");
const imagenAmigoSecreto = "assets/amigo-secreto.png";
const iconoPlay = "assets/play_circle_outline.png";
const imagenAmigoSecretoDescubierto = "assets/amigo-secreto-descubierto.png";
const iconoReintentar = "assets/reintentar.png";
const textoBotonSorteo = document.getElementById("textoBotonSorteo");

//Funciones
function agregarAmigo() {

  nuevoNombre = cuadroTexto.value;
  console.log(nuevoNombre);

  if (nuevoNombre == null || nuevoNombre == "" || nuevoNombre == undefined) {
    alert("El nombre no puede estar vacío");
  } else if (listaAmigos.includes(nuevoNombre)) {
    alert("El nombre ya existe en la lista");
  } else {
    listaAmigos.push(nuevoNombre);
    mostrarListaAmigos();
    console.log(listaAmigos);
  }
}

function mostrarListaAmigos() {
  listaAmigosHTML.innerHTML = "";

  for (let i = 0; i < listaAmigos.length; i++) {
    const linea = document.createElement("li");
    const amigo = listaAmigos[i];
    linea.id = `amigo-${i}`;
    linea.innerText = ` ${i + 1}. ${amigo}`;
    listaAmigosHTML.appendChild(linea);
  }
}

function sortearAmigo() {
  if (listaAmigos.length < 2) {
    alert("No hay suficientes amigos para sortear");
    return;
  }

  let indice = Math.floor(Math.random() * listaAmigos.length);
  let nombreAmigoSecreto = listaAmigos[indice];

  cuadroResultado.innerText = `Tu amigo secreto es:\n ${nombreAmigoSecreto}`;
  console.log(`Tu amigo secreto es: ${nombreAmigoSecreto}`);

  //Elimina el amigo secreto de la lista para que no se repita
  //listaAmigos.splice(indice, 1);

  mostrarListaAmigos();
  actualizarInterfaceSorteoRealizado();
  document.getElementById(`amigo-${indice}`).className = "ganador";
}

function reintentarSorteo() {
  sorteoRealizado = false;
  condicionesIniciales();
  console.log("Sorteo reiniciado");
}

function funcionalidadBoton() {
  if (sorteoRealizado) {
    reintentarSorteo();
    sorteoRealizado = false;
  } else {
    sortearAmigo();
    if (listaAmigos.length < 2) {
      sorteoRealizado = true;
    }
  }
}

function condicionesIniciales() {
  amigoSecreto = "";
  cuadroTexto.value = "";
  listaAmigosHTML.innerText = "";
  cuadroResultado.innerText = "";
  listaAmigos = [];
  actualizarInterfaceSorteoNoRealizado();
  cuadroResultado.innerText =
    "¡Suerte! Presiona el botón para sortear tu amigo secreto.";
}

function actualizarInterfaceSorteoRealizado() {
  boton.className = "button-draw2";
  textoBotonSorteo.innerText = "Reintentar";
  imagenBotonSortear.src = iconoReintentar;
  imagen.src = imagenAmigoSecretoDescubierto;
}

function actualizarInterfaceSorteoNoRealizado() {
  boton.className = "button-draw";
  textoBotonSorteo.innerText = "Sortear Amigo Secreto";
  imagenBotonSortear.src = iconoPlay;
  imagen.src = imagenAmigoSecreto;
}

condicionesIniciales();
