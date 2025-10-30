import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  passwordMismatch = false;

  onRegister(form: any) {
    this.passwordMismatch = false;

    if (form.valid) {
      if (this.password !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      // Aquí iría la lógica de registro (por ejemplo, API o Firebase)
      console.log('Usuario registrado:', {
        nombre: this.nombre,
        email: this.email,
        password: this.password
      });

      alert('Registro exitoso');
      form.reset();
    }
  }
}
