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

exports.adminGetTodos = async (req, res) => {
  try {
    const turnos = await Turno.findAll();
    return res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los turnos." });
  }
};

exports.adminCrearTurno = async (req, res) => {
  try {
    const { fecha, hora, servicio } = req.body;

    if (!fecha || !hora || !servicio) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const nuevoTurno = await Turno.create({
      fecha,
      hora,
      servicio,
      estado: "Pendiente",
      idCliente: null
    });

    res.status(201).json(nuevoTurno);

  } catch (error) {
    res.status(500).json({ error: "Error al crear turno" });
  }
};

exports.adminConfirmarTurno = async (req, res) => {
  try {
    const { id } = req.params;

    const turno = await Turno.findByPk(id);
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });

    turno.estado = "Confirmado";
    await turno.save();

    res.json({ mensaje: "Turno confirmado", turno });

  } catch (error) {
    res.status(500).json({ error: "Error al confirmar turno" });
  }
};

exports.adminCancelarTurno = async (req, res) => {
  try {
    const { id } = req.params;

    const turno = await Turno.findByPk(id);
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });

    turno.estado = "Cancelado";
    await turno.save();

    res.json({ mensaje: "Turno cancelado", turno });

  } catch (error) {
    res.status(500).json({ error: "Error al cancelar turno" });
  }
};

exports.adminPublicarTurno = async (req, res) => {
  try {
    const { id } = req.params;

    const turno = await Turno.findByPk(id);
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });

    turno.estado = "Disponible";
    await turno.save();

    res.json({ mensaje: "Turno publicado", turno });

  } catch (error) {
    res.status(500).json({ error: "Error al publicar turno" });
  }
};

