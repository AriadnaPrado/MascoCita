/**
 * @file Componente de la página de inicio.
 * @module components/inicio
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * @class Inicio
 * @description Componente que renderiza la página principal de la aplicación.
 * @component
 * @selector app-inicio
 * @standalone true
 */
@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
})
export class Inicio {

}