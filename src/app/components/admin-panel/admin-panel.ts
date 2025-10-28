import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';        // necesario para ngModel
import { CommonModule } from '@angular/common';

interface Turno {
  cliente: string;
  fecha: string;
  hora: string;
  servicio: string;
  estado: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,              // 
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css'],
  imports: [FormsModule, CommonModule],  // 
})
export class AdminPanel {
  turnos: Turno[] = [
    { cliente: 'Juan Pérez', fecha: '2025-10-26', hora: '09:00', servicio: 'Corte de cabello', estado: 'Pendiente' },
    { cliente: 'María Gómez', fecha: '2025-10-27', hora: '10:30', servicio: 'Afeitado', estado: 'Confirmado' }
  ];

  cambiarEstado(turno: Turno, nuevo: string) {
    turno.estado = nuevo;
  }
}
