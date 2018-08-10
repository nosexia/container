import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { GetCityService } from '../../providers/get-city/get-city.service';
import { Observable } from 'rxjs';
import { StorageService } from '../../providers/storage-type/storage.service';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { Router } from '@angular/router';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { FromToMarkerService } from '../../providers/from-to-marker/from-to-marker.service';
import { ContainerAndDeviceStatusService } from '../../providers/container-and-device-status/container-and-device-status.service';
import { HomeTypeService } from '../../providers/home-type/home-type.service'

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-line-dialog',
  templateUrl: './add-line-dialog.component.html',
  styleUrls: ['./add-line-dialog.component.less']
})
export class AddLineDialogComponent implements OnInit {

  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  containerId: string;
  public toList: any[] = [];
  // @Output() upDateJourney: EventEmitter<any> = new EventEmitter();
  // @Output() addJourney: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private getCityService: GetCityService,
    private storageService: StorageService,
    private terminalListService: TerminalListService,
    private router: Router,
    private allMapService: AllMapService,
    private fromToMarkerService: FromToMarkerService,
    private containerAndDeviceStatusService: ContainerAndDeviceStatusService,
    private homeTypeService: HomeTypeService
    
  ) {
    // if (this.containerListService.containerData.length === 0) {
    //   this.containerListService.getAllContainer()
    // }
  }
  ngOnInit () {
    this.validateForm = this.fb.group({
      from: [ null, [ Validators.required ] ],
      to: [ null, [ Validators.required ] ]
    });
  }
  showModal(id: string): void {
    this.setCity();
    this.isVisible = true
    this.containerId = id
  }
  setCity () {
    if (this.getCityService.lineList.length === 0) {
      this.getCityService.getLine().subscribe(res => {
        if (res.respCode === '00000') {
          this.getCityService.setLine(res.data)
        }
      })
    }
  }
  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  handleCancel(event: Event): void {
    this.isVisible = false;
    event.preventDefault();
  }
  fromChange (value: any): void {
    this.validateForm.get('to').setValue(value);
    this.toList = [value]
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (!this.validateForm.valid) return
    this.addLines(this.validateForm.value)
  }
  addLines (params: any) {
    this.getCityService.addLine({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      from: params.from.from,
      to: params.from.to,
      lineId: params.from.lineId,
      containerIds: this.containerId
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.homeTypeService.showAllCD = false
        // this.allMapService.DallShows = false
        this.terminalListService.actionTerminalList(res.journey.journeyId);
        this.isVisible = false;
        // window.setInterval(() => {  
        //   this.terminalListService.actionTerminalList(res.journey.journeyId);
        // }, 20000);
      }
    })
  }

}
