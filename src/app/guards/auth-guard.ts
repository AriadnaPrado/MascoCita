/**
 * @file Guardia de ruta para autenticación.
 * @module guards/auth-guard
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCurrentUser } from 'aws-amplify/auth';

/**
 * @function authGuard
 * @description Guardia de ruta que verifica si existe una sesión activa en Cognito.
 * Si el usuario no está autenticado, redirige a la página de inicio de sesión.
 * @param {import('@angular/router').ActivatedRouteSnapshot} route - Instantánea de la ruta activada.
 * @param {import('@angular/router').RouterStateSnapshot} state - Estado del enrutador.
 * @returns {Promise<boolean>} Retorna true si el usuario está autenticado, false en caso contrario.
 */
export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  try {
    await getCurrentUser();
    return true;
  } catch (error) {
    console.error('Acceso denegado: Usuario no autenticado.');
    router.navigate(['/login']);
    return false;
  }
};
