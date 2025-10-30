import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Turno {
  fecha: string;
  hora: string;
  servicio: string;
  estado: string;
}

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.html',
  styleUrls: ['./turnos.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class Turnos {
  turnos: Turno[] = [
    { fecha: '2025-10-28', hora: '09:00', servicio: 'Peluqueria', estado: 'Confirmado' },
    { fecha: '2025-10-31', hora: '11:30', servicio: 'Consulta con Veterinario', estado: 'Pendiente' },
  ];

  nuevoTurno: Turno = { fecha: '', hora: '', servicio: '', estado: 'Pendiente' };
  mostrarFormulario = false;

  mostrarCampos() {
    this.mostrarFormulario = !this.mostrarFormulario; // alterna visibilidad
  }

  reservar() {
    if (this.nuevoTurno.fecha && this.nuevoTurno.hora && this.nuevoTurno.servicio) {
      this.turnos.push({ ...this.nuevoTurno });
      this.nuevoTurno = { fecha: '', hora: '', servicio: '', estado: 'Pendiente' };
      this.mostrarFormulario = false; // oculta el formulario luego de reservar
      alert('Turno reservado con éxito ✅');
    }
  }
}
