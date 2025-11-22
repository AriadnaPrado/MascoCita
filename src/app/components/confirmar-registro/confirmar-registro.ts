import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

/** Importamos FormsModule para que funcionen los formularios en el HTML */
import { FormsModule } from '@angular/forms';

/** Importamos las funciones de autenticación de Amplify */
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

@Component({
  selector: 'app-confirmar-registro',
  standalone: true,
  
  /** * Importante: Agregamos FormsModule aquí.
   * Esto permite usar <form #confirmForm="ngForm"> en el HTML.
   */
  imports: [CommonModule, FormsModule], 
  
  templateUrl: './confirmar-registro.html',
  styleUrls: ['./confirmar-registro.css']
})
export class ConfirmarRegistro implements OnInit {
  
  email: string = '';
  code: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * @function ngOnInit
   * @description Método del ciclo de vida de Angular.
   * Se ejecuta al iniciar el componente.
   * Captura el email enviado por la URL desde el registro.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  /**
   * @function onConfirmar
   * @description Envía el código de 6 dígitos a Cognito para validar el email.
   * Si es exitoso, redirige al login.
   * @param {any} form - El objeto del formulario Angular.
   */
  async onConfirmar(form: any) {
    if (!form.valid) {
      this.errorMessage = 'Por favor, ingresa el código de 6 dígitos.';
      return;
    }

    try {
      /** Enviamos la confirmación a AWS Cognito */
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
   * @function onReenviarCodigo
   * @description Solicita a Cognito que reenvíe el código al email del usuario.
   */
  async onReenviarCodigo() {
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