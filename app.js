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

function reproducirSecuencia(){
    let i = 0;
    intervalo = setInterval(function(){
        encenderBoton(secuencia[i]);
        i++;
        if(i >= secuencia.length){
            clearInterval(intervalo)
        }
    }, 900);
}

let secuencia = [];
function obtenerColor(){
    return Math.floor(Math.random() * colores.length);
}

function siguienteNivel(){
    cont++;
    nivel.innerHTML=cont;

    let indiceAleatorio = obtenerColor();
    let colorSeleccionado = colores[indiceAleatorio];

    secuencia.push(colorSeleccionado);

    console.log("Color añadido:", colorSeleccionado.id);
    console.log("Secuencia actual:", secuencia.map(b => b.id));

    reproducirSecuencia();

}