import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StateBridgService } from '../../providers/state-bridge/state-bridg.service';
import { AllMapService } from "../../providers/all-map/all-map.service";
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
    private allMapService: AllMapService
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
    this.stateBridgService.setContianerId('0');
    this.stateBridgService.setDeviceId('0');
    if (item.state === 0) {
      this.message.info('Not bind');
      return false
    }
    this.allMapService.allShows = true
    // this.allShows = true
    this.terminalListService.seachTerminalData(1, item.deviceId);
  }
}
