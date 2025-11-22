import { Routes } from '@angular/router';
import { Turnos } from './components/turnos/turnos';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Inicio } from './components/inicio/inicio';

/** Importamos el componente de confirmación */
import { ConfirmarRegistro } from './components/confirmar-registro/confirmar-registro';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'turnos', component: Turnos },
  { path: 'admin-panel', component: AdminPanel },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'inicio', component: Inicio },

  /** Ruta para la pantalla de confirmación de código */
  { path: 'confirmar-registro', component: ConfirmarRegistro }
];