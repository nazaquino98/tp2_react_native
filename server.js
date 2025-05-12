const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const usuariosValidos = ['maxi', 'tati', 'mauri', 'anto', 'naza'];

// Ruta para validar el nombre
app.get('/validar/:nombre', (req, res) => {
  const { nombre } = req.params;
  const esValido = usuariosValidos.includes(nombre.toLowerCase());
  res.json({ valido: esValido });
});

// Ruta para devolver saludo
app.get('/saludo/:nombre', (req, res) => {
  const { nombre } = req.params;
  res.json({ mensaje: `Hola, ${nombre}!` });
});

// Servidor escuchando
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
