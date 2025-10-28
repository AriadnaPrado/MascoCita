import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';        // necesario para ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

}
