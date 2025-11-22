import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { Footer } from './components/footer/footer';

/** Importamos la función para cerrar sesión de Amplify */
import { signOut } from 'aws-amplify/auth';

/**
 * @component App
 * @description Componente raíz de la aplicación.
 * Gestiona la estructura principal (Header, RouterOutlet, Footer).
 * @selector app-root
 * @standalone true
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  constructor(private router: Router) { }

  /**
   * @function cerrarSesion
   * @description Cierra la sesión actual en Amazon Cognito y redirige al inicio.
   * @async
   */
  async cerrarSesion() {
    try {
      await signOut();
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}