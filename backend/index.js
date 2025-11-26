/**
 * @file Archivo principal del servidor backend (API).
 * @module index
 * @description Punto de entrada de la aplicación Node.js. Configura el servidor Express, la conexión a base de datos y los endpoints.
 * @requires express
 * @requires cors
 * @requires sequelize
 */

const express = require('express');
const cors = require('cors');

/**
 * @constant {import('sequelize').Sequelize} sequelize
 * @description Instancia de conexión a la base de datos.
 * @see module:config/database
 */
const sequelize = require('./config/database');

/**
 * @description Importación de modelos para sincronización.
 */
const Usuario = require('./models/Usuario');
const Turno = require('./models/Turnos');

/**
 * @constant {import('express').Application} app
 * @description Instancia de la aplicación Express.
 */
const app = express();
const port = 3000;

app.use(cors());

/**
 * @description Middleware para el parseo de cuerpos JSON en las peticiones.
 */
app.use(express.json());

/* -------------------------------------------------------------------------- */
/* RUTAS                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * @route GET /
 * @description Endpoint de verificación de estado (Health Check).
 * @param {import('express').Request} req - Objeto de solicitud.
 * @param {import('express').Response} res - Objeto de respuesta.
 */
app.get('/', (req, res) => {
  res.send('API de Mascocita funcionando y conectada a RDS.');
});

/**
 * @route POST /api/usuarios
 * @description Crea un nuevo perfil de usuario en la base de datos.
 * @param {import('express').Request} req - Objeto de solicitud.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {string} req.body.id - Identificador único del usuario (sub).
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.nombre - Nombre completo del usuario.
 * @param {import('express').Response} res - Objeto de respuesta.
 * @returns {object} 201 - Usuario creado exitosamente.
 * @returns {object} 400 - Error de validación o duplicado.
 * @returns {object} 500 - Error interno del servidor.
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
      nombre: nombre,
      email: email
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
 * @description Rutas para la gestión de turnos.
 */
app.use("/api/turnos", require("./Router/TurnosRouter"));

/**
 * @description Rutas para la gestión de usuarios.
 */
app.use("/api/usuarios", require("./Router/UsuarioRouter"));

/* --- Inicio del Servidor --- */

/**
 * @function iniciarServidor
 * @description Inicializa la conexión a la base de datos y pone en marcha el servidor Express.
 * @returns {Promise<void>}
 */
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

