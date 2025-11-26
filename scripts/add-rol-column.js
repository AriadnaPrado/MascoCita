/**
 * @file Script de migración manual.
 * @description Agrega la columna 'rol' a la tabla 'Usuarios' en la base de datos.
 * @module scripts/add-rol-column
 */

const sequelize = require('../backend/config/database');

/**
 * @function addRolColumn
 * @description Ejecuta una consulta SQL para alterar la tabla 'Usuarios' y agregar la columna 'rol'.
 * @returns {Promise<void>}
 */
async function addRolColumn() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a BD establecida.');

        await sequelize.query(`
      ALTER TABLE Usuarios
      ADD COLUMN rol ENUM('cliente', 'admin') DEFAULT 'cliente';
    `);

        console.log('Columna "rol" agregada correctamente.');

    } catch (error) {
        if (error.original && error.original.code === 'ER_DUP_FIELDNAME') {
            console.log('La columna "rol" ya existe.');
        } else {
            console.error('Error al agregar columna:', error);
        }
    } finally {
        await sequelize.close();
    }
}

addRolColumn();
