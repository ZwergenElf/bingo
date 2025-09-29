import { Component, signal } from '@angular/core';

enum COLOR {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  PURPLE = 'purple',
}

type Field = {
  task: string;
  obtainedBy: COLOR | null;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly fields = signal<Array<Field>>(Array(25).fill({ task: '', obtainedBy: null }));
  protected readonly COLOR = COLOR;

  mark(index: number, color: COLOR) {
    this.fields.update((fields) => {
      const field = fields[index];
      const newColor = field.obtainedBy === color ? null : color;
      fields[index] = { ...field, obtainedBy: newColor };
      return fields;
    });
  }
}
