import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiTurnosService } from '../../services/apiTurnos';
import { Turno } from '../models/turnosmodel';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css'],
  imports: [FormsModule, CommonModule],
})
export class AdminPanel implements OnInit {

  turnos: Turno[] = [];          // turnos desde backend
  cargando = true;
  error = '';

  // Para crear nuevos turnos
  nuevoTurno: any = {
    fecha: '',
    hora: '',
    servicio: ''
  };

  constructor(private turnoService: ApiTurnosService) {}

  ngOnInit() {
    this.cargarTurnosAdmin();
  }

  /** ===============================
   *  Cargar todos los turnos (ADMIN)
   *  ===============================  
   */
  cargarTurnosAdmin() {
    this.cargando = true;
    this.turnoService.getTurnosAdmin().subscribe({
      next: (data) => {
        this.turnos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar turnos', err);
        this.error = 'No se pudieron cargar los turnos.';
        this.cargando = false;
      }
    });
  }

  /** ===============================
   *  Confirmar turno (PUT)
   *  ===============================  
   */
  confirmar(turno: Turno) {
    this.turnoService.confirmarTurno(turno.id).subscribe({
      next: () => {
        turno.estado = "Confirmado";
      },
      error: () => {
        alert('No se pudo confirmar el turno.');
      }
    });
  }

  /** ===============================
   *  Cancelar turno (PUT)
   *  ===============================  
   */
  cancelar(turno: Turno) {
    this.turnoService.cancelarTurno(turno.id).subscribe({
      next: () => {
        turno.estado = "Cancelado";
      },
      error: () => {
        alert('No se pudo cancelar el turno.');
      }
    });
  }

  /** ===============================
   *  Crear nuevo turno (POST)
   *  ===============================  
   */
  crearTurno() {
    this.turnoService.crearTurno(this.nuevoTurno).subscribe({
      next: (t) => {
        this.turnos.push(t);
        this.nuevoTurno = { fecha: '', hora: '', servicio: '' };
        alert("Turno creado correctamente ✔");
      },
      error: () => {
        alert("Error al crear el turno.");
      }
    });
  }
}
