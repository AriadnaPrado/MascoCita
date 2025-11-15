/**
 * @file Configura la conexión centralizada a la base de datos (AWS RDS)
 * utilizando Sequelize.
 * @module config/database
 */

const { Sequelize } = require('sequelize');


const DB_NAME = 'mascocitadb';
const DB_USER = 'admin';
const DB_PASS = 'mascocita7890';
const DB_HOST = 'mascocita-db.ct8ui22coaxu.us-east-1.rds.amazonaws.com';

/**
 * Instancia de Sequelize para la conexión con la base de datos MariaDB.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mariadb',
  logging: console.log, // Muestra las consultas SQL en la consola

  /**
   * Opciones específicas del dialecto (mariadb).
   */
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    },
    connectTimeout: 10000 // 10 segundos de timeout para la conexión
  },

  /**
   * Configuración de la piscina de conexiones (Connection Pool).
   * Le damos más tiempo a la piscina para adquirir una conexión.
   */
  pool: {
    max: 5,  // Máximo 5 conexiones en la piscina
    min: 0,  // Mínimo 0 conexiones
    acquire: 30000, // 30 segundos de tiempo de espera para adquirir una conexión
    idle: 10000     // 10 segundos antes de que una conexión inactiva se libere
  }
});

/**
 * Exporta la instancia de sequelize...
 * @exports sequelize
 */
module.exports = sequelize;