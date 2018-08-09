import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-device-info-item-window',
  templateUrl: './device-info-item-window.component.html',
  styleUrls: ['./device-info-item-window.component.less']
})
export class DeviceInfoItemWindowComponent implements OnInit {
  @Input() item;
  @Output() closeWin: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  closeInfoWindow () {
    this.closeWin.emit(this.item);
  }

}
