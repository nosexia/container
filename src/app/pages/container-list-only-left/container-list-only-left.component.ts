import { Component, OnInit, ElementRef, QueryList, ViewChildren, ViewChild, Input } from '@angular/core';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { AddLineDialogComponent } from '../../components/add-line-dialog/add-line-dialog.component';

@Component({
  selector: 'app-container-list-only-left',
  templateUrl: './container-list-only-left.component.html',
  styleUrls: ['./container-list-only-left.component.less']
})
export class ContainerListOnlyLeftComponent implements OnInit {

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
    private terminalListService: TerminalListService
    // public fromToMarkerService: FromToMarkerService
  ) { }

  ngOnInit() {
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
  getContainer (event: Event, item: any) {
    if (item.state === 0) {
      this.message.info('Not bind');
      return false
    }
    console.log(`${'点击的集装箱的id为' + item.containerId}`)
    this.terminalListService.setShowRight(true);
    this.terminalListService.seachTerminalData(0, item.containerId);
    this.allMapService.setShow(true)
    event.stopPropagation();
  }
}
