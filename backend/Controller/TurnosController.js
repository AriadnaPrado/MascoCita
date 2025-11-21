const Turno = require("../models/Turnos");

/**
 * GET /api/turnos/cliente
 * Muestra todos los turnos de un cliente
 */
exports.getTurnosDelCliente = async (req, res) => {
  try {
    const { idCliente } = req.query; // viene del frontend

    if (!idCliente) {
      return res.status(400).json({ error: "Falta el idCliente" });
    }

    const turnos = await Turno.findAll({
      where: { idCliente }
    });

    return res.json(turnos);

  } catch (error) {
    console.error("Error al obtener turnos del cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * GET /api/turnos/disponibles
 * Muestra todos los turnos con estado 'Disponible'
 */
exports.getTurnosDisponibles = async (req, res) => {
  try {
    const turnos = await Turno.findAll({
      where: { estado: "Disponible" }
    });

    return res.json(turnos);

  } catch (error) {
    console.error("Error al obtener turnos disponibles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * PUT /api/turnos/asignar/:id
 * Permite que el cliente reserve un turno
 */
exports.asignarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { idCliente } = req.body;

    if (!idCliente) {
      return res.status(400).json({ error: "Falta idCliente en el body" });
    }

    const turno = await Turno.findByPk(id);

    if (!turno) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }

    if (turno.estado !== "Disponible") {
      return res.status(400).json({ error: "El turno no está disponible" });
    }

    turno.estado = "Reservado";
    turno.idCliente = idCliente;

    await turno.save();

    return res.json({ mensaje: "Turno asignado correctamente", turno });

  } catch (error) {
    console.error("Error al asignar turno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
