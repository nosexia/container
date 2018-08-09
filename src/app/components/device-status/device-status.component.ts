import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.less']
})
export class DeviceStatusComponent implements OnInit {
  @Input() status: Number;
  constructor() { }

  ngOnInit() {
  }

}
