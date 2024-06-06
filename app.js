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

app.get('/', (req,res) =>{
    res.send('<a href = "/usuarios"> Ver lista de Usuarios </a>')
})

app.get('/usuarios', (req,res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Usuarios</title>
    </head>
    <body>
        <h1>Lista de usuarios:</h1>
        <ul>
        ${usuarios.map(usuario => `<li> ${usuario.id}. ${usuario.nombre}, ${usuario.edad} años, procede de ${usuario.lugarProcedencia} <a href="/usuarios/${usuario.nombre}">Ver</a> </li>`).join('')}
        </ul>
        <form action="/usuarios" method ="post">
            <label for ="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for ="edad">Edad:</label>
            <input type="number" id="edad" name="edad" required>
            <label for ="lugar">Lugar de procedencia:</label>
            <input type="text" id="lugar" name="lugar" required>
            <button type="submit">Agregar usuario </button>
        </form>
    </body>
    </html>
  `)
})

app.get('/usuarios/:nombre', (req, res) => { 
    const result = usuarios.find(usuario => usuario.nombre == req.params['nombre']);
    res.send( `hola soy ${req.params['nombre']}, tengo ${result.edad} años y procedo de ${result.lugarProcedencia}`);
})


app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugar,
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/usuarios')
})
 

app.put('/usuarios/:nombre', (req, res) => {
    const actualizaUsuI = usuarios.findIndex(usuario => usuario.nombre == req.params['nombre']);
    if(actualizaUsuI == -1){
        res.status(404).json({mensaje: "usuario no encontrado"})
    }
    else{
        usuarios[actualizaUsuI].nombre =  req.body.nombre,
        usuarios[actualizaUsuI].edad =  req.body.edad,
        usuarios[actualizaUsuI].lugarProcedencia =  req.body.lugarProcedencia,
        
        res.json(usuarios[actualizaUsuI]);
            
    res.redirect('/usuarios')
    };
});

app.delete('/usuarios/:id', (req, res) => {
    const UsuId = usuarios.findIndex(usuario => usuario.id == req.params['id']);
    const usuBorrado = usuarios.splice(UsuId, 1);
    res.send(`Usuario eliminado: ${usuBorrado[0].nombre}`)

})


app.listen(3000, (req, res) => {
    console.log('Express está escuchando en el puerto 3000');
    console.log('http://localhost:3000');
}); 