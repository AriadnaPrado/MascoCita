import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @component Footer
 * @description Componente de pie de página reutilizable.
 * Muestra el copyright y el año actual calculado dinámicamente.
 * @selector app-footer
 * @standalone true
 */
@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer.html',
    styleUrls: ['./footer.css']
})
export class Footer {
    /**
     * @property {number} currentYear - Año actual calculado al inicializar el componente.
     */
    currentYear: number = new Date().getFullYear();
}
