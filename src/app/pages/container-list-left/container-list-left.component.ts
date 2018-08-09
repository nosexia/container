import { Component, OnInit, ElementRef, QueryList, ViewChildren, Input, ViewChild } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { AddLineDialogComponent } from '../../components/add-line-dialog/add-line-dialog.component';
import { HomeTypeService } from '../../providers/home-type/home-type.service';
import { ContainerAndDeviceStatusService } from '../../providers/container-and-device-status/container-and-device-status.service';
@Component({
  selector: 'app-container-list-left',
  templateUrl: './container-list-left.component.html',
  styleUrls: ['./container-list-left.component.less']
})

export class ContainerListLeftComponent implements OnInit {
  current = 1;
  pageSize = 5;
  @ViewChild(AddLineDialogComponent)
  private addLineDialogComponent: AddLineDialogComponent;
  @Input() noBtn: boolean;
  @ViewChildren('containers')
  containers: QueryList<ElementRef>;
  constructor(
    public terminalListService: TerminalListService,
    private message : NzMessageService,
    public fromToMarkerService: FromToMarkerService,
    public allMapService: AllMapService,
    public homeTypeService: HomeTypeService,
    private containerAndDeviceStatusService: ContainerAndDeviceStatusService
  ) { }

  ngOnInit() {
  }
  pushHomeDialog (event: Event, item: any) {
    // if (item.inRoute === 0) {
    //   this.addLineDialogComponent.showModal(item.containerId);
    // } else if (item.inRoute === 1) {
    //   this.setJourney(item.journeryId)
    // }
    // event.stopPropagation();
  }
  setJourney (id: number) {
    this.terminalListService.actionEnRoute(id);
  }
  toggleState (show: boolean, i: number) {
    if (show) {
      this.containers.forEach((e, index) => {
        if (index === i) {
          e.nativeElement.querySelector('.bind-information').style.display = 'inline'
        }
      });
    } else {
      this.containers.forEach((e, index) => {
        if (index === i) {
          e.nativeElement.querySelector('.bind-information').style.display = 'none'
        }
      });
    }
  }
  getContainer (event: Event, item: any) {
    if (item.state === 0) {
      this.message.info('Not bind');
      return false
    }
    if (item.containerId === this.containerAndDeviceStatusService.containerId) return
    // 重置所有的状态
    this.containerAndDeviceStatusService.resetData();
    this.terminalListService.queryStatus(0, item);
    event.stopPropagation();
  }
}
