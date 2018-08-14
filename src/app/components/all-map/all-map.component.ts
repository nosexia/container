import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllMapService } from '../../providers/all-map/all-map.service'

@Component({
  selector: 'app-all-map',
  templateUrl: './all-map.component.html',
  styleUrls: ['./all-map.component.less']
})
export class AllMapComponent implements OnInit {
  @Input() device: any; 
  @Input() container: any;
  @Output() showContaner: EventEmitter<any> = new EventEmitter();
  @Output() showDevice: EventEmitter<any> = new EventEmitter();
  constructor(
    public allMapService: AllMapService
  ) { }

  ngOnInit() {
  }
  showView (item: any, type: number) {
    if (type === 0) {
      this.showContaner.emit(item)
    } else {
      this.showDevice.emit(item);
    }
    this.allMapService.zoomValue = 15;
    this.allMapService.lat = item.latitude / 1000000
    this.allMapService.lng = item.longitude / 1000000
  }
  closeWinC (item: any) {
    this.allMapService.closeContainer(item)
  }
  closeWinD (item: any) {
    this.allMapService.closeDevice(item)
  }
}
