import { Component, OnInit } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { HomeTypeService } from '../../providers/home-type/home-type.service'
@Component({
  selector: 'app-cd-tab-right',
  templateUrl: './cd-tab-right.component.html',
  styleUrls: ['./cd-tab-right.component.less']
})
export class CdTabRightComponent implements OnInit {
  showDevice: boolean = true;
  constructor(
    public terminalListService: TerminalListService,
    public homeTypeService: HomeTypeService
  ) { }

  ngOnInit() {
  }
  isActive (type: boolean) {
    if (this.showDevice === type) return
    this.showDevice = type
  }
}
