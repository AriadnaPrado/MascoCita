import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Importamos Router

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';

  // ✅ Inyectamos el router en el constructor
  constructor(private router: Router) {}

  onLogin(form: any) {
    if (form.valid) {
      alert(`Login exitoso:\nEmail: ${this.email}\nPassword: xxxxxx`);
      this.router.navigate(['/turnos']); // ✅ Redirige a la ruta /turnos
    } else {
      alert('El formulario es inválido');
    }
  }
}
