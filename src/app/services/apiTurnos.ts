import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../components/models/turnosmodel';

@Injectable({ providedIn: 'root' })
export class ApiTurnosService {

  private baseUrl = 'http://localhost:3000/api/turnos';

  constructor(private http: HttpClient) {}

  /* ================================
     CLIENTE
  =================================*/

  // Turnos disponibles (estado = Pendiente)
  getTurnosDisponibles(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/disponibles`);
  }

  // Turnos del cliente (Reservados / Confirmados / Cancelados)
  getTurnosDelCliente(idCliente: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/cliente?idCliente=${idCliente}`);
  }

  // Reservar turno → cambia a "Reservado"
  asignarTurno(idTurno: number, idCliente: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/asignar/${idTurno}`, { idCliente });
  }


  /* ================================
     ADMIN
  =================================*/

  // Obtener todos los turnos (Pendiente / Reservado / Confirmado / Cancelado)
  getTurnosAdmin(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/admin/todos`);
  }

  // Crear un turno nuevo (estado initial = Pendiente)
  crearTurno(turnoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/crear`, turnoData);
  }

  // Confirmar turno → pasa a "Confirmado"
  confirmarTurno(idTurno: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/confirmar/${idTurno}`, {});
  }

  // Cancelar turno → pasa a "Cancelado"
  cancelarTurno(idTurno: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/cancelar/${idTurno}`, {});
  }

}
