/**
 * @file Configura la conexión centralizada a la base de datos (AWS RDS)
 * utilizando Sequelize.
 * @module config/database
 */

const { Sequelize } = require('sequelize');

// --- TUS DATOS DE RDS ---
// Asegúrate de que sean EXACTAMENTE los mismos que funcionaron en tu test.
const DB_NAME = 'mascocitadb';
const DB_USER = 'admin';
const DB_PASS = 'Falsoraton78';
const DB_HOST = 'mascocita-db.ct8ui22coaxu.us-east-1.rds.amazonaws.com';
// ------------------------

/**
 * Instancia de Sequelize para la conexión con MariaDB.
 */
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mariadb',
  logging: console.log,

  /**
   * Opciones que se pasan DIRECTAMENTE al driver 'mariadb'.
   * Estas son las que funcionaron en tu script 'test-crear-db.js'.
   */
  dialectOptions: {
    // Configuración SSL obligatoria para AWS RDS
    ssl: {
      rejectUnauthorized: false
    },
    // Tiempo máximo que el driver esperará para establecer la conexión TCP inicial.
    // Aumentado a 60 segundos (60000 ms) para descartar latencia.
    connectTimeout: 60000
  },

  /**
   * Configuración del Pool de Conexiones de Sequelize.
   * Sequelize mantiene conexiones abiertas para reutilizarlas.
   */
  pool: {
    max: 5,     // Máximo de conexiones simultáneas
    min: 0,     // Mínimo (0 permite cerrar todas si no se usan)

    // Tiempo máximo (ms) que Sequelize intentará obtener una conexión antes de tirar error.
    // Aumentado a 60 segundos para igualar al connectTimeout.
    acquire: 60000,

    // Tiempo (ms) que una conexión puede estar inactiva antes de cerrarse.
    idle: 10000
  }
});

module.exports = sequelize;