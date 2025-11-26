/**
 * @file Componente del panel de administración.
 * @module components/admin-panel
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiTurnosService } from '../../services/apiTurnos';
import { Turno } from '../models/turnosmodel';

/**
 * @class AdminPanel
 * @description Componente para la gestión administrativa de turnos (crear, confirmar, cancelar, publicar).
 * @component
 * @selector app-admin-panel
 * @standalone true
 */
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css'],
  imports: [FormsModule, CommonModule],
})
export class AdminPanel implements OnInit {

  /**
   * @property {Turno[]} turnos - Lista de todos los turnos del sistema.
   */
  turnos: Turno[] = [];

  /**
   * @property {boolean} cargando - Indica si se están cargando los datos.
   */
  cargando = true;

  /**
   * @property {string} error - Mensaje de error para mostrar en la interfaz.
   */
  error = '';

  /**
   * @property {object} nuevoTurno - Objeto temporal para la creación de un nuevo turno.
   */
  nuevoTurno: any = {
    fecha: '',
    hora: '',
    servicio: ''
  };

  /**
   * @constructor
   * @param {ApiTurnosService} turnoService - Servicio para la gestión de turnos.
   */
  constructor(private turnoService: ApiTurnosService) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente cargando la lista de turnos.
   * @returns {void}
   */
  ngOnInit(): void {
    this.cargarTurnosAdmin();
  }

  /**
   * @method cargarTurnosAdmin
   * @description Obtiene todos los turnos registrados en el sistema.
   * @returns {void}
   */
  cargarTurnosAdmin(): void {
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

  /**
   * @method confirmar
   * @description Cambia el estado de un turno a 'Confirmado'.
   * @param {Turno} turno - El turno a confirmar.
   * @returns {void}
   */
  confirmar(turno: Turno): void {
    this.turnoService.confirmarTurno(turno.id).subscribe({
      next: () => {
        turno.estado = "Confirmado";
      },
      error: () => {
        alert('No se pudo confirmar el turno.');
      }
    });
  }

  /**
   * @method cancelar
   * @description Cambia el estado de un turno a 'Cancelado'.
   * @param {Turno} turno - El turno a cancelar.
   * @returns {void}
   */
  cancelar(turno: Turno): void {
    this.turnoService.cancelarTurno(turno.id).subscribe({
      next: () => {
        turno.estado = "Cancelado";
      },
      error: () => {
        alert('No se pudo cancelar el turno.');
      }
    });
  }

  /**
   * @method publicar
   * @description Cambia el estado de un turno a 'Disponible' para que sea visible por los clientes.
   * @param {Turno} turno - El turno a publicar.
   * @returns {void}
   */
  publicar(turno: Turno): void {
    this.turnoService.publicarTurno(turno.id).subscribe({
      next: () => {
        turno.estado = "Disponible";
      },
      error: () => {
        alert('No se pudo publicar el turno.');
      }
    });
  }

  /**
   * @method crearTurno
   * @description Crea un nuevo turno en el sistema con los datos del formulario.
   * @returns {void}
   */
  crearTurno(): void {
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
