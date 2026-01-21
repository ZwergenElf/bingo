import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom, take } from 'rxjs';

export function appInitInterceptor() {
  console.log('App Init Interceptor Called');

  const authService = inject(AuthService);
  return authService.refresh().pipe(take(1));
}
