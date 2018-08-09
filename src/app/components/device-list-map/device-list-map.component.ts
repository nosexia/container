import { Component, OnInit } from '@angular/core';
import { DeviceListService } from '../../providers/device-list/device-list.service';

@Component({
  selector: 'app-device-list-map',
  templateUrl: './device-list-map.component.html',
  styleUrls: ['./device-list-map.component.less']
})
export class DeviceListMapComponent implements OnInit {

  lat: number = 40.37;
  lng: number = 116.85;
  zoomValue: number = 4.5;
  constructor(
    public deviceListService: DeviceListService
  ) { }

  ngOnInit() {
  }
  closeWin (item: any) {
    this.deviceListService.setOpen(item, false);
  }
  markerClick (item: any) {
    this.deviceListService.setOpen(item, true);
  }

}
