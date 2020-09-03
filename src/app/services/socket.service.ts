import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  server = 'http://localhost:4444';
  constructor() {
    this.socket  = io(this.server);
  }

   listen(eventName: string) {
    return new Observable((Subscriber) =>{
        this.socket.on(eventName, (data) => {
          Subscriber.next(data);
        });
    });
  }

   emitir(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

}