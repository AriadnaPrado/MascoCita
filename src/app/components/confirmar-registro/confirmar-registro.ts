/**
 * @file Componente de confirmación de registro.
 * @module components/confirmar-registro
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

/**
 * @class ConfirmarRegistro
 * @description Componente que maneja la confirmación de la cuenta de usuario mediante el código enviado por email.
 * @component
 * @selector app-confirmar-registro
 * @standalone true
 */
@Component({
  selector: 'app-confirmar-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmar-registro.html',
  styleUrls: ['./confirmar-registro.css']
})
export class ConfirmarRegistro implements OnInit {

  /**
   * @property {string} email - Correo electrónico del usuario a confirmar.
   */
  email: string = '';

  /**
   * @property {string} code - Código de confirmación ingresado por el usuario.
   */
  code: string = '';

  /**
   * @property {string} errorMessage - Mensaje de error para mostrar en la interfaz.
   */
  errorMessage: string = '';

  /**
   * @constructor
   * @param {Router} router - Servicio de enrutamiento.
   * @param {ActivatedRoute} route - Servicio para acceder a los parámetros de la ruta activa.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente recuperando el email de los parámetros de la URL.
   * @returns {void}
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  /**
   * @method onConfirmar
   * @description Envía el código de confirmación a AWS Cognito para validar la cuenta.
   * @param {any} form - Formulario de Angular.
   * @returns {Promise<void>}
   */
  async onConfirmar(form: any): Promise<void> {
    if (!form.valid) {
      this.errorMessage = 'Por favor, ingresa el código de 6 dígitos.';
      return;
    }

    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: this.email,
        confirmationCode: this.code
      });

      if (isSignUpComplete) {
        alert('¡Cuenta confirmada exitosamente! Ya podés iniciar sesión.');
        this.router.navigate(['/login']);
      }

    } catch (error: any) {
      console.error('Error al confirmar:', error);
      this.errorMessage = error.message || 'Código incorrecto.';
    }
  }

  /**
   * @method onReenviarCodigo
   * @description Solicita el reenvío del código de confirmación al email del usuario.
   * @returns {Promise<void>}
   */
  async onReenviarCodigo(): Promise<void> {
    if (!this.email) {
      this.errorMessage = 'No hay email para reenviar.';
      return;
    }
    try {
      await resendSignUpCode({ username: this.email });
      alert('Nuevo código enviado.');
    } catch (error: any) {
      console.error('Error al reenviar:', error);
      this.errorMessage = error.message || 'Error al reenviar código.';
    }
  }
}