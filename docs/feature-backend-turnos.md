# Implementación del Backend de Turnos

## Archivos a crear/modificar
- `backend/models/Turno.js` (Crear)
- `backend/index.js` (Modificar)

## Descripción Técnica
Esta funcionalidad habilita la persistencia de citas veterinarias en la base de datos.
1.  **Modelo de Datos:** Se crea la tabla `Turnos` en MariaDB. Esta tabla tendrá una relación de **Clave Foránea** con la tabla `Usuarios` (un Usuario tiene muchos Turnos).
2.  **API Endpoints:** Se exponen dos nuevas rutas REST protegidas (lógica de negocio):
    * `POST /api/turnos`: Para crear una nueva reserva asociada a un usuario.
    * `GET /api/turnos/:usuarioId`: Para obtener el historial de turnos de un usuario específico.

## Bloques de Código

### 1. `backend/models/Turno.js`
Definición del modelo Sequelize. La relación con `Usuario` se definirá en el `index.js`, por lo que aquí solo definimos los campos propios del turno.

```javascript
/**
 * @file Define el modelo 'Turno' para la gestión de citas veterinarias.
 * @module models/Turno
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Definición del modelo 'Turno'.
 * @type {import('sequelize').ModelCtor<any>}
 */
const Turno = sequelize.define('Turno', {
  /** Fecha de la cita (YYYY-MM-DD) */
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  /** Hora de la cita (HH:mm) */
  hora: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /** Tipo de servicio (ej. "Peluquería", "Veterinaria") */
  servicio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /** Estado del turno. Por defecto inicia en 'Pendiente'. */
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Pendiente'
  }
});

module.exports = Turno;