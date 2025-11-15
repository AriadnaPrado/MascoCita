/**
 * @file Archivo principal del servidor backend (API) de Mascocita.
 * @description Inicia un servidor Express, se conecta a la BD y sincroniza los modelos.
 * El uso de Node.js y Express se alinea con la documentación del proyecto.
 * @module index
 */

const express = require('express');

/**
 * Importamos la instancia de Sequelize (conexión a la BD).
 * @type {import('sequelize').Sequelize}
 */
const sequelize = require('./config/database');

/**
 * Importamos los modelos definidos para la sincronización.
 * @type {import('sequelize').ModelCtor<import('./models/Usuario').Usuario>}
 */
const Usuario = require('./models/Usuario');
/* (A futuro, aquí importarás más modelos, ej: const Turno = require('./models/Turno');) */

/** Instancia de la aplicación Express */
const app = express();
const port = 3000;

/* --- Middlewares --- */

/**
 * @description Middleware de Express para parsear (convertir)
 * las peticiones entrantes con formato JSON.
 * Esencial para que req.body funcione.
 */
app.use(express.json());


/**
 * @function iniciarServidor
 * @description Función asíncrona que inicializa la conexión a la
 * base de datos y levanta el servidor Express.
 * @async
 */
async function iniciarServidor() {
  try {
    /**
     * Prueba la conexión a la base de datos.
     */
    await sequelize.authenticate();
    console.log('Conexión a AWS RDS (MariaDB) establecida correctamente.');

    /**
     * Sincroniza los modelos en modo "seguro" (sin force: true).
     * Esto crea las tablas si no existen, pero NO las borra.
     */
    await sequelize.sync(); 
    console.log('Modelos sincronizados con la base de datos.');

    /**
     * Inicia el servidor Express.
     */
    app.listen(port, () => {
      console.log(`Servidor backend escuchando en http://localhost:${port}`);
    });

  } catch (error) {
    /**
     * Maneja cualquier error durante la inicialización.
     */
    console.error('Error al iniciar el servidor o conectar a la BD:', error);
  }
}

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
 * @description Esta ruta está diseñada para ser llamada por nuestro PROPIO
 * frontend (Angular) después de que un usuario se confirma exitosamente
 * en AWS Cognito. El frontend enviará el 'id' (sub), 'email' y 'nombre'
 * del nuevo usuario para crear su perfil en nuestra BD.
 * @async
 * @param {object} req - El objeto de solicitud (request).
 * @param {object} req.body - El cuerpo de la solicitud, debe contener { id, email, nombre }.
 * @param {string} req.body.id - El ID 'sub' único de AWS Cognito.
 * @param {string} req.body.email - El email del usuario.
 * @param {string} req.body.nombre - El nombre del usuario.
 * @param {object} res - El objeto de respuesta (response).
 */
app.post('/api/usuarios', async (req, res) => {
  try {
    /**
     * Extraemos los datos del perfil del cuerpo de la solicitud.
     * Estos datos vendrán de AWS (Lambda/Cognito).
     */
    const { id, email, nombre } = req.body;

    /**
     * Validación simple de entrada.
     */
    if (!id || !email || !nombre) {
      return res.status(400).json({ 
        error: "Faltan datos requeridos: id, email, y nombre son necesarios." 
      });
    }

    /**
     * Creamos el nuevo perfil de usuario en nuestra tabla 'Usuarios'
     * usando el modelo de Sequelize.
     */
    const nuevoUsuario = await Usuario.create({
      id: id,
      email: email,
      nombre: nombre
    });

    /**
     * Respondemos con un código 201 (Creado) y la información
     * del perfil que se guardó en nuestra BD.
     */
    res.status(201).json(nuevoUsuario);

  } catch (error) {
    /**
     * Manejo de errores.
     * Si el email o el id ya existen, Sequelize arrojará un error
     * de 'SequelizeUniqueConstraintError'.
     */
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        error: "Error de restricción única: El email o ID ya existe." 
      });
    }
    
    /**
     * Captura de cualquier otro error inesperado del servidor.
     */
    console.error('Error en POST /api/usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});


/* --- Inicio de la Aplicación --- */
iniciarServidor();