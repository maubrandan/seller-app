import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Polyfills
import 'zone.js/dist/zone';  // Included with Angular CLI.
import 'core-js/es/reflect';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Extender la interfaz Window
declare global {
  interface Window {
    ngRef: any;
  }
}

// Habilitar el modo de producción si está en un entorno de producción
if (environment.production) {
  enableProdMode();
}

// Detectar cambios en la aplicación
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(ref => {
    // Asegurarse de que Angular detecte los cambios correctamente
    if (window.ngRef) {
      window.ngRef.destroy();
    }
    window.ngRef = ref;
  })
  .catch(err => console.error(err));
