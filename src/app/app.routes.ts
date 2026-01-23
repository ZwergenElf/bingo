import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

export const AppRoutes: Routes = [
  {
    path: 'game',
    loadComponent: () => import('./game/game.component').then((m) => m.GameComponent),
  },
  {
    path: '',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
];
