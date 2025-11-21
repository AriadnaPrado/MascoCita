const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
    type: DataTypes.STRING,
    defaultValue: "Disponible",
  },

  // ID del cliente (Cognito "sub"), null cuando nadie lo tomó
  idCliente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Turno;
