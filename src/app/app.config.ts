import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { appInitInterceptor } from './interceptor/app-init.interceptor';
import { AuthService } from './services/auth.service';
import { interceptHttp } from './interceptor/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAppInitializer(appInitInterceptor),
    provideHttpClient(withInterceptors([interceptHttp])),
  ],
};
