import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { ContainerAndDeviceStatusService } from '../../providers/container-and-device-status/container-and-device-status.service'
@Component({
  selector: 'app-device-list-only-left',
  templateUrl: './device-list-only-left.component.html',
  styleUrls: ['./device-list-only-left.component.less']
})
export class DeviceListOnlyLeftComponent implements OnInit {
  current = 1;
  pageSize = 5;
  @ViewChildren('devices')
  devices: QueryList<ElementRef>;
  constructor(
    public terminalListService: TerminalListService,
    private message : NzMessageService,
    public fromToMarkerService: FromToMarkerService,
    public containerAndDeviceStatusService: ContainerAndDeviceStatusService
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
      // this.homeTypeService.showRight = false
      this.containerAndDeviceStatusService.resetData()
      this.terminalListService.queryStatus(1, item);
    }
  }
}
