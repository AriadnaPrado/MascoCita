/**
 * @file Script de verificación de usuario.
 * @description Verifica la existencia de un usuario en la base de datos mediante su ID.
 * @module scripts/check-user
 */

const Usuario = require('../backend/models/Usuario');
const sequelize = require('../backend/config/database');

/**
 * @function checkUser
 * @description Busca un usuario por su clave primaria (ID) y muestra el resultado en consola.
 * @returns {Promise<void>}
 */
async function checkUser() {
    const id = process.argv[2];

    if (!id) {
        console.error('Error: Debes proporcionar el ID del usuario.');
        process.exit(1);
    }

    try {
        await sequelize.authenticate();
        console.log('Conexión a BD establecida.');

        const usuario = await Usuario.findByPk(id);

        if (usuario) {
            console.log('Usuario encontrado:', usuario.toJSON());
        } else {
            console.log('Usuario NO encontrado en la base de datos.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkUser();
