/**
 * @file Componente de Registro de Usuarios.
 * @description Gestiona el formulario de registro, la creación de la cuenta en Amazon Cognito
 * y la persistencia del perfil del usuario en el backend.
 * @module components/registro
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { signUp } from 'aws-amplify/auth';

/**
 * @class Registro
 * @description Componente que renderiza el formulario de registro y maneja la lógica de autenticación híbrida.
 * @component
 * @selector app-registro
 * @standalone true
 */
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  /**
   * @property {string} nombre - Nombre completo del usuario.
   */
  nombre = '';

  /**
   * @property {string} email - Correo electrónico del usuario.
   */
  email = '';

  /**
   * @property {string} password - Contraseña del usuario.
   */
  password = '';

  /**
   * @property {string} confirmPassword - Confirmación de la contraseña.
   */
  confirmPassword = '';

  /**
   * @property {boolean} passwordMismatch - Indica si las contraseñas no coinciden.
   */
  passwordMismatch = false;

  /**
   * @property {string} errorMessage - Mensaje de error para mostrar en la interfaz.
   */
  errorMessage = '';

  /**
   * @constructor
   * @param {Router} router - Servicio de enrutamiento.
   * @param {HttpClient} http - Cliente HTTP para peticiones al backend.
   */
  constructor(private router: Router, private http: HttpClient) { }

  /**
   * @method onRegister
   * @description Ejecuta el proceso de registro: validación, creación de cuenta en Cognito y guardado de perfil en backend.
   * @param {any} form - Formulario de Angular.
   * @returns {Promise<void>}
   */
  async onRegister(form: any): Promise<void> {
    this.passwordMismatch = false;
    this.errorMessage = '';

    if (!form.valid) {
      this.errorMessage = 'Por favor completá todos los campos correctamente.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      const { userId, nextStep } = await signUp({
        username: this.email,
        password: this.password,
        options: {
          userAttributes: {
            name: this.nombre,
            email: this.email
          }
        }
      });
      console.log('Usuario creado en Cognito. ID:', userId);

      const urlBackend = 'http://localhost:3000/api/usuarios';
      const perfilUsuario = {
        id: userId,
        nombre: this.nombre,
        email: this.email
      };

      this.http.post(urlBackend, perfilUsuario).subscribe({
        next: (res) => console.log('Perfil guardado en Base de Datos:', res),
        error: (err) => console.error('Error al guardar en Base de Datos:', err)
      });

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        alert('¡Registro exitoso! Te hemos enviado un código a tu email.');
        this.router.navigate(['/confirmar-registro'], { queryParams: { email: this.email } });
      }

    } catch (error: any) {
      console.error('Error en el registro:', error);
      this.errorMessage = error.message || 'Error al registrar el usuario.';
    }
  }
}