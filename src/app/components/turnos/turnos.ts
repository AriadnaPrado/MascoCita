import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Turno } from '../models/turnosmodel';              // Modelo (class)
import { ApiTurnosService } from '../../services/apiTurnos'; // Service de la API

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.html',
  styleUrls: ['./turnos.css'],
  imports: [FormsModule, CommonModule],
})
export class Turnos implements OnInit {

  mostrarDisponibles: boolean = false;


  /** Turnos disponibles que vienen del backend */
  turnosDisponibles: Turno[] = [];

  /** Turnos ya reservados por el cliente */
  turnosDelCliente: Turno[] = [];

  /** ID del cliente (sub de Cognito). 
   *  Por ahora lo tomamos de localStorage hasta que esté integrada la auth.
   */
  idCliente: string = '';

  /** Flags de estado simples */
  cargando: boolean = true;
  errorMensaje: string = '';

  constructor(private turnoService: ApiTurnosService) {}

  ngOnInit(): void {
    // TODO: reemplazar esto por el sub real de Cognito cuando tengas la auth
    this.idCliente = localStorage.getItem('idCliente') || '';

    this.cargarTurnosDisponibles();
    this.cargarTurnosDelCliente();
  }

  /** Llama a GET /api/turnos/disponibles */
  cargarTurnosDisponibles(): void {
    this.cargando = true;
    this.turnoService.getTurnosDisponibles().subscribe({
      next: (turnos) => {
        this.turnosDisponibles = turnos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar turnos disponibles', err);
        this.errorMensaje = 'No se pudieron cargar los turnos disponibles.';
        this.cargando = false;
      }
    });
  }

  /** Llama a GET /api/turnos/cliente?idCliente=... */
  cargarTurnosDelCliente(): void {
    if (!this.idCliente) {
      console.warn('No hay idCliente definido todavía.');
      return;
    }

    this.turnoService.getTurnosDelCliente(this.idCliente).subscribe({
      next: (turnos) => {
        this.turnosDelCliente = turnos;
      },
      error: (err) => {
        console.error('Error al cargar turnos del cliente', err);
        this.errorMensaje = 'No se pudieron cargar tus turnos.';
      }
    });
  }

  /** Llama a PUT /api/turnos/asignar/:id para reservar un turno */
  reservar(turno: Turno): void {
    if (!this.idCliente) {
      alert('No se encontró el id del cliente. Debes iniciar sesión.');
      return;
    }

    this.turnoService.asignarTurno(turno.id, this.idCliente).subscribe({
      next: (respuesta) => {
        console.log('Turno asignado:', respuesta);
        alert('Turno reservado correctamente ');

        // Refrescamos las listas
        this.cargarTurnosDisponibles();
        this.cargarTurnosDelCliente();
      },
      error: (err) => {
        console.error('Error al asignar turno', err);
        alert('No se pudo reservar el turno. Intenta nuevamente.');
      }
    });
  }

  toggleDisponibles() {
  this.mostrarDisponibles = !this.mostrarDisponibles;
}

}
