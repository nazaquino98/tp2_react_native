import { useState } from 'react';
import './App.css';

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
    <div style={styles.container}>
      <div style={{ ...styles.card }} className="fade-in">
        <img
          src="https://cdn-icons-png.flaticon.com/512/742/742751.png"
          alt="smiley"
          style={styles.icon}
        />
        <h1 style={styles.title}>Bienvenida personalizada</h1>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa tu nombre"
          style={styles.input}
        />
        <button onClick={validarNombre} style={styles.button}>
          Enviar
        </button>

        {mensaje && <p style={styles.success}>{mensaje}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '340px',
  },
  icon: {
    width: '64px',
    marginBottom: '1rem',
  },
  title: {
    color: '#333',
    marginBottom: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    width: '100%',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  success: {
    color: 'green',
    marginTop: '1rem',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
};

export default App;
