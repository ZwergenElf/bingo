import { Component, computed, inject, provideAppInitializer, signal } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { GridConfigService } from './services/grid-config.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BehaviorSubject, debounceTime, map, of, pipe, switchMap, take, tap } from 'rxjs';
import { FieldService } from './services/field.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { GameComponent } from './game/game.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule],
})
export class AppComponent {}
