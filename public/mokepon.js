//variables globales.....................................................................................................
//precentacion 
const secPrecentacion = document.getElementById("precentacion")

window.addEventListener("keydown", (e) => {
    //solo mientras la precentacion siga visible, si no el enter reaparecia la seleccion
    if (e.key == "Enter" && !secPrecentacion.classList.contains("oculto")) {
        botonJugar()
    }
})
//mascota del jugador
let jugadorid = null
let enemigoid = null

const botonMascotaJugador = document.getElementById('boton-mascota')
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
sectionSeleccionarAtaque.style.display = 'none'

let fotoJ

const spanMascotaJugador = document.getElementById('mascota-jugador')

const contMDJ = document.getElementById("contenedorMascDinJ")
//...

//variables del mapa que se usan aqui.......................................................................................................
const seccionVerMapa = document.getElementById("verMapa")
seccionVerMapa.style.display = "none"

const mapa = document.getElementById("mapa")

let lienzo = mapa.getContext("2d")

let jugadorImgM 
let intervalo
let fondoMapa = new Image()
fondoMapa.src = "./assets/mokemap.png"

//.........................................................................................................................
//mascota del enemigo
const contenedorMED = document.getElementById("contenedorDeME")

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

let mokeponesEnemigoMapa = []
let mascotaJugador
//variables de los ataques
let ataquesMokepon
let ataqueJugador = []
let ataqueEnemigo = []

let indexJugador
let indexEnemigo

//control de la partida, para no repetir el combate ni el aviso al servidor
let enCombate = false
let combateResuelto = false
//...

//vidas
let victoriasJugador = 0
let victoriasEnemigo = 0
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
//...

//botones de ataque
const contenedorAtaques = document.getElementById("contenedorAtaques")

const botonReiniciar = document.getElementById('boton-reiniciar')
botonReiniciar.addEventListener('click', reiniciarJuego)
//...

//...boton reiniciar
const sectionReiniciar = document.getElementById('reiniciar')
sectionReiniciar.style.display = 'none'
//...

//variables para los teplates literarios y objetos y clases
let labelH
let labelC
let labelA
let labelN

let inputHipodoge
let inputCapipepo
let inputAkaza
let inputNezuco

let mokeponesDelEnemigo
const contenedorMokepones = document.getElementById("contenedorMokepones")

let opcionMokepones

let botones = []
//variables globales.....................................................................................................

//clases y objetos
let mokepones =  []
class Mokepon {
    constructor(nombre,foto,vidas,ancho,alto,ePocicionINx,ePocicionINy, id = null){
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
        this.ePocicionINx = ePocicionINx
        this.ePocicionINy = ePocicionINy
        this.ancho = ancho
        this.alto = alto
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadx = 0
        this.velocidady = 0
        this.id = id
    }
}

//let ratigueya = new Mokepon("Ratigueya", "./assets/ratygueya.png", 5)
let hipodoge = new Mokepon("Hipodoge","./assets/hipodoge.png", 5, 150, 190, 150, 200)
let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png", 5, 150, 150, 20, 400)
let nezuco = new Mokepon("Nezuco", "./assets/nezuco.png", 5, 150, 150, 600, 700)
let akaza = new Mokepon("Akaza", "./assets/akaza.png", 5, 180, 130, 400, 580)

const hipodogeAtaques = [
    { nombre:"💧", id:"boton-agua" },
    { nombre:"💧", id:"boton-agua" },
    { nombre:"💧", id:"boton-agua" },
    { nombre:"🔥", id:"boton-fuego" },
    { nombre:"🌱", id:"boton-tierra" },
]

const capipepoAtaques = [
    { nombre:"🔥", id:"boton-fuego" },
    { nombre:"🔥", id:"boton-fuego" },
    { nombre:"🔥", id:"boton-fuego" },
    { nombre:"💧", id:"boton-agua" },
    { nombre:"🌱", id:"boton-tierra" },
]

const akazaAtaques = [
    { nombre:"🌱", id:"boton-tierra" },
    { nombre:"🌱", id:"boton-tierra" },
    { nombre:"🌱", id:"boton-tierra" },
    { nombre:"💧", id:"boton-agua" },
    { nombre:"💧", id:"boton-agua" },
]

const nezucoAtaques = [
    { nombre:"🔥", id:"boton-fuego" },
    { nombre:"🔥", id:"boton-fuego" },
    { nombre:"🔥", id:"boton-fuego" },
    { nombre:"💧", id:"boton-agua" },
    { nombre:"💧", id:"boton-agua" },
]


hipodoge.ataques.push(...hipodogeAtaques)

capipepo.ataques.push(...capipepoAtaques)

akaza.ataques.push(...akazaAtaques)

nezuco.ataques.push(...nezucoAtaques)

mokepones.push(hipodoge, capipepo, akaza, nezuco)

//metodo de generacion de mkp en html

function iniciarJuego() {

mokepones.forEach((mokepon) =>{
    opcionMokepones = `
    <label id="label-${mokepon.nombre}" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img class="imagen-mascota" src="${mokepon.foto}" alt="${mokepon.nombre}" />
            </label>
            <input type="radio" name="mascota" id="${mokepon.nombre}" />    
    `
    contenedorMokepones.innerHTML += opcionMokepones

    labelH = document.getElementById("label-Hipodoge")
    labelC = document.getElementById("label-Capipepo")
    labelA = document.getElementById("label-Akaza")
    labelN = document.getElementById("label-Nezuco")
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputAkaza = document.getElementById('Akaza')
    inputNezuco = document.getElementById("Nezuco")
    
})
    inputHipodoge.addEventListener("change", escuchadorIN)
    inputCapipepo.addEventListener("change", escuchadorIN)
    inputAkaza.addEventListener("change", escuchadorIN)
    inputNezuco.addEventListener("change", escuchadorIN)

    unirseAlJuego()
}

//funciones.....................................................................................................
function botonJugar() {
    sectionSeleccionarMascota.classList.remove("oculto")
    sectionSeleccionarMascota.classList.add("seleccionar_mascota")
    secPrecentacion.classList.add("oculto")
}

function unirseAlJuego() {
    //rutas relativas: asi tambien funciona desde el celular u otro equipo de la red
    fetch("/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text() 
                    .then(function (respuesta) {
                        console.log(respuesta);
                        jugadorid = respuesta
                    })
            }
        })

}

function escuchadorIN() {
    
    if(inputHipodoge.checked) {
        labelH.classList.add("seleccionado");
        labelC.classList.remove("seleccionado");
        labelA.classList.remove("seleccionado");
        labelN.classList.remove("seleccionado");
    } else if(inputCapipepo.checked) {
        labelH.classList.remove("seleccionado");
        labelC.classList.add("seleccionado");
        labelA.classList.remove("seleccionado");
        labelN.classList.remove("seleccionado");
    } else if(inputAkaza.checked) {
        labelH.classList.remove("seleccionado");
        labelC.classList.remove("seleccionado");
        labelA.classList.add("seleccionado");
        labelN.classList.remove("seleccionado");        
    } else if(inputNezuco.checked) {
        labelH.classList.remove("seleccionado");
        labelC.classList.remove("seleccionado");
        labelA.classList.remove("seleccionado");
        labelN.classList.add("seleccionado");
    }

}

function seleccionarMascotaJugador() {
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        fotoJ = hipodoge.foto
        imprimirMJ()
        sectionSeleccionarMascota.style.display = 'none'
        seccionVerMapa.style.display = 'flex' 
        iniciarMapa()
        mascotaJugador = inputHipodoge.id
        jugadorImgM = hipodoge
        pintarCanvas()
        seleccionDeMokepon(jugadorImgM.nombre)
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        fotoJ = capipepo.foto
        imprimirMJ()
        sectionSeleccionarMascota.style.display = 'none'
        seccionVerMapa.style.display = 'flex'
        iniciarMapa()
        mascotaJugador = inputCapipepo.id
        jugadorImgM = capipepo
        pintarCanvas()
        seleccionDeMokepon(jugadorImgM.nombre)
    } else if (inputAkaza.checked) {
        spanMascotaJugador.innerHTML = inputAkaza.id
        fotoJ = akaza.foto
        imprimirMJ()
        sectionSeleccionarMascota.style.display = 'none'
        seccionVerMapa.style.display = 'flex'
        iniciarMapa()
        mascotaJugador = inputAkaza.id
        jugadorImgM = akaza
        pintarCanvas()
        seleccionDeMokepon(jugadorImgM.nombre)
    } else if(inputNezuco.checked) {
        spanMascotaJugador.innerHTML = inputNezuco.id
        fotoJ = nezuco.foto
        imprimirMJ()
        sectionSeleccionarMascota.style.display = 'none'
        seccionVerMapa.style.display = 'flex'
        iniciarMapa()
        mascotaJugador = inputNezuco.id
        jugadorImgM = nezuco
        pintarCanvas()
        seleccionDeMokepon(jugadorImgM.nombre)
    } else {
        alert('Selecciona una mascota')
        return
    }

    extraerAtaques(mascotaJugador)
    
}

function seleccionDeMokepon(mascotaJugador) {
    fetch(`/mokepon/${jugadorid}`,{
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
    
}

function imprimirMJ() {
    let mascDinJugador = `
    <img src="${fotoJ}" class="mascota-dinamica" />
    `


    contMDJ.innerHTML = mascDinJugador
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button class="BAtaque" id="${ataque.id}">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botones = document.querySelectorAll(".BAtaque")
    secuenciaAtaques()
}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent == "🔥") {
                ataqueJugador.push("FUEGO🔥")
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if(e.target.textContent == "💧") {
                ataqueJugador.push("AGUA💧")
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if(e.target.textContent == "🌱") {
                ataqueJugador.push("TIERRA🌱")
                boton.style.background = "#112f58"
                boton.disabled = true
            }

            if (ataqueJugador.length == 5) {
                enviarAtaques()
            }

            
        })
    })
}

function enviarAtaques() {
    fetch(`/mokepon/${jugadorid}/ataques`,{
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    
    intervalo = setInterval(definirAtaquesEnemigo, 100)
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML =enemigo.nombre

    mokeponesDelEnemigo =`
        <img src="${enemigo.foto}" class="mascota-dinamica-enm" />
    `
    contenedorMED.innerHTML = mokeponesDelEnemigo

}

function definirAtaquesEnemigo() {
    fetch(`/mokepon/${enemigoid}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function combate() {
    //las respuestas del servidor pueden llegar varias veces seguidas,
    //sin esto el combate se resolvia (y se contaba) mas de una vez
    if (combateResuelto) {
        return
    }
    combateResuelto = true

    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueEnemigo[index]) {
            crearMensajeR("EMPATE")
            indexAmbosOponente(index, index)
        } else if(ataqueJugador[index] == "FUEGO🔥" && ataqueEnemigo[index] == "TIERRA🌱" || ataqueJugador[index] == "TIERRA🌱" && ataqueEnemigo[index] == "AGUA💧" || ataqueJugador[index] == "AGUA💧" && ataqueEnemigo[index] == "FUEGO🔥") {
            crearMensajeR("GANASTE")
            indexAmbosOponente(index, index)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            crearMensajeR("PERDISTE")
            indexAmbosOponente(index, index)
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }

    imprimirVictorias()
    finalizarPartida()
}

//avisa al servidor que la partida termino para que libere a los dos jugadores
function finalizarPartida() {
    fetch(`/partida/${jugadorid}/finalizar`,{
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            enemigoid
        })
    })
}

function indexAmbosOponente(jugador, enemigo) {
    indexJugador = ataqueJugador[jugador] 
    indexEnemigo = ataqueEnemigo[enemigo]

    crearMensajeJ(indexJugador)
    crearMensajeE(indexEnemigo)
}

function imprimirVictorias() {
    if (victoriasEnemigo == victoriasJugador) {
        crearMensajeFinal('NADIE GANO EL COMBATE')
    }else if (victoriasEnemigo < victoriasJugador) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensajeJ(ataque) {
    let sectionMensajes = document.getElementById('mensajesJ')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = "Tu atacaste con " + ataque

    sectionMensajes.appendChild(parrafo)
}

function crearMensajeE(ataque) {    
    let sectionMensajes = document.getElementById('mensajesE')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = "El ataque enemigo fue " + ataque

    sectionMensajes.appendChild(parrafo)
}

function crearMensajeR(resultado) {
    let mensajeR = document.getElementById('mensajesR')
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "despues de los ataques " + resultado

    mensajeR.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('mensajesF')
    
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}
//funciones.....................................................................................................
//mapa

function precion(event) {
    if (event.key == "ArrowUp") {
        moverpersonajeArriba()
    }
    if (event.key == "ArrowDown"){
        moverpersonajeAbajo()
    }
    if (event.key == "ArrowLeft"){
        moverpersonajeIsquierda()
    }
    if (event.key == "ArrowRight"){
        moverpersonajeDerecha()
    }

    if (event.key == "w") {
        moverpersonajeArriba()
    }
    if (event.key == "s"){
        moverpersonajeAbajo()  
    }
    if (event.key == "a"){
        moverpersonajeIsquierda()
    }
    if (event.key == "d"){
        moverpersonajeDerecha()
    }

}

function pintarCanvas() {
    jugadorImgM.ePocicionINx = jugadorImgM.ePocicionINx + jugadorImgM.velocidadx
    jugadorImgM.ePocicionINy = jugadorImgM.ePocicionINy + jugadorImgM.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        fondoMapa,
        0,
        0,
        mapa.width, mapa.height
    )
    lienzo.drawImage(
    jugadorImgM.mapaFoto,
    jugadorImgM.ePocicionINx, jugadorImgM.ePocicionINy,
    jugadorImgM.ancho, jugadorImgM.alto 
    ) 

    mokeponesEnemigoMapa.forEach(mokepon => {
    lienzo.drawImage(
    mokepon.mapaFoto,
    mokepon.ePocicionINx, mokepon.ePocicionINy,
    mokepon.ancho, mokepon.alto
    )
    });

    mokeponesEnemigoMapa.forEach(function(enemigo) {
        revisarColicion(enemigo)
   })

    mostrarCordenadas(jugadorImgM.ePocicionINx, jugadorImgM.ePocicionINy)
}

function mostrarCordenadas(x, y) {
    fetch(`/mapa/${jugadorid}`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
        
    })
    .then(function (res) {
            if (res.ok) {
                res.json() 
                    .then(function ({ enemigos }) {                        
                    
                        mokeponesEnemigoMapa = []
                        enemigos.forEach(function (enemigo) {
                             
                            let mokeponEnemigo 
                            const mokeponNombre = enemigo.mokepon?.nombre || ""

                            if (mokeponNombre == "Hipodoge") {
                                mokeponEnemigo = new Mokepon("Hipodoge","./assets/cabeza_hipodoge.png", 5, 150, 190, enemigo.x, enemigo.y, enemigo.id)
                            }
                            if (mokeponNombre == "Capipepo") {
                                mokeponEnemigo = new Mokepon("Capipepo", "./assets/cabeza_capipepo.png", 5, 150, 150, enemigo.x, enemigo.y, enemigo.id)
                            }
                            if (mokeponNombre == "Nezuco") {
                                mokeponEnemigo = new Mokepon("Nezuco", "./assets/cabeza_nezuco.png", 5, 150, 150, enemigo.x, enemigo.y, enemigo.id)
                            }
                            if (mokeponNombre == "Akaza") {
                                mokeponEnemigo = new Mokepon("Akaza", "./assets/cabeza_akaza.png", 5, 130, 130, enemigo.x, enemigo.y, enemigo.id)                                
                            }
                            
                            if (mokeponEnemigo != undefined) {
                                mokeponesEnemigoMapa.push(mokeponEnemigo)
                            }
                        })
                    })
            }
        })

}

function moverpersonajeAbajo() {
    jugadorImgM.velocidady = +15
}

function moverpersonajeArriba() {
    jugadorImgM.velocidady = -15
}

function moverpersonajeIsquierda() {
    jugadorImgM.velocidadx = -15
}

function moverpersonajeDerecha() {
    jugadorImgM.velocidadx = +15
}

function detenetMovimiento() {
    jugadorImgM.velocidadx = 0
    jugadorImgM.velocidady = 0
}

function revisarColicion(enemigo) {
    //una vez iniciado el duelo se ignoran las demas colisiones del mismo cuadro
    if (enCombate) {
        return
    }

    const margen = 10

    const arribaEnemigo = enemigo.ePocicionINy + margen
    const abajoEnemigo = enemigo.ePocicionINy + enemigo.alto -margen
    const derechaEnemigo = enemigo.ePocicionINx + enemigo.ancho -margen
    const izquierdaEnemigo = enemigo.ePocicionINx +margen

    const arribaMascota = jugadorImgM.ePocicionINy +margen 
    const abajoMascota = jugadorImgM.ePocicionINy + jugadorImgM.alto -margen
    const derechaMascota = jugadorImgM.ePocicionINx + jugadorImgM.ancho -margen
    const izquierdaMascota = jugadorImgM.ePocicionINx +margen

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }

    enCombate = true
    clearInterval(intervalo)
    detenetMovimiento()
    seleccionarMascotaEnemigo(enemigo)
    enemigoid = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    seccionVerMapa.style.display = "none"
}

function iniciarMapa() {
window.addEventListener("keydown",precion)
window.addEventListener("keyup", detenetMovimiento)
intervalo = setInterval(pintarCanvas, 50)
}
//..........................
window.addEventListener('load', iniciarJuego)