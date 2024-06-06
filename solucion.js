const express = require('express');
const app = express();

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/usuarios', (req,res) =>{
    res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugar
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/usuarios')
})
 
app.get('/usuarios/:nombre', (req, res) => { 
    const nombre = req.params['nombre'];
    const usuario = usuarios.find(usuario => usuario.nombre === nombre );
    if(!usuario){
        res.status(404).json({mensaje: "usuario no encontrado"})
    }
    else{
    res.json(usuario); //envia json, objeto
   // res.send( `hola soy ${req.params['nombre']}, tengo ${result.edad} años y procedo de ${result.lugarProcedencia}`); //asi lee el json
    }
})

app.put('/usuarios/:nombre', (req, res) => {
    const actualizaUsuI = usuarios.findIndex(usuario => usuario.nombre === req.params['nombre']);
    if(!actualizaUsuI === -1){
        res.status(404).json({mensaje: "usuario no encontrado"})
    }
    else{
        usuarios[actualizaUsuI].nombre =  req.body.nombre,
        usuarios[actualizaUsuI].edad =  req.body.edad,
        usuarios[actualizaUsuI].lugarProcedencia =  req.body.lugarProcedencia,
        
        res.json(usuarios[actualizaUsuI]);
    } 
   // res.redirect('/usuarios')
});

app.delete('/usuarios/:nombre', (req, res) => { 
    const nombre = req.params.nombre;
    usuarios = usuarios.filter(user => user.nombre !== nombre) 
    res.json({mensaje:'usuario eliminado'})

});


app.listen(3000, () => {
    console.log('Express está escuchando en el puerto 3000');
    console.log('http://localhost:3000/usuarios');
}); 