const express = require("express");
const router = express.Router();
const turnoController = require("../Controller/TurnosController");

// Turnos del cliente
router.get("/cliente", turnoController.getTurnosDelCliente);

// Turnos disponibles
router.get("/disponibles", turnoController.getTurnosDisponibles);

// El cliente se asigna un turno
router.put("/asignar/:id", turnoController.asignarTurno);

module.exports = router;
