import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class LoginComponent {
  public readonly name = '';
  public readonly password = '';

  constructor(private _router: Router, private _authService: AuthService) {}

  login(name: string, password: string) {
    this._authService
      .login(name, password)
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate(['/game']);
      });
  }
}
