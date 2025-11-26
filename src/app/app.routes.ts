/**
 * @file Definición de rutas de la aplicación.
 * @module app/routes
 */

import { Routes } from '@angular/router';
import { Turnos } from './components/turnos/turnos';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Inicio } from './components/inicio/inicio';
import { ConfirmarRegistro } from './components/confirmar-registro/confirmar-registro';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

/**
 * @constant {Routes} routes
 * @description Configuración de las rutas de navegación de la aplicación.
 * Define la asociación entre URLs y componentes, así como los guardias de ruta.
 */
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'turnos', component: Turnos, canActivate: [authGuard] },
  { path: 'admin-panel', component: AdminPanel, canActivate: [adminGuard] },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'inicio', component: Inicio },
  { path: 'confirmar-registro', component: ConfirmarRegistro }
];