import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-device-info-window',
  templateUrl: './device-info-window.component.html',
  styleUrls: ['./device-info-window.component.less']
})
export class DeviceInfoWindowComponent implements OnInit {
  @Input() vehicles: any;
  @Output() closeWin: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  closeInfoWindow () {
    this.closeWin.emit(this.vehicles);
  }
}
