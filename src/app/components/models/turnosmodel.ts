export class Turno {

  id: number;
  fecha: string;
  hora: string;
  servicio: string;
  estado: string;
  idCliente: string | null;

  constructor(
    id: number,
    fecha: string,
    hora: string,
    servicio: string,
    estado: string = 'Disponible',
    idCliente: string | null = null
  ) {
    this.id = id;
    this.fecha = fecha;
    this.hora = hora;
    this.servicio = servicio;
    this.estado = estado;
    this.idCliente = idCliente;
  }
}
