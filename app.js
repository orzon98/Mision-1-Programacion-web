const btn_simon = document.getElementById("titulo");
const btn_start = document.getElementById("start");

const verde = document.getElementById("verde");
const rojo = document.getElementById("rojo");
const amarillo = document.getElementById("amarillo");
const azul = document.getElementById("azul");

const nivel = document.getElementById("nivel");
const letras_nivel = document.getElementById("textoNivel")

let cont = 0;
let modoOscuroActivo = false;

//Funcion para resetear el nivel y para empezar el juego
function empezar(){
    nivel.textContent=0;
    cont = 0;
    secuencia = [];
    siguienteNivel();
}

//Funcion modo oscuro pero ahora usando classList
function modoOscuro(){
    document.body.classList.toggle("oscuro");
}

//Variable para guardar los colores
let colores = [rojo, verde, amarillo, azul];

//Funcion para encender un boton
function encenderBoton(color){
    //Se añade el color a la clase activo que contiene propiedades para que resalte el color seleccionado
    color.classList.add("activo");

    //Se le aplica un timeout de 500ms para quitarle esa clase y vuelva a su estado normal
    setTimeout(function(){
        color.classList.remove("activo")
    }, 500);
}

let intervalo;
let puedeJugar;

//Funcion que reproduce la secuencia de colores
function reproducirSecuencia(){
    let i = 0;
    //Mientras se reproduce la secuencia, el jugador no puede jugar (se bloquea con puedeJugar)
    puedeJugar = false;

    //Enciende todos los botones de la secuencia actual y espera 900ms para avanzar de nivel
    intervalo = setInterval(function(){
        encenderBoton(secuencia[i]);
        i++;
        //Cuando i llega a la longitud de secuencia significa que ya se ha llegado al final por lo que puede empezar a jugar el jugador
        if(i >= secuencia.length){
            clearInterval(intervalo);
            puedeJugar = true;
        }
    }, 900);
}

let secuencia = [];

//Funcion para obtener un color de forma aleatoria
function obtenerColor(){
    return Math.floor(Math.random() * colores.length);
}

let secuenciaJugador = [];

//Funcion para avanzar de nivel
function siguienteNivel(){
    cont++;
    nivel.textContent=cont;

    secuenciaJugador = [];

    //Se elige un color aleatorio y se introduce en el array secuencia
    let indiceAleatorio = obtenerColor();
    let colorSeleccionado = colores[indiceAleatorio];

    secuencia.push(colorSeleccionado);

    //Por ultimo se llama a la funcion de reproducir secuencia para que ilumine los colores
    reproducirSecuencia();
}

//Funcion para implementar la jugabilidad del usuario
function jugadorPulsa(color){
    //Si la maquina sigue reproduciendo la secuencia se ignoran los clicks
    if(!puedeJugar) return;

    //Cuando el jugador pulsa llamamos a encenderBoton para que se vea cual ha pulsado
    encenderBoton(color);
    //Se mete el color en el array del usuario 
    secuenciaJugador.push(color);

    //Variable que guarda el indice del ultimo elemento que el jugador acaba de añadir a secuenciaJugador
    let posicion = secuenciaJugador.length - 1;

    //Se comprueba si el color que ha pulsado el jugador es el mismo que el de la secuencia y sino pierde
    if(secuenciaJugador[posicion] !== secuencia[posicion]){
        perder();
        return;
    }

    //Si la longitud es la misma se avanza de nivel
    if(secuenciaJugador.length === secuencia.length){
        puedeJugar = false;
        setTimeout(siguienteNivel, 1000);
    }
}

//Funcion para mandar una alerta cuando se pierde
function perder(){
    puedeJugar = false;
    alert(`Has perdido. Llegaste al nivel: ${cont}`);
}

//forEach del array colores para no repetir mucho codigo, asocia cada color a la función
colores.forEach(function(elemento){
    elemento.addEventListener("click", function(){ jugadorPulsa(elemento); });
});

btn_start.addEventListener("click", function(){empezar()});

document.addEventListener("keydown", function(evento){
    if(evento.key.toLowerCase() === 'n'){
        modoOscuro();
    }
});

