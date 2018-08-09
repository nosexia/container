import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AllMapService } from '../../providers/all-map/all-map.service'
@Component({
  selector: 'app-container-list-left',
  templateUrl: './container-list-left.component.html',
  styleUrls: ['./container-list-left.component.less']
})
export class ContainerListLeftComponent implements OnInit {
  current = 1;
  pageSize = 5;
  @ViewChildren('containers')
  containers: QueryList<ElementRef>;
  constructor(
    public terminalListService: TerminalListService,
    private message : NzMessageService,
    public fromToMarkerService: FromToMarkerService,
    private allMapService: AllMapService
  ) { }

  ngOnInit() {
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
    // this.terminalListService.setShowRight(true);
    this.allMapService.allShows = true
    // this.allShows = true
    this.terminalListService.seachTerminalData(0, item.containerId);
    event.stopPropagation();
  }
}
