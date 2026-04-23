const express= require ('express');
const {Pool} = require('pg');
const cors = require('cors');

const app=express();

app.use(express.json());

app.use(cors());

const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'colegio_bd',
    password: '12345678',
    port: 5432
});


app.get('/estudiante', async(req,res) =>{
    try{
        const result= await pool.query('select * from estudiante');
        res.json(result.rows);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

app.get('/materia', async(req,res) =>{
    try{
        const result= await pool.query('select * from materia');
        res.json(result.rows);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

app.get('/colegio', async(req,res) =>{
    try{
        const result= await pool.query('select * from colegio');
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

app.post('/colegio', async (req,res) => {
    try{

        const {nombre, direccion, telefono} = req.body;
        const result= await pool.query(
            'INSERT INTO colegio (nombre,direccion,telefono) VALUES ($1,$2,$3)' ,
            [nombre,direccion,telefono]
        );

        res.json({
            mensaje:"Colegio creado correctamente",
            colegio: result.rows[0]
        });

    }catch(error){
        res.status(500).json({ error: error.message});
    }
});


app.listen(3000, () => {
    console.log("Servidor corriendo en la ruta http://localhost:3000");
});