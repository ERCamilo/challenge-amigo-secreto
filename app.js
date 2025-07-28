// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let nuevoNombre = "";
let listaAmigos = []; 
let cuadroTexto = document.getElementById("amigo");
let amigoSecreto = document.getElementById("resultado");
let listaAmigosHTML = document.getElementById("listaAmigos");

function agregarAmigo() {

    nuevoNombre = cuadroTexto.value;
    cuadroTexto.value = ""; 
    amigoSecreto.innerHTML = "";
    console.log(nuevoNombre);

    if(nuevoNombre == null || nuevoNombre == "" || nuevoNombre == undefined){
        alert("El nombre no puede estar vacío");
        console.log("El nombre no puede estar vacío");
        return;
    }else if (listaAmigos.includes(nuevoNombre)){
        alert("El nombre ya existe en la lista");
        console.log("El nombre ya existe en la lista");
        return;
    } else{
        listaAmigos.push(nuevoNombre);
        mostrarListaAmigos();
        limpiar();
        console.log(listaAmigos);
        return;
    }
}


function mostrarListaAmigos() {
    let lista = document.getElementById("listaAmigos");
    let listaHTML = "";

    for (let i = 0; i < listaAmigos.length; i++) {
        listaHTML = ` ${listaHTML} <br>${listaAmigos[i]}<br>`;
    }
    lista.innerHTML = listaHTML;

}
function sortearAmigo(){
    
    if(listaAmigos.length < 2){
        alert("No hay suficientes amigos para sortear");
        console.log("No hay suficientes amigos para sortear");
        return;
    }
    
    let indice = Math.floor(Math.random() * listaAmigos.length);
    amigoSecreto = listaAmigos[indice];
    document.getElementById("resultado").innerHTML = amigoSecreto
    condicionesIniciales();
      console.log(`Tu amigo secreto es: ${amigoSecreto}`);
    return;
}

function condicionesIniciales(){
    cuadroTexto.value = "";
    listaAmigosHTML.innerHTML = "";
    listaAmigos = [];
    return;
}


condicionesIniciales();