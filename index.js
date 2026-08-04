//variables y uso de librerias
const express = require("express");

const cors = require("cors");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")))

app.use(cors())

app.use(express.json())

const jugadores = []

//tiempos de limpieza del servidor (en milisegundos)
//margen para que el oponente alcance a leer los ataques y cerrar su combate
const TIEMPO_TRAS_PARTIDA = 15 * 1000
//jugadores que se fueron sin terminar (cerraron la pestaña, se quedaron en la seleccion, etc)
const TIEMPO_INACTIVIDAD = 10 * 60 * 1000
const INTERVALO_LIMPIEZA = 5 * 1000

//clases y objetos
class Jugador {
  constructor(id) {
    this.id = id
    this.ultimaActividad = Date.now()
    this.finDePartida = null
  }

  asignarMokepon(mokepon){
    this.mokepon = mokepon
  }

  guardarCordenadas(x, y){
    this.x = x
    this.y = y
  }

  asignarAtaques(ataques){
  this.ataques = ataques
  }

  actualizarActividad(){
    this.ultimaActividad = Date.now()
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre
  }
}

//functions
function buscarJugador(jugadorid) {
  const jugador = jugadores.find((jugador) => jugador.id === jugadorid)

  if (jugador) {
    jugador.actualizarActividad()
  }

  return jugador
}

function eliminarJugador(jugadorid) {
  const jugadorindex = jugadores.findIndex((jugador) => jugador.id === jugadorid)

  if (jugadorindex >= 0) {
    jugadores.splice(jugadorindex, 1)
    console.log("se libero al jugador ", jugadorid)
  }
}

//deja el servidor listo para nuevas partidas sin reiniciarlo
function limpiarJugadores() {
  const ahora = Date.now()

  const terminados = jugadores.filter((jugador) => {
    const partidaTerminada = jugador.finDePartida !== null && ahora - jugador.finDePartida > TIEMPO_TRAS_PARTIDA
    const inactivo = ahora - jugador.ultimaActividad > TIEMPO_INACTIVIDAD

    return partidaTerminada || inactivo
  })

  terminados.forEach((jugador) => eliminarJugador(jugador.id))
}

setInterval(limpiarJugadores, INTERVALO_LIMPIEZA)

//endpoints
app.get('/unirse', (req, res) => {
  const id = `${Math.random()}`

  const jugador = new Jugador(id)

  jugadores.push(jugador)

  res.send(id)
});

app.post("/mokepon/:jugadorid", (req,res) => {
  const jugadorid = req.params.jugadorid || ""
  const nombre = req.body.mokepon || ""
  const mokepon = new Mokepon(nombre)

  const jugador = buscarJugador(jugadorid)

  if (jugador) {
    jugador.asignarMokepon(mokepon)
  }

  console.log(jugadorid, " eligio el mokepon ", mokepon)
  res.end()
});

app.post("/mapa/:jugadorid", (req,res) => {
  const jugadorid = req.params.jugadorid || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const jugador = buscarJugador(jugadorid)

  if (jugador) {
    jugador.guardarCordenadas(x, y)
  }

  //los jugadores que ya terminaron su partida no se muestran en el mapa
  const enemigos = jugadores.filter((jugador) => jugadorid !== jugador.id && jugador.finDePartida === null)

  res.send({
    enemigos
  })
})

app.post("/mokepon/:jugadorid/ataques", (req,res) => {
  const jugadorid = req.params.jugadorid || ""
  const ataques = req.body.ataques || []

  const jugador = buscarJugador(jugadorid)

  if (jugador) {
    jugador.asignarAtaques(ataques)
  }

  console.log(jugadorid, " ataco con ", ataques)
  res.end()
});

app.get("/mokepon/:jugadorid/ataques", (req,res) => {
  const jugadorid = req.params.jugadorid || ""
  const jugador = buscarJugador(jugadorid)

  if (!jugador) {
      return res.send({ ataques: [] });
  }

  res.send({
      ataques: jugador.ataques || []
  })
})

app.post("/partida/:jugadorid/finalizar", (req,res) => {
  const jugadorid = req.params.jugadorid || ""
  const enemigoid = req.body.enemigoid || ""

  //se marcan los dos jugadores y la limpieza los elimina despues del margen,
  //asi el oponente todavia puede leer los ataques y cerrar su propio combate
  const ids = [jugadorid, enemigoid]

  ids.forEach((id) => {
    const jugador = jugadores.find((jugador) => jugador.id === id)

    if (jugador && jugador.finDePartida === null) {
      jugador.finDePartida = Date.now()
    }
  })

  console.log("termino la partida entre ", jugadorid, " y ", enemigoid)
  res.end()
})

//puerto del servidor
app.listen(3000, () => {
    console.log("el servidor inicio (:");
});
