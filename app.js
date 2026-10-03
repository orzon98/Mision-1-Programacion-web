const btn_start = document.getElementById("start");

const verde = document.getElementById("verde");
const rojo = document.getElementById("rojo");
const amarillo = document.getElementById("amarillo");
const azul = document.getElementById("azul");

const colores = [rojo, verde, amarillo, azul];
const nivel = document.getElementById("nivel");

const resultado = document.getElementById("resultado");

//Objeto para guardar el estado de la partida
const estado = {
    secuencia: [],
    secuenciaJugador: [],
    puedeJugar: false,
    intervalo: null,
};

let cont = 0;
let modoOscuroActivo = false;

//Funcion para resetear el nivel y para empezar el juego
function empezar(){
    nivel.textContent=0;
    cont = 0;
    estado.secuencia = [];
    resultado.replaceChildren();
    btn_start.classList.add("oculto");
    siguienteNivel();
}

//Funcion modo oscuro pero ahora usando classList
function modoOscuro(){
    document.body.classList.toggle("oscuro");
}

//Funcion para encender un boton
function encenderBoton(color){
    //Se añade el color a la clase activo que contiene propiedades para que resalte el color seleccionado
    color.classList.add("activo");

    //Se le aplica un timeout de 500ms para quitarle esa clase y vuelva a su estado normal
    setTimeout(function(){
        color.classList.remove("activo")
    }, 500);
}

//Funcion que reproduce la secuencia de colores
function reproducirSecuencia(){
    let i = 0;
    //Mientras se reproduce la secuencia, el jugador no puede jugar (se bloquea con puedeJugar)
    estado.puedeJugar = false;

    //Enciende todos los botones de la secuencia actual y espera 900ms para avanzar de nivel
    estado.intervalo = setInterval(function(){
        encenderBoton(estado.secuencia[i]);
        i++;
        //Cuando i llega a la longitud de secuencia significa que ya se ha llegado al final por lo que puede empezar a jugar el jugador
        if(i >= estado.secuencia.length){
            clearInterval(estado.intervalo);
            estado.puedeJugar = true;
        }
    }, 900);
}

//Funcion para obtener un color de forma aleatoria
function obtenerColor(){
    return Math.floor(Math.random() * colores.length);
}

//Funcion para avanzar de nivel
function siguienteNivel(){
    cont++;
    nivel.textContent=cont;

    estado.secuenciaJugador = [];

    //Se elige un color aleatorio y se introduce en el array secuencia
    let indiceAleatorio = obtenerColor();
    let colorSeleccionado = colores[indiceAleatorio];

    estado.secuencia.push(colorSeleccionado);

    //Por ultimo se llama a la funcion de reproducir secuencia para que ilumine los colores
    reproducirSecuencia();
}

//Funcion para implementar la jugabilidad del usuario
function jugadorPulsa(color){
    //Si la maquina sigue reproduciendo la secuencia se ignoran los clicks
    if(!estado.puedeJugar) return;

    //Cuando el jugador pulsa llamamos a encenderBoton para que se vea cual ha pulsado
    encenderBoton(color);
    //Se mete el color en el array del usuario 
    estado.secuenciaJugador.push(color);

    //Variable que guarda el indice del ultimo elemento que el jugador acaba de añadir a secuenciaJugador
    let posicion = estado.secuenciaJugador.length - 1;

    //Se comprueba si el color que ha pulsado el jugador es el mismo que el de la secuencia y sino pierde
    if(estado.secuenciaJugador[posicion] !== estado.secuencia[posicion]){
        perder();
        return;
    }

    //Si la longitud es la misma se avanza de nivel
    if(estado.secuenciaJugador.length === estado.secuencia.length){
        estado.puedeJugar = false;
        setTimeout(siguienteNivel, 1000);
    }
}

//Funcion para mandar una alerta cuando se pierde
function perder(){
    estado.puedeJugar = false;

    const texto = document.createElement("p");
    texto.classList.add("texto");
    texto.textContent = `Has perdido. Llegaste al nivel: ${cont}`;
    resultado.appendChild(texto);

    btn_start.textContent = "Reiniciar";
    btn_start.classList.remove("oculto");
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

