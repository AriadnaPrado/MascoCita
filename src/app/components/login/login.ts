/**
 * @file Componente de Inicio de Sesión.
 * @module components/login
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { signIn } from 'aws-amplify/auth';

/**
 * @class Login
 * @description Componente que gestiona la autenticación de usuarios mediante Amazon Cognito.
 * @component
 * @selector app-login
 * @standalone true
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.css']
})
export class Login {
  /**
   * @property {string} email - Correo electrónico del usuario.
   */
  email = '';

  /**
   * @property {string} password - Contraseña del usuario.
   */
  password = '';

  /**
   * @property {string} errorMessage - Mensaje de error para mostrar en la interfaz.
   */
  errorMessage = '';

  /**
   * @constructor
   * @param {Router} router - Servicio de enrutamiento.
   */
  constructor(private router: Router) { }

  /**
   * @method onLogin
   * @description Procesa el formulario de inicio de sesión y autentica al usuario con AWS Amplify.
   * @param {any} form - Formulario de Angular.
   * @returns {Promise<void>}
   */
  async onLogin(form: any): Promise<void> {
    this.errorMessage = '';

    if (!form.valid) {
      this.errorMessage = 'Por favor completá todos los campos.';
      return;
    }

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: this.email,
        password: this.password
      });

      if (isSignedIn) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/turnos']);
      } else {
        this.errorMessage = `El inicio de sesión necesita un paso adicional: ${nextStep.signInStep}`;
      }

    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      this.errorMessage = error.message || 'Error al iniciar sesión.';
    }
  }
}