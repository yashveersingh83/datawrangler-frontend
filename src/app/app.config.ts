import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './features/authentication/services/auth.service';
import { routes } from './app.routes';
import { loadingindicationInterceptor } from './core/interceptors/loading-indicator-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loadingindicationInterceptor]) 

    ),
    // Initialize the AuthService during app startup
    {
      provide: 'APP_INITIALIZER_EFFECT',
      useFactory: () => {
        const authService = inject(AuthService);
        return () => authService.initializeUser(); // Fetch user data
      },
      multi: true,
    },
  ],
};
