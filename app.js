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
    nivel.innerHTML=cont;

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
    alert("Has perdido. Llegaste al nivel: " + cont);
}

//Se asocia a cada boton de color un evento de clic que llama a jugadorPulsa pasandole ese color
verde.addEventListener("click", function(){ jugadorPulsa(verde); });
rojo.addEventListener("click", function(){ jugadorPulsa(rojo); });
amarillo.addEventListener("click", function(){ jugadorPulsa(amarillo); });
azul.addEventListener("click", function(){ jugadorPulsa(azul); });

