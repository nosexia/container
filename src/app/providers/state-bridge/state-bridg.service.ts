import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateBridgService {
  public containerId: string = '0'
  public deviceId: string = '0';
  constructor() { }
  setContianerId (id: string) {
    this.containerId = id
  }
  setDeviceId (id: string) {
    this.deviceId = id
  }
}
