import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ContainerAndDeviceStatusService {
  containerName: string = ''
  deviceName: string = ''
  containerId: number = 0
  deviceId: number = 0
  state: number = 0
  door: number = 0
  containerState: number = 0
  constructor() { }
  setContainerName (value: string) {
    this.containerName = value
  }
  setDeviceName (value: string) {
    this.deviceName = value
  }
  setContainerId (value: number) {
    this.containerId = value
  }
  setDeviceId (value: number) {
    this.deviceId = value
  }
  setState (value: number) {
    this.state = value
  }
  setDoor (value: number) {
    this.door = value
  }
  setContainerState (value: number) {
    this.containerState = value
  }
}
