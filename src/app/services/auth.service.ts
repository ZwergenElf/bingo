import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(name: string, password: string): Observable<boolean> {
    return this._http
      .post<{ data: boolean }>(`${environment.api}/auth/login`, { name, password })
      .pipe(map((res) => res.data));
  }

  getStatus(): Observable<boolean> {
    return this._http.get(`${environment.api}/auth/status`, undefined).pipe(
      map(() => true),
      catchError(() => [false])
    );
  }
}
