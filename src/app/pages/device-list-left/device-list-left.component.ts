import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StateBridgService } from '../../providers/state-bridge/state-bridg.service';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { HomeTypeService } from '../../providers/home-type/home-type.service';
import { ContainerAndDeviceStatusService } from '../../providers/container-and-device-status/container-and-device-status.service'
@Component({
  selector: 'app-device-list-left',
  templateUrl: './device-list-left.component.html',
  styleUrls: ['./device-list-left.component.less']
})
export class DeviceListLeftComponent implements OnInit {
  current = 1;
  pageSize = 5;
  @ViewChildren('devices')
  devices: QueryList<ElementRef>;
  constructor(
    public terminalListService: TerminalListService,
    private message : NzMessageService,
    public fromToMarkerService: FromToMarkerService,
    private stateBridgService: StateBridgService,
    public allMapService: AllMapService,
    public homeTypeService: HomeTypeService,
    private containerAndDeviceStatusService: ContainerAndDeviceStatusService
  ) { }

  ngOnInit() {
  }
  toggleState (show: boolean, i: number) {
    if (show) {
      this.devices.forEach((e, index) => {
        if (index === i) {
          e.nativeElement.querySelector('.bind-information').style.display = 'inline'
        }
      });
    } else {
      this.devices.forEach((e, index) => {
        if (index === i) {
          e.nativeElement.querySelector('.bind-information').style.display = 'none'
        }
      });
    }
  }
  getDevice (item: any) {
    if (item.deviceId === this.containerAndDeviceStatusService.deviceId) return
    if (item.state === 0) {
      this.message.info('Not bind');
      return false
    } else if (item.state === 3) {
      this.allMapService.deviceList.forEach(it => {
        if (it.deviceId === item.deviceId) {
          it.isOpen = true
          this.allMapService.zoomValue = 15;
          this.allMapService.lat = item.latitude / 1000000
          this.allMapService.lng = item.longitude / 1000000
        } else {
          it.isOpen = false
        }
      })
      this.containerAndDeviceStatusService.resetData()
      this.terminalListService.queryStatus(1, item);
    }
  }
}
