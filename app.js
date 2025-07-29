// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let nuevoNombre = "";
let listaAmigos = [];
let cuadroTexto = document.getElementById("amigo");
let amigoSecreto = document.getElementById("resultado");
let listaAmigosHTML = document.getElementById("listaAmigos");
let boton = document.getElementById("soltear");
let imagen = document.getElementById("imagen");
let solteoRealizado  = false;

function agregarAmigo() {

    nuevoNombre = cuadroTexto.value;
    cuadroTexto.value = "";
    amigoSecreto.innerHTML = "";
    console.log(nuevoNombre);

    if (nuevoNombre == null || nuevoNombre == "" || nuevoNombre == undefined) {
        alert("El nombre no puede estar vacío");
        console.log("El nombre no puede estar vacío");
        return;
    } else if (listaAmigos.includes(nuevoNombre)) {
        alert("El nombre ya existe en la lista");
        console.log("El nombre ya existe en la lista");
        return;
    } else {
        listaAmigos.push(nuevoNombre);
        mostrarListaAmigos();
        console.log(listaAmigos);
        return;
    }
}


function mostrarListaAmigos() {
    let lista = document.getElementById("listaAmigos");
    let listaHTML = "";

    for (let i = 0; i < listaAmigos.length; i++) {
        listaHTML += `<br>${i+1}. ${listaAmigos[i]}<br>`;
    }

    lista.innerHTML = listaHTML;

}
function sortearAmigo() {

    if (listaAmigos.length < 2) {
        alert("No hay suficientes amigos para sortear");
        console.log("No hay suficientes amigos para sortear");
        return;
    }

    let indice = Math.floor(Math.random() * listaAmigos.length);
    amigoSecreto = listaAmigos[indice];
    document.getElementById("resultado").innerHTML = `Tu amigo secreto es:\n <br>${amigoSecreto}<br>`;
    console.log(`Tu amigo secreto es: ${amigoSecreto}`);
    listaAmigos.splice(indice, 1); // Elimina el amigo secreto de la lista para que no se repita
    mostrarListaAmigos();
    actualizarInterfaceSorteoRealizado();
    return;
}

function reintentarSorteo() {

    solteoRealizado = false;
    condicionesIniciales();
    console.log("Sorteo reiniciado");
}

function funcionalidadBoton() {
    if (solteoRealizado ) {
        reintentarSorteo();
        solteoRealizado = false;
    } else {
        sortearAmigo();
        if(listaAmigos.length < 2) {
        solteoRealizado = true;
        }
    }
    return;
}


function condicionesIniciales() {
    cuadroTexto.value = "";
    listaAmigosHTML.innerHTML = "";
    amigoSecreto.innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    listaAmigos = [];
    actualizarInterfaceSorteoNoRealizado();
    return;
}


function actualizarInterfaceSorteoRealizado() {

    boton.setAttribute("class", "button-draw2");
    boton.innerHTML = `<img src="assets/reintentar.png" id="imagen"> Reintentar Sorteo`;
    imagen.setAttribute("src", "assets/amigo-secreto-descubierto.png");

}

function actualizarInterfaceSorteoNoRealizado() {

    boton.setAttribute("class", "button-draw");
    boton.innerHTML = `<img src= "assets/play_circle_outline.png" id ="image"> Sortear Amigo Secreto`;
    imagen.setAttribute("src", "assets/amigo-secreto.png");
}


condicionesIniciales();