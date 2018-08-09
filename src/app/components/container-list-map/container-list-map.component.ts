import { Component, OnInit } from '@angular/core';
import { ContainerListService } from '../../providers/container-list/container-list.service';

@Component({
  selector: 'app-container-list-map',
  templateUrl: './container-list-map.component.html',
  styleUrls: ['./container-list-map.component.less']
})
export class ContainerListMapComponent implements OnInit {
  lat: number = 40.37;
  lng: number = 116.85;
  zoomValue: number = 4.5;
  constructor(
    public containerListService: ContainerListService
  ) { }

  ngOnInit() {
  }
  closeWin (item: any) {
    this.containerListService.setOpen(item, false);
  }
  markerClick (item: any) {
    this.containerListService.setOpen(item, true);
  }
}
