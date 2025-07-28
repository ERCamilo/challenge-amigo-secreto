// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let nuevoNombre = "";
let listaAmigos = []; 
let amigoSecreto= "";

function agregarAmigo() {

    nuevoNombre = document.getElementById("amigo").value;
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
        console.log("No hay suficientes amigos para sortear");
        alert("No hay suficientes amigos para sortear");
        return;
    }
    
    let indice = Math.floor(Math.random() * listaAmigos.length);
    amigoSecreto = listaAmigos[indice];
    console.log(`Tu amigo secreto es: ${amigoSecreto}`);
    document.getElementById("resultado").innerHTML = amigoSecreto
    document.getElementById("listaAmigos").innerHTML = ""; 
    document.getElementById("amigo").value = "";
    listaAmigos = [];

}