# Implementación de Protección de Rutas (Auth Guard)

## Archivos a crear/modificar
- `src/app/guards/auth-guard.ts` (Modificar)
- `src/app/app.routes.ts` (Modificar)

## Descripción Técnica
El objetivo es restringir el acceso a las rutas privadas de la aplicación (como `/turnos` y `/admin-panel`) para que solo sean accesibles por usuarios autenticados en Amazon Cognito.
1.  **Auth Guard:** Se implementará la lógica en `authGuard` utilizando `getCurrentUser()` de la librería `aws-amplify/auth`.
    * Esta función verifica automáticamente si existe una sesión válida (Token) de Cognito.
    * Si el usuario existe -> Permite el acceso (`true`).
    * Si no existe -> Redirige a `/login` y bloquea el acceso (`false`).
2.  **Rutas:** Se aplicará este guardián a las rutas protegidas en `app.routes.ts`.
3.  **Redirección Inicial:** Se cambiará la redirección por defecto (`''`) para que lleve a `/login`, forzando el inicio de sesión al entrar al sitio.

## Bloques de Código

### 1. `src/app/guards/auth-guard.ts`
Implementación de la lógica de verificación de sesión con Amplify.

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
/** Importamos la función nativa de Cognito para verificar la sesión actual */
import { getCurrentUser } from 'aws-amplify/auth';

/**
 * @function authGuard
 * @description Guardia de ruta funcional.
 * Verifica si existe una sesión activa en Cognito.
 * Si no hay sesión, redirige al Login.
 */
export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  try {
    // Intentamos obtener el usuario actual de Cognito.
    // Si no hay sesión válida, esta función lanza un error.
    await getCurrentUser();
    
    // Si no hay error, el usuario está autenticado y permitimos el paso.
    return true;
  } catch (error) {
    // Si hay error (ej. 'The user is not authenticated'), redirigimos.
    console.log('Acceso denegado: Usuario no autenticado. Redirigiendo al login...');
    router.navigate(['/login']);
    return false;
  }
};