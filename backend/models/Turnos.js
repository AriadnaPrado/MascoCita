const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * Modelo Turno
 * 
 * Estados permitidos:
 * - "Disponible" → El turno está libre y se muestra al cliente.
 * - "Reservado"  → Un cliente reservó el turno.
 * - "Confirmado" → Admin confirmó el turno.
 * - "Cancelado"  → Admin lo canceló (puede quedar libre de nuevo si así se decide).
 */
const Turno = sequelize.define("Turno", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  hora: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  estado: {
    type: DataTypes.ENUM("Disponible", "Reservado", "Confirmado", "Cancelado"),
    defaultValue: "Disponible",
  },

  /**
   * ID del cliente que reservó el turno.
   * Es el "sub" de Cognito (STRING).
   * Si es null → el turno está disponible.
   */
  idCliente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Turno;
