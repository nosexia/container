import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-container-info-window',
  templateUrl: './container-info-window.component.html',
  styleUrls: ['./container-info-window.component.less']
})
export class ContainerInfoWindowComponent implements OnInit {

  @Input() item;
  @Output() closeWin: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  closeInfoWindow () {
    this.closeWin.emit(this.item);
  }

}
