import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';        // necesario para ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule, CommonModule],
})
export class Login {

}
