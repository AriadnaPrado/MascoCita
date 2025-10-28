import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';        // necesario para ngModel
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
    { fecha: '2025-10-28', hora: '09:00', servicio: 'Corte de cabello', estado: 'Confirmado' },
    { fecha: '2025-10-29', hora: '11:30', servicio: 'Afeitado', estado: 'Pendiente' }
  ];

  nuevoTurno: Turno = { fecha: '', hora: '', servicio: '', estado: 'Pendiente' };

  reservar() {
    if (this.nuevoTurno.fecha && this.nuevoTurno.hora && this.nuevoTurno.servicio) {
      this.turnos.push({ ...this.nuevoTurno });
      this.nuevoTurno = { fecha: '', hora: '', servicio: '', estado: 'Pendiente' };
      alert('Turno reservado con éxito ✅');
    }
  }
}

