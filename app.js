let btn_simon = document.getElementById("titulo");
let btn_start = document.getElementById("start");

let green = document.getElementById("verde");
let red = document.getElementById("rojo");
let yellow = document.getElementById("amarillo");
let blue = document.getElementById("azul");

let nivel = document.getElementById("nivel");
let letras_nivel = document.getElementById("textoNivel")

let cont = 0;
let modoOscuroActivo = false;

//Funcion para resetear el nivel y para empezar el juego
function empezar(){
    if(nivel != 0) {
        nivel.innerHTML=0;
    }
    
}

function modoOscuro(){
    if(!modoOscuroActivo){
        document.body.style.backgroundImage = "url('/img/fondo_oscuro.jpg')";
        btn_simon.style.color = "#fff";
        nivel.style.color = "#fff";
        letras_nivel.style.color = "#fff"; 
    }else{
        document.body.style.backgroundImage = "url('/img/fondo_blanco.jpg')";
        btn_simon.style.color = "#000";
        nivel.style.color = "#000";
        letras_nivel.style.color = "#000";
    }
    modoOscuroActivo = !modoOscuroActivo;
}