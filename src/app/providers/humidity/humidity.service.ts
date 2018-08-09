import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HumidityService {
  data = {
    title: 'Humidity(%)',
    value: null,
    timer: 0,
    deviceName: null
  }
  warn: boolean = false
  timer: boolean = false
  constructor() {
  }
  resetData () {
    this.data = {
      title: 'Humidity(%)',
      value: null,
      timer: 0,
      deviceName: null
    }
  }
  addData (value: number, timer: number, deviceName: string) {
    this.data = {
      title: 'Humidity(%)',
      value: value,
      timer: Number(timer) * 1000,
      deviceName: deviceName
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
