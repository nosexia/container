import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private url = 'ws://47.52.194.140/subscriber?id=iot';
  ws: WebSocket
  constructor(
    
  ) { }
  createObservableSocket (): Observable<any>  {
    this.ws = new WebSocket(this.url);
    return new Observable(
      observer => {
        this.ws.onmessage  = (event) => observer.next(event.data)
        this.ws.onerror  = (event) => observer.error(event)
        this.ws.onclose  = (event) => observer.complete()
      }
    )
  }

 
  sendMessage(message: string){
    this.ws.send(message);
  }
}
