import { Injectable } from '@angular/core';
import HTTP_URL from '../../datas/http-url.data';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-type/storage.service';
import { TerminalListBody  } from '../../model/terminal-list-body/terminal-list-body';
import { TerminalListService } from '../terminal-list/terminal-list.service';
import { StateBridgService } from '../state-bridge/state-bridg.service';
// import { TemperatureService } from '../temperature/temperature.service';
// import { HumidityService } from '../humidity/humidity.service';
// import { AccelerationService } from '../acceleration/acceleration.service';
import { HomeTypeService } from '../home-type/home-type.service'
import { ContainerAndDeviceStatusService } from '../container-and-device-status/container-and-device-status.service'
@Injectable({
  providedIn: 'root'
})
export class AllMapService {
  // private terminalListService: TerminalListService;
  containerList: any[] = [];
  deviceList: any[] = [];
  allShows: boolean = false;
  DallShows: boolean = true;
  clearTimer: boolean = false;
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private stateBridgService: StateBridgService,
    private containerAndDeviceStatusService: ContainerAndDeviceStatusService,
    private homeTypeService: HomeTypeService
  ) {
  }
  // setTerminalListService (t: TerminalListService) {
    // this.terminalListService = t;
  // }
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
        res.containers.forEach(item => {
          item.isOpen = false
        })
        res.devices.forEach(item => {
          item.isOpen = false
        })
        this.containerList = res.containers
        this.deviceList = res.devices
        this.deviceList.forEach(a => {
          // 遍历device
          if (a.deviceId === this.containerAndDeviceStatusService.deviceId) {
            if (a.state === 0) {
              this.homeTypeService.showRight = false;
            }
          }
        })
        // if (this.stateBridgService.containerId === '0' && this.stateBridgService.deviceId === '0') {
        //   return false
        // } else if (this.stateBridgService.containerId === '0' && this.stateBridgService.deviceId !== '0') {
        //   console.log('点击的是device')
        //   this.deviceList.forEach(i => {
        //     if (i.deviceId === this.stateBridgService.deviceId) {
        //       // 如果选中的deviceId为
        //       if (i.state === 0) {
        //         this.stateBridgService.setContianerId('0');
        //         this.stateBridgService.setDeviceId('0');
        //         this.terminalListService.setShowRight(false)
        //       } else if (i.state === 1 || i.state === 2) {
        //         this.containerAndDeviceStatusService.setState(i.state);
        //       }
        //     }
        //   })
        // } else {
        //   this.deviceList.forEach(i => {
        //     if (i.deviceId === this.stateBridgService.deviceId) {
        //       // 如果选中的deviceId为
        //       if (i.state === 0) {
        //         this.allShows = false
        //         this.stateBridgService.setContianerId('0');
        //         this.stateBridgService.setDeviceId('0');
        //       } else if (i.state === 1 || i.state === 2) {
        //         this.containerAndDeviceStatusService.setContainerState(i.state);
        //         // this.containerAndDeviceStatusService.setState(i.state);
        //       } else {
        //         this.containerAndDeviceStatusService.setContainerState(i.state);
        //       }
        //     }
        //   })
        // }
      }
      // this.containerList.forEach(i => {
      //   if (i.containerId === this.stateBridgService.containerId) {
      //     if (i.state === 0) {
      //       console.log('开始查device是否在线')
      //       // this.stateBridgService.setContianerId('0');
      //       this.deviceList.forEach(ii => {
      //         if (ii.deviceId === this.stateBridgService.deviceId) {
      //           if (ii.state === 0) {
      //             console.log('device不在线')
      //             // device状态为0的时候
      //             this.allShows = false
      //             this.stateBridgService.setContianerId('0');
      //             this.stateBridgService.setDeviceId('0');
      //             // this.terminalListService.setShowRight(false)
      //             // this.terminalListService.seachTerminalData(1, this.stateBridgService.containerId);
      //           } else if (ii.state === 3) {
      //             console.log('device在线')
      //             // this.terminalListService.setShowRight(true)
      //             // this.terminalListService.seachTerminalData(1, this.stateBridgService.containerId);
      //           }
      //         }
      //       })
      //     }
      //   }
      // })
      // console.log(this.stateBridgService.deviceId, this.stateBridgService.containerId)
    })
  }
  getTerminalList (body: TerminalListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getTerminalList, body)
  }
  setShow (show: boolean) {
    this.allShows = show
    this.DallShows = true
  }
  showContainer (item: any) {
    this.containerList.forEach(i => {
      if (i.containerId === item.containerId) {
        i.isOpen = true
      } else {
        i.isOpen = false
      }
    })
  }
  showDevice (item: any) {
    this.deviceList.forEach(i => {
      if (i.deviceId === item.deviceId) {
        i.isOpen = true
      } else {
        i.isOpen = false
      }
    })
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
