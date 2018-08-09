import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.less']
})
export class DoorComponent implements OnInit {
  @Input() isOpen: number;
  constructor() { }

  ngOnInit() {
  }

}
