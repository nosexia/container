import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell-signal',
  templateUrl: './cell-signal.component.html',
  styleUrls: ['./cell-signal.component.less']
})
export class CellSignalComponent implements OnInit {
  @Input() signalValue: Number;
  @Input() warn: boolean;
  constructor() { }

  ngOnInit() {
  }

}
