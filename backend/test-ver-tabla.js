/**
 * @file Script de diagnóstico para "visualizar" la estructura de la tabla 'Usuarios'.
 * @description Se conecta a la BD 'mascocitadb' (creada en el paso anterior)
 * y ejecuta 'DESCRIBE Usuarios' para mostrar su estructura en la consola.
 * @module test-ver-tabla
 */

const mariadb = require('mariadb');


const DB_HOST = 'mascocita-db.ct8ui22coaxu.us-east-1.rds.amazonaws.com';
const DB_USER = 'admin';
const DB_PASS = 'Falsoraton78';
const DB_NAME = 'mascocitadb';
const DB_PORT = 3306;


console.log(`Conectando a la BD '${DB_NAME}' para describir la tabla 'Usuarios'...`);

/**
 * @function verEstructuraTabla
 * @description Se conecta a la BD y ejecuta DESCRIBE Usuarios.
 * @async
 */
async function verEstructuraTabla() {
  let conn;
  try {
    /**
     * Establecemos la conexión CON SSL explícito.
     */
    conn = await mariadb.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      connectTimeout: 5000,
      ssl: {
        rejectUnauthorized: false
      }
    });
    console.log('¡Conexión a la BD exitosa!');

    /**
     * Ejecutamos el comando 'DESCRIBE Usuarios'
     * (O 'SHOW COLUMNS FROM Usuarios', que es un sinónimo).
     */
    const rows = await conn.query("DESCRIBE Usuarios;");

    console.log("------------------------------------------");
    console.log("Estructura de la tabla 'Usuarios':");

    /**
     * console.table() nos da una bonita visualización en la consola
     * de la estructura de la tabla.
     */
    console.table(rows);
    console.log("------------------------------------------");


  } catch (err) {
    /**
     * Si este script falla, puede ser porque el script 'index.js'
     * (que crea la tabla) no se ha ejecutado correctamente.
     */
    console.error('--- ERROR DE CONEXIÓN O CONSULTA ---');
    console.error('Código:', err.code);
    console.error('Mensaje:', err.sqlMessage || err.message);
    console.error('------------------------------------');
  } finally {
    if (conn) await conn.end();
    console.log('Script de visualización finalizado.');
    process.exit();
  }
}

// Ejecutamos la función
verEstructuraTabla();