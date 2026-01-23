import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Field } from '../game/game.component';

@Injectable()
export class FieldService {
  constructor(private _http: HttpClient) {}

  getFieldsByGridConfigId(gridId: number) {
    // Implementation to fetch fields by grid ID
    return this._http
      .get<{ data: Array<Omit<Field, 'index'> & { id: number }> }>(
        `${environment.api}/fields?gridConfigId=${gridId}`
      )
      .pipe(
        map((res) =>
          res.data.map(({ id, task, obtainedBy }) => ({ index: id - 1, task, obtainedBy }))
        )
      );
  }

  updateFields(fields: Array<Partial<Field> & { index: number }>): Observable<any> {
    // if index exists in grid then update else create new // handle in backend
    // index is unique and id
    return this._http.put(
      `${environment.api}/fields`,
      fields.map((field) => ({
        id: field.index + 1,
        task: field.task,
        obtainedBy: field.obtainedBy,
        gridConfigId: 1,
      }))
    );
  }

  deleteAllFields() {
    return this._http.delete(`${environment.api}/fields?gridConfigId=1`);
  }
}
