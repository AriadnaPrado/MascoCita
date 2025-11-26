/**
 * @file Configuración de la conexión a la base de datos.
 * @module config/database
 * @description Establece la conexión con la base de datos AWS RDS utilizando Sequelize.
 */

const { Sequelize } = require('sequelize');

/**
 * @constant {string} DB_NAME - Nombre de la base de datos.
 */
const DB_NAME = 'mascocitadb';

/**
 * @constant {string} DB_USER - Usuario de la base de datos.
 */
const DB_USER = 'admin';

/**
 * @constant {string} DB_PASS - Contraseña de la base de datos.
 */
const DB_PASS = 'Falsoraton78';

/**
 * @constant {string} DB_HOST - Host de la base de datos.
 */
const DB_HOST = 'mascocita-db.ct8ui22coaxu.us-east-1.rds.amazonaws.com';

/**
 * @constant {import('sequelize').Sequelize} sequelize
 * @description Instancia de Sequelize configurada para MariaDB.
 */
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mariadb',
  logging: console.log,

  /**
   * @description Opciones específicas del dialecto MariaDB.
   */
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    },
    connectTimeout: 60000
  },

  /**
   * @description Configuración del pool de conexiones.
   */
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
});

module.exports = sequelize;