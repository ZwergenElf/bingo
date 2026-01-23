import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Field } from '../game/game.component';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: Socket = io(environment.socket, {
    reconnectionAttempts: 5,
    path: '/socket/socket.io',
  });

  sendField(index: Field['index']): void {
    this.socket.emit('field', index);
  }

  onField(callback: (field: Omit<Field, 'task'>) => void): void {
    this.socket.on('field', callback);
  }

  onAssignColor(callback: (color: string) => void): void {
    this.socket.on('assignColor', callback);
  }
}
