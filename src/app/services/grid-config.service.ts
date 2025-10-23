import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable, tap } from 'rxjs';

export type GridConfig = {
  id: number;
  width: number;
  height: number;
};
@Injectable({
  providedIn: 'root',
})
export class GridConfigService {
  constructor(private _http: HttpClient) {}

  getFirstGrid(): Observable<GridConfig> {
    return this._http
      .get<{ data: GridConfig[] }>(`${environment.api}/gridConfigs`)
      .pipe(map((res) => res.data[0]));
  }
}
