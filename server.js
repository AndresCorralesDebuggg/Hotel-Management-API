require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express= require ('express');
const {Pool} = require('pg');
const cors = require('cors');

const app=express();

app.use(express.json());

app.use(cors());

const pool= new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});



//RUTAS Registro

//Registro
app.post('/registro', async (req,res)=>{
    try {
        const {usuario,contrasena}=req.body;
        //Generar Hash de contraseña
        const saltRounds = 10;//Decirle a bcrypt que ejecute 2^10 veces el algoritmo no paralelizable
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        //Guardar nuevo usuario en la BD
        const result = await pool.query('INSERT INTO usuarios (usuario,contrasena) VALUES ($1, $2) RETURNING id_usuario, usuario',
            [usuario, hashedPassword]
        );
        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: result.rows[0]
        });
    } catch (error) {
        if(error.code === '23505'){
            return res.status(400).json({error: "El email ya está en uso por otro usuario"+error.message});
        }
        res.status(500).json({error:"No se ha podido registrar en usuario: "+error.message})
    }
});


const verificarToken = (req,res,next)=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({error: "acceso denegado, token de autentificacion requerido"})
    }
    try {
        const verificado = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verificado;
        next();
    } catch(error) {
        res.status(401).json({error: "Token no validado correctly: "+ error.message});
    }


};


//Rutas Tareas

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

app.post('/clientes', verificarToken, async (req,res) => {
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
     try{
            const {usuario,contrasena} = req.body;
            const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1',[usuario]);
            if (result.rows.length === 0){
                return res.status(401).json({error: "Credenciales Incorrectas"});
            }
            const usuarioDB = result.rows[0];
            const esValida = await bcrypt.compare(contrasena, usuarioDB.contrasena);
            if (!esValida){
                return res.status(401).json({error: "Credenciales incorrectas"})
            }

            const token = jwt.sign({id: usuarioDB.id_usuario},process.env.JWT_SECRET, {expiresIn: '2h'});
            res.json({token});
        }catch(error) {
            res.status(500).json({error:"No se pudo iniciar sesion: "+ error.message});
        }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en la ruta http://localhost:3000");
});