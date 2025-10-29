import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports:[FormsModule, CommonModule],
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';

  onLogin(form: any) {
    if (form.valid) {
      alert(`✅ Login exitoso:\nEmail: ${this.email}\nPassword:xxxxxx`);
    } else {
      alert('❌ El formulario es inválido');
    }
  }
}