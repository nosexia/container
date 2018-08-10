import { Component, OnInit, ElementRef, QueryList, ViewChildren, ViewChild, Input, OnDestroy } from '@angular/core';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { AddLineDialogComponent } from '../../components/add-line-dialog/add-line-dialog.component';
import { ContainerAndDeviceStatusService } from '../../providers/container-and-device-status/container-and-device-status.service'
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { HomeTypeService } from '../../providers/home-type/home-type.service';

@Component({
  selector: 'app-container-list-only-left',
  templateUrl: './container-list-only-left.component.html',
  styleUrls: ['./container-list-only-left.component.less']
})
export class ContainerListOnlyLeftComponent  implements OnDestroy {

  current = 1;
  pageSize = 5;
  @ViewChildren('containers')
  containers: QueryList<ElementRef>;
  @Input() noBtn: boolean;
  @ViewChild(AddLineDialogComponent)
  private addLineDialogComponent: AddLineDialogComponent;
  constructor(
    public allMapService: AllMapService,
    private message : NzMessageService,
    public terminalListService: TerminalListService,
    private containerAndDeviceStatusService: ContainerAndDeviceStatusService,
    public fromToMarkerService: FromToMarkerService,
    private homeTypeService: HomeTypeService
  ) { }

  ngOnDestroy () {
    this.homeTypeService.showRight = false
    this.homeTypeService.showAllCD = true
    this.containerAndDeviceStatusService.resetData();
    this.terminalListService.closeWSS()
    this.fromToMarkerService.clearTimer()
  }
  pushHomeDialog (event: Event, item: any) {
    if (item.inRoute === 0) {
      this.addLineDialogComponent.showModal(item.containerId);
    } else if (item.inRoute === 1) {
      this.setJourney(item.journeryId)
    }
    event.stopPropagation();
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
  getContainer (item: any) {
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
