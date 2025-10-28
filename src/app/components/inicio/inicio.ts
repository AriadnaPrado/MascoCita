import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';        // necesario para ngModel
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  imports: [FormsModule, CommonModule,RouterLink,RouterLinkActive],
})
export class Inicio {

}