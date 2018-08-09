import { Component, OnInit, Input } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { CpuStatusService } from '../../providers/cpu-status/cpu-status.service';
import { MemoryStatusService } from '../../providers/memory-status/memory-status.service';
import { DeviceBatteryService } from '../../providers/device-battery/device-battery.service';
import { SignalService } from '../../providers/signal/signal.service';
import { ContainerAndDeviceStatusService } from '../../providers/container-and-device-status/container-and-device-status.service';

@Component({
  selector: 'app-device-right',
  templateUrl: './device-right.component.html',
  styleUrls: ['./device-right.component.less']
})
export class DeviceRightComponent implements OnInit {
  @Input() deviceShow: boolean;
  constructor(
    public terminalListService: TerminalListService,
    public cpuStatusService: CpuStatusService,
    public memoryStatusService: MemoryStatusService,
    public deviceBatteryService: DeviceBatteryService,
    public signalService: SignalService,
    public containerAndDeviceStatusService: ContainerAndDeviceStatusService
  ) { }

  ngOnInit() {
  }

}
