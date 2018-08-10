import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ContainerAndDeviceStatusService {
  door: number = 0
  containerState: number = 0
  deviceState: number = 0
  containerName: string = ''
  deviceName: string = ''
  containerId: number = 0
  deviceId: number = 0
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
  setDeviceState (value: number) {
    this.deviceState = value
  }
  setDoor (value: number) {
    this.door = value
  }
  setContainerState (value: number) {
    this.containerState = value
  }
  setRightTab (item: any) {
    this.setContainerId(item.containerId)
    this.setContainerName(item.containerName)
    this.setDeviceId(item.deviceId)
    this.setDeviceName(item.setDeviceName)
    this.setDeviceState(item.state)
    this.setContainerState(item.state)
  }
  setRightOnly (item: any) {
    this.setDeviceId(item.deviceId)
    this.setDeviceName(item.setDeviceName)
    this.setDeviceState(item.state)
  }
  resetData () {
    this.containerState = 0
    this.deviceState = 0
    this.containerName = ''
    this.deviceName = ''
    this.containerId = 0
    this.deviceId = 0
  }
}
