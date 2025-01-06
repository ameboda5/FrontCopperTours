import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';  // Importa las rutas
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),  // Proporciona el enrutador con las rutas definidas
    provideHttpClient(withInterceptorsFromDi())
  ],
}).catch(err => console.error(err));
