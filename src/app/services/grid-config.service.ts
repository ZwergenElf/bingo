import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';

export type GridConfig = {
  id: number;
  columns: number;
  rows: number;
};

@Injectable({
  providedIn: 'root',
})
export class GridConfigService {
  constructor(private _http: HttpClient) {}

  getFirstGrid(): Observable<GridConfig> {
    return this._http
      .get<{ data: GridConfig[] }>(`194.164.197.221/grid-configs`)
      .pipe(map((res) => res.data[0]));
  }
}
