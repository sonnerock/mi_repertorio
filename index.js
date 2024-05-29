const express = require("express")
const app = express()
const { insertar, consultar, actualizar, eliminar } = require("./db")

app.listen(3000, () => {
    console.log("app escuchando puerto 3000")
})

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/cancion", async (req, res) => {
    const payload = req.body

    try {
        const response = await insertar(payload)

        res.send(response.rows)

    } catch (error) {
        res.statusCode = 500
        res.json({ error: "algo salió mal, intentalo más tarde" })
    }
})

app.get("/canciones", async (req, res) => {
    try {
        const response = await consultar()

        res.send(response.rows)

    } catch (error) {
        res.statusCode = 500
        res.json({ error: "Algo salió mal, intentalo más tarde" })
    }
})

app.put("/cancion/:id", async (req, res) => {

    const { id } = req.params
    const payload = req.body

    payload.id = id

    try {
        const response = await actualizar(payload)
        
        res.send(response.rows)
    } catch (error) {
        res.statusCode = 500
        res.json({ error: "algo salió mal, intentalo más tarde" })
    }
})

app.delete("/cancion", async (req, res) => {
    const { id } = req.query

    try {
        const result = await eliminar(id);

        res.send(result)
    } catch (error) {
        res.statusCode = 500
        res.json({ error: "algo salió mal, intentalo más tarde" })
    }
})