import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiUsuarioService {
    private baseUrl = 'http://localhost:3000/api/usuarios';

    constructor(private http: HttpClient) { }

    getRol(id: string): Observable<{ rol: string }> {
        return this.http.get<{ rol: string }>(`${this.baseUrl}/${id}/rol`);
    }
}
