/**
 * @file Archivo principal del servidor backend (API) de Mascocita.
 * @module index
 * @description Punto de entrada de la aplicación Node.js. Se encarga de:
 * 1. Configurar e iniciar el servidor Express.
 * 2. Establecer la conexión con Amazon RDS (MariaDB) mediante Sequelize.
 * 3. Sincronizar los modelos de datos.
 * 4. Exponer los endpoints REST para la comunicación con el Frontend.
 * @requires express
 * @requires cors
 * @requires sequelize
 */

const express = require('express');
const cors = require('cors');

/**
 * Instancia de conexión a la base de datos configurada con credenciales de AWS RDS.
 * @type {import('sequelize').Sequelize}
 * @see module:config/database
 */
const sequelize = require('./config/database');

/**
 * Modelo de Usuario (Perfil).
 * Importado para permitir la sincronización de la tabla 'Usuarios' en la BD.
 * @type {import('sequelize').ModelCtor<import('./models/Usuario')>}
 */
const Usuario = require('./models/Usuario');

/**
 * Instancia de la aplicación Express.
 */
const app = express();

/**
 * Puerto de escucha del servidor.
 * @constant {number}
 */
const port = 3000;

/* -------------------------------------------------------------------------- */
/* MIDDLEWARES                                */
/* -------------------------------------------------------------------------- */

/**
 * Configuración de CORS (Cross-Origin Resource Sharing).
 * Permite que el frontend (ej. http://localhost:4200) realice peticiones a este backend.
 */
app.use(cors());

/**
 * Parser de JSON.
 * Permite leer los datos enviados en el cuerpo (body) de las peticiones HTTP
 * y los convierte en objetos JavaScript accesibles mediante req.body.
 */
app.use(express.json());

/* -------------------------------------------------------------------------- */
/* INICIALIZACIÓN                                 */
/* -------------------------------------------------------------------------- */

/**
 * @function iniciarServidor
 * @async
 * @description Función orquestadora que inicializa la infraestructura del backend.
 * Realiza la conexión a la base de datos, sincroniza las tablas y levanta el servidor HTTP.
 * @throws {Error} Si falla la autenticación con la BD o la sincronización.
 */
async function iniciarServidor() {
  try {
    /**
     * Verifica la conectividad con AWS RDS.
     */
    await sequelize.authenticate();
    console.log('✅ Conexión a AWS RDS (MariaDB) establecida correctamente.');

    /**
     * Sincroniza los modelos definidos con la base de datos.
     * Nota: No se utiliza { force: true } para preservar los datos existentes.
     */
    await sequelize.sync();
    console.log('✅ Modelos sincronizados con la base de datos.');

    /**
     * Inicia la escucha de peticiones HTTP.
     */
    app.listen(port, () => {
      console.log(`🚀 Servidor backend escuchando en http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error);
  }
}

/* -------------------------------------------------------------------------- */
/* RUTAS                                    */
/* -------------------------------------------------------------------------- */

/**
 * @route GET /
 * @description Endpoint de estado (Health Check).
 * Verifica que la API está operativa y tiene conexión a la base de datos.
 * @param {import('express').Request} req - Objeto de solicitud.
 * @param {import('express').Response} res - Objeto de respuesta.
 */
app.get('/', (req, res) => {
  res.send('API de Mascocita funcionando y conectada a RDS.');
});

/**
 * @route POST /api/usuarios
 * @description Crea un nuevo perfil de usuario en la base de datos RDS.
 * Este endpoint es consumido por el Frontend inmediatamente después de un registro exitoso en Amazon Cognito.
 * * @param {import('express').Request} req - Objeto de solicitud.
 * @param {object} req.body - Datos del usuario.
 * @param {string} req.body.id - El ID único (sub) proporcionado por Amazon Cognito.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.nombre - El nombre completo del usuario.
 * @param {import('express').Response} res - Objeto de respuesta.
 * * @returns {object} 201 - Objeto JSON con el usuario creado.
 * @returns {object} 400 - Error de validación o duplicado.
 * @returns {object} 500 - Error interno del servidor.
 */
app.post('/api/usuarios', async (req, res) => {
  try {
    const { id, email, nombre } = req.body;

    /**
     * Validación de campos requeridos.
     */
    if (!id || !email || !nombre) {
      return res.status(400).json({ error: "Faltan datos: id, email y nombre son requeridos." });
    }

    /**
     * Creación del registro en la tabla 'Usuarios'.
     */
    const nuevoUsuario = await Usuario.create({
      id: id,
      nombre: nombre,
      email: email
    });

    res.status(201).json(nuevoUsuario);

  } catch (error) {
    console.error('Error en POST /api/usuarios:', error);

    /**
     * Manejo específico para violación de unicidad (ej. ID o Email ya registrados).
     */
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "El usuario ya existe en la base de datos." });
    }

    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

/* Ejecución de la función de inicio */
iniciarServidor();