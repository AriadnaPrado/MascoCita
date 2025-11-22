/**
 * @file Componente de Registro de Usuarios.
 * @description Gestiona el formulario de registro, la creación de la cuenta en Amazon Cognito
 * y la persistencia del perfil del usuario en el backend (RDS).
 * @module components/registro
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { signUp } from 'aws-amplify/auth';

/**
 * @component Registro
 * @description Componente que renderiza el formulario de registro y maneja la lógica
 * de autenticación híbrida (Cognito + Base de Datos propia).
 */
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  /** @property {string} nombre - Nombre completo del usuario ingresado en el formulario. */
  nombre = '';

  /** @property {string} email - Correo electrónico del usuario (identificador único). */
  email = '';

  /** @property {string} password - Contraseña elegida por el usuario. */
  password = '';

  /** @property {string} confirmPassword - Campo de confirmación de contraseña. */
  confirmPassword = '';

  /** @property {boolean} passwordMismatch - Bandera para indicar si las contraseñas no coinciden. */
  passwordMismatch = false;

  /** @property {string} errorMessage - Mensaje de error para mostrar en la UI. */
  errorMessage = '';

  /**
   * @constructor
   * @param {Router} router - Servicio de Angular para la navegación entre rutas.
   * @param {HttpClient} http - Cliente HTTP para realizar peticiones al backend (API).
   */
  constructor(private router: Router, private http: HttpClient) {}

  /**
   * @method onRegister
   * @async
   * @description Ejecuta el flujo completo de registro:
   * 1. Valida el formulario localmente.
   * 2. Crea la cuenta segura en Amazon Cognito.
   * 3. Envía los datos del perfil al backend para guardarlos en RDS.
   * 4. Redirige al usuario a la pantalla de confirmación de código.
   * @param {any} form - El objeto del formulario de Angular (ngForm).
   */
  async onRegister(form: any) {
    this.passwordMismatch = false;
    this.errorMessage = '';

    /** Validación: Verifica si el formulario es válido según las reglas HTML. */
    if (!form.valid) {
      this.errorMessage = 'Por favor completá todos los campos correctamente.';
      return;
    }

    /** Validación: Verifica la coincidencia de contraseñas. */
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      /**
       * Paso 1: Registro en Amazon Cognito.
       * Se utiliza la función `signUp` de Amplify para crear el usuario en el User Pool.
       * Se envían 'nombre' y 'email' como atributos estándar del usuario.
       */
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

      /**
       * Paso 2: Guardado del Perfil en Backend (RDS).
       * Se prepara el objeto con el ID de Cognito (sub) para vincular ambas bases de datos.
       */
      const urlBackend = 'http://localhost:3000/api/usuarios';
      const perfilUsuario = {
        id: userId,
        nombre: this.nombre,
        email: this.email
      };

      /**
       * Petición HTTP POST al backend.
       * Envía los datos del perfil para ser almacenados en la tabla 'Usuarios'.
       * Se utiliza .subscribe() para ejecutar la petición (Observable).
       */
      this.http.post(urlBackend, perfilUsuario).subscribe({
        next: (res) => console.log('Perfil guardado en Base de Datos:', res),
        error: (err) => console.error('Error al guardar en Base de Datos:', err)
      });

      /**
       * Paso 3: Redirección.
       * Si Cognito requiere confirmación (código por email), redirige al componente 'ConfirmarRegistro'.
       * Se pasa el email como parámetro de consulta para facilitar el flujo al usuario.
       */
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