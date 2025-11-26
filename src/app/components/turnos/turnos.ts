/**
 * @file Componente de gestión de turnos.
 * @module components/turnos
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turno } from '../models/turnosmodel';
import { ApiTurnosService } from '../../services/apiTurnos';
import { getCurrentUser } from 'aws-amplify/auth';

/**
 * @class Turnos
 * @description Componente que permite a los usuarios visualizar turnos disponibles y gestionar sus reservas.
 * @component
 * @selector app-turnos
 * @standalone true
 */
@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.html',
  styleUrls: ['./turnos.css'],
  imports: [FormsModule, CommonModule],
})
export class Turnos implements OnInit {

  /**
   * @property {boolean} mostrarDisponibles - Controla la visibilidad de la lista de turnos disponibles.
   */
  mostrarDisponibles: boolean = false;

  /**
   * @property {Turno[]} turnosDisponibles - Lista de turnos disponibles obtenidos del backend.
   */
  turnosDisponibles: Turno[] = [];

  /**
   * @property {Turno[]} turnosDelCliente - Lista de turnos reservados por el cliente actual.
   */
  turnosDelCliente: Turno[] = [];

  /**
   * @property {string} idCliente - Identificador único del cliente (sub de Cognito).
   */
  idCliente: string = '';

  /**
   * @property {boolean} cargando - Indica si se está realizando una operación de carga.
   */
  cargando: boolean = true;

  /**
   * @property {string} errorMensaje - Mensaje de error para mostrar en la interfaz.
   */
  errorMensaje: string = '';

  /**
   * @constructor
   * @param {ApiTurnosService} turnoService - Servicio para la gestión de turnos.
   */
  constructor(private turnoService: ApiTurnosService) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente, obtiene el usuario actual y carga sus turnos y los disponibles.
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    try {
      const user = await getCurrentUser();
      this.idCliente = user.userId;

      this.cargarTurnosDisponibles();
      this.cargarTurnosDelCliente();
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      this.errorMensaje = 'Debes iniciar sesión para ver tus turnos.';
      this.cargando = false;
    }
  }

  /**
   * @method cargarTurnosDisponibles
   * @description Obtiene la lista de turnos disponibles desde el backend.
   * @returns {void}
   */
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

  /**
   * @method cargarTurnosDelCliente
   * @description Obtiene la lista de turnos reservados por el cliente actual.
   * @returns {void}
   */
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

  /**
   * @method reservar
   * @description Reserva un turno específico para el cliente actual.
   * @param {Turno} turno - El turno a reservar.
   * @returns {void}
   */
  reservar(turno: Turno): void {
    if (!this.idCliente) {
      alert('No se encontró el id del cliente. Debes iniciar sesión.');
      return;
    }

    this.turnoService.asignarTurno(turno.id, this.idCliente).subscribe({
      next: (respuesta) => {
        console.log('Turno asignado:', respuesta);
        alert('Turno reservado correctamente ');

        this.cargarTurnosDisponibles();
        this.cargarTurnosDelCliente();
      },
      error: (err) => {
        console.error('Error al asignar turno', err);
        alert('No se pudo reservar el turno. Intenta nuevamente.');
      }
    });
  }

  /**
   * @method toggleDisponibles
   * @description Alterna la visibilidad de la sección de turnos disponibles.
   * @returns {void}
   */
  toggleDisponibles(): void {
    this.mostrarDisponibles = !this.mostrarDisponibles;
  }

}
