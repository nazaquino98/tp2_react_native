import { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const validarNombre = async () => {
    setMensaje('');
    setError('');

    try {
      const res = await fetch(`http://localhost:3000/validar/${nombre}`);
      const data = await res.json();

      if (data.valido) {
        const resSaludo = await fetch(`http://localhost:3000/saludo/${nombre}`);
        const saludo = await resSaludo.json();
        setMensaje(saludo.mensaje);
      } else {
        setError('Nombre inválido');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Bienvenida personalizada</h1>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingresa tu nombre"
      />
      <button onClick={validarNombre}>Enviar</button>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
