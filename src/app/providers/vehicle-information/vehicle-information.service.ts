import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleInformationService {
  data: object = {
    deviceName: '1',
    status: 0,
    gpsTime: new Date(),
    startTime: new Date(),
    longitude: 0,
    latitude: 0,
    simiccid: 0,
    simimsi: 0,
    modulesn: '',
    moduleimei: 0,
    cellinfo: ''
  }
  constructor() { }
  setParams (params: string, value: any) {
    this.data[params] = value
  }
}
