/**
 * @file Definición del modelo Turno.
 * @module models/Turno
 * @description Modelo Sequelize para la gestión de turnos.
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * @constant {import('sequelize').ModelCtor<Turno>} Turno
 * @description Definición del modelo Turno.
 */
const Turno = sequelize.define("Turno", {
  /**
   * @description Identificador único del turno.
   */
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  /**
   * @description Fecha del turno.
   */
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  /**
   * @description Hora del turno.
   */
  hora: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  /**
   * @description Servicio solicitado.
   */
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  /**
   * @description Estado actual del turno.
   * @default 'Disponible'
   */
  estado: {
    type: DataTypes.ENUM("Disponible", "Reservado", "Confirmado", "Cancelado"),
    defaultValue: "Disponible",
  },

  /**
   * @description Identificador del cliente que reservó el turno (sub de Cognito).
   */
  idCliente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Turno;
