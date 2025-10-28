import { Routes } from '@angular/router';
import { Turnos} from './components/turnos/turnos';
import { AdminPanel } from './components/admin-panel/admin-panel';
import {Login} from './components/login/login';
import {Registro} from './components/registro/registro'
import { App } from './app';

export const routes: Routes = [
 { path: '', pathMatch: 'full', component: App },
  { path: 'turnos', component: Turnos },
  {path: 'admin-panel', component: AdminPanel},
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
 
];