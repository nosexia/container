import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  data = {
    title: 'Temperature(℃)',
    value: null,
    timer: 0,
    deviceName: null
  }
  timer: boolean = false
  warn: boolean = false
  constructor() {
  }
  resetData() {
    this.data = {
      title: 'Temperature(℃)',
      value: null,
      timer: 0,
      deviceName: null
    }
  }
  addData (value: number, timer: number, deviceName: string) {
    this.data = {
      title: 'Temperature(℃)',
      value: value,
      timer: Number(timer) * 1000,
      deviceName: deviceName
    }
  }
  setWarn (value: boolean) {
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
