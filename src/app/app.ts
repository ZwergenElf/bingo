import { Component, signal } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { GridConfigService } from './services/grid-config.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BehaviorSubject, debounceTime, map, pipe, switchMap, take, tap } from 'rxjs';
import { FieldService } from './services/field.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

enum COLOR {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  PURPLE = 'purple',
}

export type Field = {
  index: number;
  task: string;
  obtainedBy: COLOR | null;
};

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [ReactiveFormsModule],
  providers: [WebSocketService, GridConfigService, FieldService],
})
export class App {
  protected readonly fields = signal<Array<Field>>([]);
  protected readonly taskInput = new FormControl('');
  protected readonly COLOR = COLOR;
  protected myColor: COLOR | null = null;

  constructor(
    private _socketService: WebSocketService,
    private _gridService: GridConfigService,
    private _fieldService: FieldService
  ) {
    // Initialize fields based on grid configuration
    this.load();

    this._socketService.onField((fieldData) => {
      console.log(fieldData);

      this.mark(fieldData.index, fieldData.obtainedBy!);
    });

    this._socketService.onAssignColor((color) => {
      this.myColor = color as COLOR;
    });

    this.taskInput.valueChanges.subscribe((tasks) => {
      if (!tasks) {
        this.fields.update((fields) => {
          return fields.map((field) => ({
            ...field,
            task: '',
          }));
        });
        return;
      }
      const taskArray = tasks.split('\n').map((task) => task.trim());
      this.fields.update((fields) => {
        return fields.map((field, index) => ({
          ...field,
          task: taskArray[index] || '',
        }));
      });
    });
  }

  mark(index: number, color: COLOR) {
    this.fields.update((fields) => {
      const field = fields[index];
      const newColor = field.obtainedBy === color ? null : color;
      fields[index] = { ...field, obtainedBy: newColor };
      return fields;
    });
  }

  send(index: number, myColor: COLOR | null) {
    if (myColor === null) {
      return;
    }

    this._socketService.sendField(index);
    // update field in backend
    this._fieldService
      .updateFields([{ index, obtainedBy: myColor }])
      .pipe(take(1))
      .subscribe();
  }

  clear() {
    this._fieldService.deleteAllFields().pipe(take(1)).subscribe();
    this.load();
  }

  load() {
    this._gridService
      .getFirstGrid()
      .pipe(
        take(1),
        switchMap((gridConfig) => {
          return this._fieldService.getFieldsByGridConfigId(gridConfig.id).pipe(
            take(1),
            map((fields) => {
              const length = gridConfig.columns * gridConfig.rows;
              return Array.from({ length }, (_, index) => {
                const existingField = fields.find((field) => field.index === index);
                return existingField || { index, task: '', obtainedBy: null };
              });
            })
          );
        }),
        pipe(tap((fields) => this.loadTaskInputFromFields(fields)))
      )
      .subscribe((grid) => {
        this.fields.set(grid);
      });
  }

  loadTaskInputFromFields(fields: Field[]) {
    const tasks = fields
      .map((field) => field.task)
      .filter((task) => task && task.trim() !== '')
      .join('\n');
    this.taskInput.setValue(tasks);
  }

  saveTasks(fields: Array<Field>) {
    // Update all fields in backend
    this._fieldService.updateFields(fields).pipe(take(1)).subscribe();
  }
}
