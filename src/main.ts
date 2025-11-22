import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Importamos la clase 'Amplify' desde la librería que instalamos.
 */
import { Amplify } from 'aws-amplify';

/**
 * Configuracion de ID
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
 * Esta es la llamada original para iniciar tu app.
 */
bootstrapApplication(App, appConfig)

  .catch((err) => console.error(err));

