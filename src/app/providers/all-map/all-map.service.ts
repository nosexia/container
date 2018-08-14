import { Injectable } from '@angular/core';
import HTTP_URL from '../../datas/http-url.data';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-type/storage.service';
import { TerminalListBody  } from '../../model/terminal-list-body/terminal-list-body';
import { TerminalListService } from '../terminal-list/terminal-list.service';
import { StateBridgService } from '../state-bridge/state-bridg.service';
import { HomeTypeService } from '../home-type/home-type.service'
import { NzMessageService } from 'ng-zorro-antd';

import { ContainerAndDeviceStatusService } from '../container-and-device-status/container-and-device-status.service'
@Injectable({
  providedIn: 'root'
})
export class AllMapService {
  public terminalListService: TerminalListService;
  containerList: any[] = [];
  deviceList: any[] = [];
  allShows: boolean = false;
  DallShows: boolean = true;
  clearTimer: boolean = false;
  lat: number = 40.37;
  lng: number = 116.85;
  zoomValue: number = 4.5;
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private containerAndDeviceStatusService: ContainerAndDeviceStatusService,
    private message : NzMessageService,
    private homeTypeService: HomeTypeService
  ) {
  }
  actionTerminalList (id?: number): void {
    let bodys;
    if (id) {
      bodys = {
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId,
        journeyId: id
      }
    } else {
      bodys = {
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId
      }
    }
    this.getTerminalList(bodys)
    .subscribe(res => {
      if (res.respCode === '00000') {
        let openContainer =  this.containerList.filter(f => {
          return f.isOpen === true
        })
        let openDevice =  this.deviceList.filter(e => {
          return e.isOpen === true
        })
        res.containers.forEach(c => {
          if (openContainer.length === 0) {
            c.isOpen = false
          } else {
            if (c.containerId === openContainer[0].containerId) {
              c.isOpen = true
            } else {
              c.isOpen = false
            }
          }
        })
        res.devices.forEach(d => {
          if (openDevice.length === 0) {
            d.isOpen = false
          } else {
            if (d.deviceId === openDevice[0].deviceId) {
              d.isOpen = true
            } else {
              d.isOpen = false
            }
          }
        })
        this.containerList = res.containers
        this.deviceList = res.devices
        this.deviceList.forEach(a => {
          // 遍历device
          if (a.deviceId === this.containerAndDeviceStatusService.deviceId) {
            if (a.state === 0) {
              this.homeTypeService.showRight = false;
              this.containerAndDeviceStatusService.resetData();
            }
          }
        })
      }
    })
  }
  getTerminalList (body: TerminalListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getTerminalList, body)
  }
  setShow (show: boolean) {
    this.allShows = show
    this.DallShows = true
  }
  getContainer (item: any) {
    debugger
    if (item.state === 0) {
      this.message.info('Not bind');
      return false
    }
    if (item.containerId === this.containerAndDeviceStatusService.containerId) return
    this.containerList.forEach(it => {
      if (it.containerId === item.containerId) {
        it.isOpen = true
        this.zoomValue = 15;
        this.lat = item.latitude / 1000000
        this.lng = item.longitude / 1000000
      } else {
        it.isOpen = false
      }
    })
    // 重置所有的状态
    this.homeTypeService.showRight = false;
    this.containerAndDeviceStatusService.resetData();
    this.terminalListService.queryStatus(0, item);
  }
  getDevice (item: any) {
    if (item.deviceId === this.containerAndDeviceStatusService.deviceId) return
    if (item.state === 0) {
      this.message.info('Not bind');
      return false
    } else if (item.state === 3) {
      this.deviceList.forEach(it => {
        if (it.deviceId === item.deviceId) {
          it.isOpen = true
          this.zoomValue = 15;
          this.lat = item.latitude / 1000000
          this.lng = item.longitude / 1000000
        } else {
          it.isOpen = false
        }
      })
      this.containerAndDeviceStatusService.resetData()
      this.terminalListService.queryStatus(1, item);
    }
  }
  showContainer (item: any) {
    this.getContainer(item)
  }
  showDevice (item: any) {
    this.getDevice(item);
  }
  closeContainer (item: any) {
    this.containerList.forEach(i => {
      if (i.containerId === item.containerId) {
        i.isOpen = false
      }
    })
  }
  closeDevice (item: any) {
    this.deviceList.forEach(i => {
      if (i.deviceId === item.deviceId) {
        i.isOpen = false
      }
    })
  }
  
}
