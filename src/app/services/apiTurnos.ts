import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../components/models/turnosmodel';

@Injectable({ providedIn: 'root' })
export class ApiTurnosService {
  private baseUrl = 'http://localhost:3000/api/turnos';

  constructor(private http: HttpClient) {}

  // Turnos disponibles
  getTurnosDisponibles(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/disponibles`);
  }

  // Turnos del cliente
  getTurnosDelCliente(idCliente: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/cliente?idCliente=${idCliente}`);
  }

  // Reservar turno
  asignarTurno(idTurno: number, idCliente: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/asignar/${idTurno}`, { idCliente });
  }
}
