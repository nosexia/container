import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EnterpriseAllSocketService {

  readonly url = 'ws://47.52.194.140/subscriber?';
  ws: WebSocket
  constructor() { }
  createObservableSocket (): Observable<any>  {
    const newUrl: string = this.url + 'id=statistics';
    this.ws = new WebSocket(newUrl);
    return new Observable(
      observer => {
        this.ws.onmessage  = (event) => observer.next(event.data)
        this.ws.onerror  = (event) => observer.error(event)
        this.ws.onclose  = (event) => observer.complete()
      }
    )
  }
  closeWS () {
    if (this.ws) {
      this.ws.close();
    }
  }
}
