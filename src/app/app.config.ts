/**
 * @file Configuración global de la aplicación Angular.
 * @module app/config
 */

import { ApplicationConfig, provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * @constant {ApplicationConfig} appConfig
 * @description Objeto de configuración principal de la aplicación.
 * Define los proveedores globales como el enrutador, cliente HTTP y detección de cambios zoneless.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
