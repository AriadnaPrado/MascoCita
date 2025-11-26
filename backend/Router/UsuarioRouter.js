const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

/**
 * GET /api/usuarios/:id/rol
 * Obtiene el rol del usuario ('cliente' o 'admin').
 */
router.get('/:id/rol', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('🔍 Backend: Buscando rol para ID:', id); // LOG NUEVO
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ rol: usuario.rol });
    } catch (error) {
        console.error("Error al obtener rol:", error);
        res.status(500).json({ error: "Error interno" });
    }
});

module.exports = router;
