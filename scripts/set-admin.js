/**
 * @file Script de asignación de rol de administrador.
 * @description Promueve un usuario existente al rol de 'admin' basado en su correo electrónico.
 * @module scripts/set-admin
 */

const Usuario = require('../backend/models/Usuario');
const sequelize = require('../backend/config/database');

/**
 * @function setAdmin
 * @description Busca un usuario por email y actualiza su rol a 'admin'.
 * @returns {Promise<void>}
 */
async function setAdmin() {
    const email = process.argv[2];

    if (!email) {
        console.error('Error: Debes proporcionar el email del usuario.');
        console.log('Uso: node scripts/set-admin.js usuario@ejemplo.com');
        process.exit(1);
    }

    try {
        await sequelize.authenticate();
        console.log('Conexión a BD establecida.');

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            console.error(`Error: No se encontró ningún usuario con el email "${email}".`);
            console.log('Asegúrate de que el usuario ya se haya registrado e iniciado sesión al menos una vez.');
            process.exit(1);
        }

        if (usuario.rol === 'admin') {
            console.log(`El usuario ${email} YA es administrador.`);
            process.exit(0);
        }

        usuario.rol = 'admin';
        await usuario.save();

        console.log(`¡Éxito! El usuario ${email} ahora es ADMIN.`);

    } catch (error) {
        console.error('Error inesperado:', error);
    } finally {
        await sequelize.close();
    }
}

setAdmin();
