import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this._http
      .post<{ data: boolean }>(`${environment.api}/auth/login`, { username, password })
      .pipe(map((res) => res.data));
  }
}
