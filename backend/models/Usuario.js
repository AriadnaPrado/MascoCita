/**
 * @file Define el modelo (tabla) 'Usuario' utilizando Sequelize.
 * @description Esta tabla almacena información del PERFIL del usuario,
 * no su información de autenticación (la cual es manejada por AWS Cognito).
 * @module models/Usuario
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa la conexión

/**
 * @typedef {object} Usuario
 * @description Define la estructura del perfil de Usuario.
 *
 * @property {string} id - El ID de usuario proveído por AWS Cognito (conocido como 'sub').
 * Se usará como nuestra Llave Primaria (Primary Key).
 * @property {string} nombre - Nombre del usuario.
 * @property {string} email - Email del usuario (debe ser único).
 */

/**
 * Definición del modelo 'Usuario' que representa la tabla 'Usuarios' en la BD.
 *
 * @type {import('sequelize').ModelCtor<Usuario>}
 */
const Usuario = sequelize.define('Usuario', {
  /**
   * Columna 'id' (Llave Primaria).
   * @description Almacenará el ID único (UUID o 'sub') que AWS Cognito
   * asigna a cada usuario. Esto vincula nuestra tabla de perfiles
   * con el sistema de autenticación de Cognito.
   * Reemplaza al 'id' auto-incremental por defecto.
   * @type {DataTypes.STRING}
   * @param {object} options - Opciones de la columna.
   * @param {boolean} options.primaryKey - Define esta columna como la Llave Primaria.
   * @param {boolean} options.allowNull - No puede ser nula.
   */
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  /**
   * Columna 'nombre'. Requerido (NOT NULL).
   * Almacena el nombre del perfil del usuario.
   *
   */
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  /**
   * Columna 'email'. Requerido (NOT NULL) y único (UNIQUE).
   * Almacena el email del usuario para referencia y búsquedas.
   * 
   */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }

  /**
   * AWS Cognito gestionará la autenticación y las contraseñas.
   */
  
  /* Nota: Sequelize aún añade 'createdAt' y 'updatedAt' automáticamente. */
});

/**
 * Exporta el modelo 'Usuario' para ser usado en otras partes de la aplicación.
 * @exports Usuario
 */
module.exports = Usuario;