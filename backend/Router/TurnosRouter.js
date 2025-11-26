const express = require("express");
const router = express.Router();
const turnoController = require("../Controller/TurnosController");

// Turnos del cliente
router.get("/cliente", turnoController.getTurnosDelCliente);

// Turnos disponibles
router.get("/disponibles", turnoController.getTurnosDisponibles);

// El cliente se asigna un turno
router.put("/asignar/:id", turnoController.asignarTurno);

// Admin
router.get("/admin/todos", turnoController.adminGetTodos);
router.post("/admin/crear", turnoController.adminCrearTurno);
router.put("/admin/confirmar/:id", turnoController.adminConfirmarTurno);

router.put("/admin/cancelar/:id", turnoController.adminCancelarTurno);
router.put("/admin/publicar/:id", turnoController.adminPublicarTurno);

module.exports = router;
