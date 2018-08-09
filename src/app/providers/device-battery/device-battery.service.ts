import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeviceBatteryService {
  warn: boolean = false;
  value: number = 0;
  constructor() { }
  setValue (newVal: number) {
    this.value = newVal
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
