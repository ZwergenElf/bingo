import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom, map, take } from 'rxjs';
import { Router } from '@angular/router';

export function appInitInterceptor() {
  console.log('App Init Interceptor Called');
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.getStatus().pipe(
    take(1),
    map((res) => {
      if (!res) {
        router.navigate(['/']);
      }
    })
  );
}
