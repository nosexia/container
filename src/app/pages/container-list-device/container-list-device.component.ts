import { Component, OnDestroy } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { VehicleInformationService } from '../../providers/vehicle-information/vehicle-information.service';
import { interval, Subscription } from 'rxjs';
import { HomeTypeService } from '../../providers/home-type/home-type.service'
@Component({
  selector: 'app-container-list-device',
  templateUrl: './container-list-device.component.html',
  styleUrls: ['./container-list-device.component.less']
})
export class ContainerListDeviceComponent implements OnDestroy {
  private timer: Subscription;
  constructor(
    public terminalListService: TerminalListService,
    public fromToMarkerService: FromToMarkerService,
    public vehicleInformationService: VehicleInformationService,
    public allMapService: AllMapService,
    public homeTypeService: HomeTypeService
  ) { 
  }
  ngOnDestroy () {
    if (this.timer) {
      // 清除定时器
      this.timer.unsubscribe()
    }
  }
  ngOnInit() {
    this.homeTypeService.showRight = false
    this.allMapService.actionTerminalList();
    this.timer = interval(5000).subscribe(val => {
      this.allMapService.actionTerminalList()
    })
  }
  dragProgress (a) {
    console.log(a)
  }
  showContaner (item: any) {
    // this.allMapService.setShow(true)
    this.allMapService.showContainer(item)
  } 
  showDevice (item: any) {
    this.allMapService.showDevice(item)
    // this.allMapService.setShow(true)
  }
}
