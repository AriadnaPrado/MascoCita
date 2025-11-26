/**
 * @file Punto de entrada principal de la aplicación Angular.
 * @description Inicializa la aplicación y configura AWS Amplify.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Amplify } from 'aws-amplify';

/**
 * @description Configuración de AWS Amplify con los parámetros de Cognito.
 */
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_g18FzgHaq',
      userPoolClientId: '2t5ja1c92l1qmp4vpbj2195jdd'
    }
  }
});

/**
 * @description Inicialización de la aplicación Angular.
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

