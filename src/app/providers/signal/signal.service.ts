import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  // 信号
  value: number = 1;
  warn: boolean = false;
  constructor() { }
  setValue (newVal: number) {
    let newValue = (newVal / 25)
    if (newValue <= 1) {
      this.value = 1
      return
    } else if (newValue <= 2) {
      this.value = 2
      return
    } if (newValue <= 3) {
      this.value = 3
      return
    } if (newValue <= 4) {
      this.value = 4
      return
    }
  }
  setWarn (value: boolean) {
    if (value === this.warn) return
    this.warn = value;
    const source = interval(1000);
    const subscribe = source.subscribe(val => {
      if (val === 20) {
        this.warn = false;
        subscribe.unsubscribe();
      }
    });
  }
}
