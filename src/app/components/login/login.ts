import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * ¡Importante! Importamos las funciones de Auth de Amplify
 */
import { signIn } from 'aws-amplify/auth';

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
  errorMessage = ''; // Para mostrar errores

  constructor(private router: Router) {}

  /**
   * @function onLogin
   * @description Maneja el envío del formulario de login.
   * Llama a Auth.signIn() de AWS Amplify para autenticar al usuario.
   */
  async onLogin(form: any) {
    this.errorMessage = '';
    
    if (!form.valid) {
      this.errorMessage = 'Por favor completá todos los campos.';
      return;
    }

    try {
      /**
       * ¡Aquí está la magia!
       * Llamamos a Cognito para iniciar sesión.
       */
      const { isSignedIn, nextStep } = await signIn({
        username: this.email,
        password: this.password
      });

      if (isSignedIn) {
        console.log('Inicio de sesión exitoso');
        // Redirigimos al usuario a la página de turnos
        this.router.navigate(['/turnos']); 
      } else {
        /**
         * 'nextStep' se usa si MFA está activado o si el usuario
         * no confirmó su email.
         */
        this.errorMessage = `El inicio de sesión necesita un paso adicional: ${nextStep.signInStep}`;
      }

    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      // Cognito envía errores claros, ej. "User does not exist."
      this.errorMessage = error.message || 'Error al iniciar sesión.';
    }
  }
}