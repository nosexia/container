import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-tab-list',
  templateUrl: './device-tab-list.component.html',
  styleUrls: ['./device-tab-list.component.less']
})
export class DeviceTabListComponent implements OnInit {
  data = [{
      title: 'Device E'
  }]
  constructor() { }

  ngOnInit() {
  }

}
