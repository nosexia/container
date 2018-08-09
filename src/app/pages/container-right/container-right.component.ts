import { Component, OnInit, ViewChild } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { TemperatureService } from '../../providers/temperature/temperature.service';
import { HumidityService } from '../../providers/humidity/humidity.service';
import { AccelerationService } from '../../providers/acceleration/acceleration.service';
import { ContainerAndDeviceStatusService } from '../../providers/container-and-device-status/container-and-device-status.service';
import { ContainerSensorComponent } from '../../components/container-sensor/container-sensor.component'
@Component({
  selector: 'app-container-right',
  templateUrl: './container-right.component.html',
  styleUrls: ['./container-right.component.less']
})
export class ContainerRightComponent implements OnInit {
  @ViewChild('t')
  private t: ContainerSensorComponent
  @ViewChild('h')
  private h: ContainerSensorComponent
  @ViewChild('a')
  private a: ContainerSensorComponent
  constructor(
    public terminalListService: TerminalListService,
    public temperatureService: TemperatureService,
    public humidityService: HumidityService,
    public accelerationService: AccelerationService,
    public containerAndDeviceStatusService: ContainerAndDeviceStatusService
  ) { }

  ngOnInit() {
    this.t.resetData();
    this.h.resetData();
    this.a.resetData();
    // this.temperatureService.addData(26);
    // this.humidityService.addData(24);
    // this.accelerationService.addData(27);
  }

}
