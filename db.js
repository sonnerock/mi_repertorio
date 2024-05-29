const { Pool } = require("pg")

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    pass: process.env.PASSWORD,
    port: process.env.PORT,
}

const pool = new Pool(config)

const consultar = async () => {
    const text = "SELECT * FROM canciones"
    const result = await pool.query(text)

    return result
}

const insertar = async (payload) => {

    const text = "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *";
    const values = [payload.titulo, payload.artista, payload.tono];

    const queryObject = {
        text: text,
        values: values,
    }
    const result = await pool.query(queryObject)
    
    return result
}


const actualizar = async (payload) =>{
    const text = "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4"
    const values = [payload.titulo, payload.artista, payload.tono, payload.id]



    const result = await pool.query(text, values)

    return result
}

const eliminar = async (id) =>{
    const text = "DELETE FROM canciones where id = $1"
    const values = [id]

    const result = pool.query(text, values)
    return result
}

module.exports = { insertar, consultar, actualizar, eliminar }