let btn_simon = document.getElementById("titulo");
let btn_start = document.getElementById("start");

let verde = document.getElementById("verde");
let rojo = document.getElementById("rojo");
let amarillo = document.getElementById("amarillo");
let azul = document.getElementById("azul");

let nivel = document.getElementById("nivel");
let letras_nivel = document.getElementById("textoNivel")

let cont = 0;
let modoOscuroActivo = false;

//Funcion para resetear el nivel y para empezar el juego
function empezar(){
    nivel.innerHTML=0;
    cont = 0;
    secuencia = [];
    siguienteNivel();
}

//Funcion para activar y desactivar el modo oscuro
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

let colores = [rojo, verde, amarillo, azul];

function encenderBoton(color){
    color.classList.add("activo");
    setTimeout(function(){
        color.classList.remove("activo")
    }, 500);
}

let intervalo;
let puedeJugar;

function reproducirSecuencia(){
    let i = 0;
    puedeJugar = false;
    intervalo = setInterval(function(){
        encenderBoton(secuencia[i]);
        i++;
        if(i >= secuencia.length){
            clearInterval(intervalo);
            puedeJugar = true;
        }
    }, 900);
}

let secuencia = [];
function obtenerColor(){
    return Math.floor(Math.random() * colores.length);
}

let secuenciaJugador = [];

function siguienteNivel(){
    cont++;
    nivel.innerHTML=cont;
    secuenciaJugador = [];

    let indiceAleatorio = obtenerColor();
    let colorSeleccionado = colores[indiceAleatorio];

    secuencia.push(colorSeleccionado);

    reproducirSecuencia();
}

function jugadorPulsa(color){
    if(!puedeJugar) return;

    encenderBoton(color);
    secuenciaJugador.push(color);

    let posicion = secuenciaJugador.length - 1;

    if(secuenciaJugador[posicion] !== secuencia[posicion]){
        perder();
        return;
    }

    if(secuenciaJugador.length === secuencia.length){
        puedeJugar = false;
        setTimeout(siguienteNivel, 1000);
    }
}

function perder(){
    puedeJugar = false;
    alert("Has perdido. Llegaste al nivel: " + cont);
}

verde.addEventListener("click", function(){ jugadorPulsa(verde); });
rojo.addEventListener("click", function(){ jugadorPulsa(rojo); });
amarillo.addEventListener("click", function(){ jugadorPulsa(amarillo); });
azul.addEventListener("click", function(){ jugadorPulsa(azul); });

