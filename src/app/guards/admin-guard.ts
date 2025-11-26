import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCurrentUser } from 'aws-amplify/auth';
import { ApiUsuarioService } from '../services/apiUsuario';
import { firstValueFrom } from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const usuarioService = inject(ApiUsuarioService);

    try {
        // 1. Verificar autenticación
        const user = await getCurrentUser();

        // 2. Verificar rol
        const data = await firstValueFrom(usuarioService.getRol(user.userId));

        if (data.rol === 'admin') {
            return true;
        } else {
            console.warn('Acceso denegado: No es administrador.');
            router.navigate(['/turnos']); // O a inicio
            return false;
        }

    } catch (error) {
        console.error('Error en adminGuard:', error);
        router.navigate(['/login']);
        return false;
    }
};
