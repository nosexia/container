import { Component, OnInit } from '@angular/core';
import { JourneyListService } from '../../providers/journey-list/journey-list.service';

@Component({
  selector: 'app-journey-list-map',
  templateUrl: './journey-list-map.component.html',
  styleUrls: ['./journey-list-map.component.less']
})
export class JourneyListMapComponent implements OnInit {
  lat: number = 40.37;
  lng: number = 116.85;
  zoomValue: number = 4.5;
  constructor(
    public journeyListService: JourneyListService
  ) { }

  ngOnInit() {
    
  }
  strokeColor (): string {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16)
  }

}
