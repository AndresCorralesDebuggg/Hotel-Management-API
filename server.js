const express= require ('express');
const {Pool} = require('pg');
const cors = require('cors');

const app=express();

app.use(express.json());

app.use(cors());

const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hotel_bd',
    password: '12345678',
    port: 5432
});

app.get('/clientes', async(req,res) =>{
    try{
        const result= await pool.query('select * from clientes');
        res.json(result.rows);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

app.get('/tipos_habitacion', async(req,res) =>{
    try{
        const result= await pool.query('select * from tipos_habitacion');
        res.json(result.rows);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

app.get('/habitaciones', async(req,res) =>{
    try{
        const result= await pool.query('select * from habitaciones');
        res.json(result.rows);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

app.get('/reserva', async(req,res) =>{
    try{
        const result= await pool.query('select * from reserva');
        res.json(result.rows);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

app.get('/pagos', async(req,res) =>{
    try{
        const result= await pool.query('select * from pagos');
        res.json(result.rows);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});


app.get('/', async(req,res) => {
    try{
        res.json({ mensaje: 'Api funcionando correctamente'});
    }catch(error){
        res.status(500).json({ error: error.message});
    }
});

app.post('/clientes', async (req,res) => {
    try{

        const {nombre, direccion, telefono} = req.body;
        const result= await pool.query(
            'INSERT INTO clientes (nombre,direccion,telefono) VALUES ($1,$2,$3)' ,
            [nombre,direccion,telefono]
        );

        res.json({
            mensaje:"Usuario creado correctamente",
            colegio: result.rows[0]
        });

    }catch(error){
        res.status(500).json({ error: error.message});
    }
});

app.delete('/habitaciones/:id_habi', async (req,res) => {
    try{
       const {id_habi} = req.params;
       const result= await pool.query('delete from habitaciones where id_habi = $1', [id_habi]);
        res.json({
            mensaje:"eliminado correctamente"
        });
     }catch(error){
        res.status(500).json({ error: error.message});
    }
});

// DELETE - Eliminar cliente
app.delete('/clientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM clientes WHERE id_clientes = $1', [id]);
        res.json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Editar cliente
app.put('/clientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono } = req.body;
        await pool.query(
            'UPDATE clientes SET nombre=$1, direccion=$2, telefono=$3 WHERE id_clientes=$4',
            [nombre, direccion, telefono, id]
        );
        res.json({ mensaje: "Cliente actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = $1 AND contrasena = $2',
            [usuario, contrasena]
        );

        if (result.rows.length > 0) {
            res.json({ success: true, mensaje: "Login correcto" });
        } else {
            res.json({ success: false, mensaje: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en la ruta http://localhost:3000");
});