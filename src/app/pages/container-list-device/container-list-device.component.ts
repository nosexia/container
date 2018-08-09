import { Component, OnInit } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { VehicleInformationService } from '../../providers/vehicle-information/vehicle-information.service';
import { interval } from 'rxjs';
import { HomeTypeService } from '../../providers/home-type/home-type.service'
@Component({
  selector: 'app-container-list-device',
  templateUrl: './container-list-device.component.html',
  styleUrls: ['./container-list-device.component.less']
})
export class ContainerListDeviceComponent implements OnInit {

  constructor(
    public terminalListService: TerminalListService,
    public fromToMarkerService: FromToMarkerService,
    public vehicleInformationService: VehicleInformationService,
    public allMapService: AllMapService,
    public homeTypeService: HomeTypeService
  ) { 
  }
  ngOnInit() {
    if (this.allMapService.containerList.length === 0 && this.allMapService.deviceList.length === 0) {
      this.allMapService.actionTerminalList();
      const subscribe = interval(5000).subscribe(val => {
        if (this.allMapService.clearTimer) {
          subscribe.unsubscribe()
        }
        this.allMapService.actionTerminalList()
      })
    }
  }
  showContaner (item: any) {
    this.allMapService.setShow(true)
    this.allMapService.showContainer(item)
  } 
  showDevice (item: any) {
    this.allMapService.showDevice(item)
    this.allMapService.setShow(true)
  }
}
