/**
 * @file Archivo principal del servidor backend (API) de Mascocita.
 * @description Inicia un servidor Express, se conecta a la BD y sincroniza los modelos.
 * @module index
 */

const express = require('express');
const cors = require('cors');

/**
 * Importamos la instancia de Sequelize (conexión a la BD).
 * @type {import('sequelize').Sequelize}
 */
const sequelize = require('./config/database');

/**
 * Importamos los modelos definidos para la sincronización.
 */
const Usuario = require('./models/Usuario');   // Modelo de Usuario
const Turno = require('./models/Turnos');       // Modelo de Turno (nuevo)

/** Instancia de la aplicación Express */
const app = express();
const port = 3000;
app.use(cors());

/* --- Middlewares --- */

/**
 * @description Middleware de Express para parsear JSON.
 */
app.use(express.json());

/* --- Rutas de la API (Endpoints) --- */

/**
 * @route GET /
 * @description Ruta de prueba para verificar que el servidor está en línea.
 */
app.get('/', (req, res) => {
  res.send('API de Mascocita. ¡Conectado a MariaDB en RDS!');
});

/**
 * @route POST /api/usuarios
 * @description Crea el perfil de usuario luego de registrarse en Cognito.
 */
app.post('/api/usuarios', async (req, res) => {
  try {
    const { id, email, nombre } = req.body;

    if (!id || !email || !nombre) {
      return res.status(400).json({
        error: "Faltan datos requeridos: id, email, y nombre son necesarios."
      });
    }

    const nuevoUsuario = await Usuario.create({
      id: id,
      email: email,
      nombre: nombre
    });

    res.status(201).json(nuevoUsuario);

  } catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: "Error de restricción única: El email o ID ya existe."
      });
    }

    console.error('Error en POST /api/usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

/**
 * @route /api/turnos
 * @description Rutas para gestionar turnos de clientes y admin.
 */
app.use("/api/turnos", require("./Router/TurnosRouter"));

/* --- Inicio del Servidor --- */

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a AWS RDS (MariaDB) establecida correctamente.');

    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(port, () => {
      console.log(`Servidor backend escuchando en http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor o conectar a la BD:', error);
  }
}

iniciarServidor();
