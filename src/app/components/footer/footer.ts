/**
 * @file Componente de pie de página.
 * @module components/footer
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @class Footer
 * @description Componente de pie de página reutilizable. Muestra el copyright y el año actual.
 * @component
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
     * @property {number} currentYear - Año actual calculado dinámicamente.
     */
    currentYear: number = new Date().getFullYear();
}
