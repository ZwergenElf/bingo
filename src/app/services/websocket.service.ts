import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Field } from '../app';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: Socket = io('http://localhost:3000');

  sendField(field: Field['index']): void {
    this.socket.emit('field', field);
  }

  onField(callback: (field: Omit<Field, 'task'>) => void): void {
    this.socket.on('field', callback);
  }
}
