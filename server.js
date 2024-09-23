const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Configura la conexión con la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto_db',
    password: '3022',
    port: 5432,
});

// Ruta para guardar datos
app.post('/guardar', async (req, res) => {
    const { nombreProyecto, lat, lng } = req.body;
    try {
        const query = 'INSERT INTO proyectos (nombre, latitud, longitud) VALUES ($1, $2, $3)';
        await pool.query(query, [nombreProyecto, lat, lng]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send('Error al guardar los datos');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
