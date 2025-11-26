/**
 * @file Definición del modelo Usuario.
 * @module models/Usuario
 * @description Modelo Sequelize para la tabla de usuarios. Almacena información del perfil de usuario.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @typedef {object} Usuario
 * @description Estructura del modelo Usuario.
 * @property {string} id - Identificador único (sub de Cognito).
 * @property {string} nombre - Nombre completo del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} rol - Rol del usuario (cliente o admin).
 */

/**
 * @constant {import('sequelize').ModelCtor<Usuario>} Usuario
 * @description Definición del modelo Usuario.
 */
const Usuario = sequelize.define('Usuario', {
  /**
   * @description Identificador único del usuario. Corresponde al 'sub' de AWS Cognito.
   */
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  /**
   * @description Nombre completo del usuario.
   */
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  /**
   * @description Correo electrónico del usuario. Debe ser único.
   */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  /**
   * @description Rol del usuario en el sistema.
   * @default 'cliente'
   */
  rol: {
    type: DataTypes.ENUM('cliente', 'admin'),
    defaultValue: 'cliente'
  }
});

module.exports = Usuario;