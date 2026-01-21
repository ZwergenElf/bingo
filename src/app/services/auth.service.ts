import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(name: string, password: string): Observable<boolean> {
    return this._http
      .post<{ data: boolean }>(`${environment.api}/auth/login`, { name, password })
      .pipe(map((res) => res.data));
  }

  refresh(): Observable<boolean> {
    return this._http
      .post<{ data: boolean }>(`${environment.api}/auth/login`, undefined)
      .pipe(map((res) => res.data));
  }
}
