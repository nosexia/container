import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-map-add-polylines',
  templateUrl: './map-add-polylines.component.html',
  styleUrls: ['./map-add-polylines.component.less']
})
export class MapAddPolylinesComponent implements OnInit {
  lat: number = 40.37;
  lng: number = 116.85;
  zoomValue: number = 4.5;
  @Input() roadmaps: Array<any> = [];
  @Output() pplaceMarker: EventEmitter<any> = new EventEmitter();
  @Output() pclearLine: EventEmitter<any> = new EventEmitter();
  @Output() pprevious: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  placeMarker ($event) {
    let newPoint = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng
    }
    this.pplaceMarker.emit(newPoint)
    // console.log($event.coords.lat);
    // console.log($event.coords.lng); 
    // this.roadmaps.push(newPoint)
  }
  clearLine () {
    this.pclearLine.emit([])
    // console.log('清除全部线条')
    // this.roadmaps = []
  }
  previous () {
    this.pprevious.emit('');
    // console.log('返回上一步')
    // if (this.roadmaps.length === 0) return
    // this.roadmaps.pop()
  }

}
