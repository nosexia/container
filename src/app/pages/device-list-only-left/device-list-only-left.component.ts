import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
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
    public allMapService: AllMapService,
    private message : NzMessageService,
    private terminalListService: TerminalListService
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
    if (item.state === 0) {
      this.message.info('Not bind');
      return false
    } else {
      if (this.transformContainer(item.deviceId) !== '- -') return
      console.log(`${'点击的device的id为' + item.deviceId}`)
      this.terminalListService.setShowRight(false)
      this.allMapService.setShow(true)
      this.terminalListService.seachTerminalData(1, item.deviceId);
    }
    
  }
  transformContainer (id: any, args?: any): string {
    const newId = this.allMapService.containerList.filter((item) => {
      return item.deviceId === id
    })
    if (newId.length === 0) return '- -'
    return newId[0].containerName
  }

}
