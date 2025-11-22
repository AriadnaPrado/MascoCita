# Implementación de Componente Footer Dinámico

## Archivos a crear/modificar
- `src/app/components/footer/footer.ts` (Crear)
- `src/app/components/footer/footer.html` (Crear)
- `src/app/components/footer/footer.css` (Crear)
- `src/app/app.ts` (Modificar)
- `src/app/app.html` (Modificar)

## Descripción Técnica
El objetivo es refactorizar el pie de página estático actual para convertirlo en un componente Angular reutilizable (`AppFooter`).
Este componente deberá:
1. Calcular el año actual dinámicamente utilizando el objeto `Date` de JavaScript, para evitar tener que actualizar el año manualmente en el futuro.
2. Mantener los estilos visuales existentes (fondo naranja, texto blanco).
3. Reemplazar la etiqueta `<footer>` estática en el `app.html` principal.

## Bloques de Código

### 1. `src/app/components/footer/footer.ts`
Definición del componente standalone. Calcula el año actual al inicializarse.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  currentYear: number = new Date().getFullYear();
}