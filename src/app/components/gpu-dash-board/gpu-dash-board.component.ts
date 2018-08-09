import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gpu-dash-board',
  templateUrl: './gpu-dash-board.component.html',
  styleUrls: ['./gpu-dash-board.component.less']
})
export class GpuDashBoardComponent implements OnInit {
  @Input() statusService: any;
  height: number = 200;
  padding = [0, 0, 30, 0];
  forceFit: boolean = true;
  constructor() {
  }
  ngOnInit () {
    console.log(this.statusService.data[0].value);
  }
}
