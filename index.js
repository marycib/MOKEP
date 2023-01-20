const express = require('express') // importando la libreria 
const cors = require('cors')
const app =  express() // crear una aplicación con express

app.use(express.static('public'))
app.use(cors())
app.use(express.json()) //Habilitar contenido en formato json

const jugadores = []
// Representa a cada uno de los jugadores
class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    // para que el jugador guarde sus coordenadas 
    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}



class Mokepon{
    constructor (nombre) {
      this.nombre = nombre
   }
}

app.get('/unirse', (req, res) => {// respuesta de la aplicacion 
const id = `${Math.random()}`
const jugador = new Jugador(id) //llamando a la clase Jugador 
jugadores.push(jugador)

res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})

app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const nombre = req.body.mokepon || ''
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

//conocer las coodenadas del mokepon
app.post('/mokepon/:jugadorId/posicion', (req, res) =>{
    const jugadorId = req.params.jugadorId || ''
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
//Resive todos los Id de jugadores menos el de jugador id
   const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})



app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    res.end()
})


//optener los ataques del jugador
app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})




// puerto por donde escucha la petición
app.listen(8090, () => {
    console.log('Sevidor funcionando')
})