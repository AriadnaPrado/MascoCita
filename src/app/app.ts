import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { Footer } from './components/footer/footer';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { ApiUsuarioService } from './services/apiUsuario';
import { firstValueFrom } from 'rxjs';

/**
 * @class App
 * @description Componente raíz de la aplicación. Gestiona la estructura principal (Header, RouterOutlet, Footer) y el estado de autenticación global.
 * @component
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
export class App implements OnInit {

  /**
   * @property {boolean} isAuthenticated - Indica si el usuario tiene una sesión activa.
   */
  isAuthenticated = false;

  /**
   * @property {boolean} isAdmin - Indica si el usuario autenticado tiene rol de administrador.
   */
  isAdmin = false;

  /**
   * @constructor
   * @param {Router} router - Servicio de enrutamiento de Angular.
   * @param {ApiUsuarioService} usuarioService - Servicio para gestión de usuarios y roles.
   */
  constructor(
    private router: Router,
    private usuarioService: ApiUsuarioService
  ) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente. Verifica el estado de sesión actual y suscribe a eventos de autenticación (login/logout).
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    // 1. Verificar estado inicial
    try {
      const user = await getCurrentUser();
      this.isAuthenticated = true;
      await this.checkAdminRole(user.userId);
    } catch {
      this.isAuthenticated = false;
      this.isAdmin = false;
    }

    // 2. Escuchar cambios de sesión (Login / Logout)
    Hub.listen('auth', async (data) => {
      if (data.payload.event === 'signedIn') {
        this.isAuthenticated = true;
        try {
          const user = await getCurrentUser();
          await this.checkAdminRole(user.userId);
        } catch (error) {
          console.error('Error obteniendo usuario tras login:', error);
        }
      } else if (data.payload.event === 'signedOut') {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * @method checkAdminRole
   * @description Verifica si el usuario actual tiene rol de administrador consultando el backend.
   * @param {string} userId - Identificador único del usuario.
   * @returns {Promise<void>}
   */
  async checkAdminRole(userId: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.usuarioService.getRol(userId));
      this.isAdmin = response.rol === 'admin';
    } catch (error) {
      console.error('Error verificando rol de administrador:', error);
      this.isAdmin = false;
    }
  }

  /**
   * @method cerrarSesion
   * @description Cierra la sesión actual del usuario en AWS Amplify.
   * @returns {Promise<void>}
   */
  async cerrarSesion(): Promise<void> {
    try {
      await signOut();
      // El evento 'signedOut' del Hub se encargará de actualizar el estado
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}