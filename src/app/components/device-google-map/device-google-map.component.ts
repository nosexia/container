import { Component, OnInit, Input } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';

@Component({
  selector: 'app-device-google-map',
  templateUrl: './device-google-map.component.html',
  styleUrls: ['./device-google-map.component.less']
})
export class DeviceGoogleMapComponent implements OnInit {
  @Input() fromto: any;
  @Input() vehicle: any;
  lat: number = 40.37;
  lng: number = 116.85;
  zoomValue: number = 4.5;
  isOpen: boolean = false;
  iconUrl: string = '../../../assets/images/freighter_mark.png';
  toUrl: string = '../../../assets/images/distance_mark.png'
  constructor(
    public terminalListService: TerminalListService
  ) { }

  ngOnInit() {
  }
  closeWin () {
    this.isOpen = false;
  }
  markerClick () {
    if (!this.terminalListService.isClick) return
    this.isOpen = true;
  }
}
