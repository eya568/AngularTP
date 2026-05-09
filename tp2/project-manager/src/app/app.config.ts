import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { CustomRouteReuseStrategy } from './core/strategies/custom-route-reuse.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ]
};