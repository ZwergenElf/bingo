import { Component, signal } from '@angular/core';
import { WebSocketService } from './services/websocket.service';

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
  providers: [WebSocketService],
})
export class App {
  protected readonly fields = signal<Array<Field>>(
    Array(25)
      .fill({ task: '', obtainedBy: null })
      .map((field, index) => ({ ...field, index }))
  );
  protected readonly COLOR = COLOR;

  constructor(private _socketService: WebSocketService) {
    this._socketService.onField((fieldData) => {
      console.log(fieldData);

      this.mark(fieldData.index, fieldData.obtainedBy!);
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

  send(index: number) {
    this._socketService.sendField(index);
  }
}
