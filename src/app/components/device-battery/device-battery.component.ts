import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device-battery',
  templateUrl: './device-battery.component.html',
  styleUrls: ['./device-battery.component.less']
})
export class DeviceBatteryComponent implements OnInit {
  @Input() BarreryValue: Number;
  @Input() warn: boolean;

  constructor() { }

  ngOnInit() {
  }

}
