import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JourneyItem } from '../../model/journey-item/journey-item';
import { GetCityService } from '../../providers/get-city/get-city.service';
import { ContainerListService } from '../../providers/container-list/container-list.service';
import { NzMessageService } from 'ng-zorro-antd';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-journey-form-dialog',
  templateUrl: './journey-form-dialog.component.html',
  styleUrls: ['./journey-form-dialog.component.less']
})
export class JourneyFormDialogComponent implements OnInit {

  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  private roadmaps: Array<any> = []
  @Output() upDateJourney: EventEmitter<any> = new EventEmitter();
  @Output() addJourney: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private getCityService: GetCityService,
    private datePipe: DatePipe,
    private containerListService: ContainerListService,
    private message: NzMessageService
  ) {
    if (this.containerListService.containerData.length === 0) {
      this.containerListService.getAllContainer()
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      from: [ null, [ Validators.required ] ],
      to: [ null, [ Validators.required ] ],
      startTime: [ null, [ Validators.required ] ],
      endTime: [ null, [ Validators.required ] ],
      containerIds: [ '', [ Validators.required ] ],
      journeyId: [ null ]
    });
  }
  pplaceMarker (point: object) {
    this.roadmaps.push(point);
  }
  pclearLine (value) {
    this.roadmaps = []
    // console.log('清除全部线条')
    // this.roadmaps = []
  }
  pprevious (value) {
    console.log('返回上一步')
    if (this.roadmaps.length === 0) return
    this.roadmaps.pop()
  }
  // 0是add，1是更新信息
  showModal(journeyItem: JourneyItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;
    if (!journeyItem) {
      this.validateForm.reset();
      this.setCity();
      this.roadmaps = [];
    } else {
      this.setCity();
      this.validateForm.patchValue({
        from: journeyItem.from,
        to: journeyItem.to,
        startTime: new Date(journeyItem.startTime),
        endTime: new Date(journeyItem.endTime),
        containerIds: journeyItem.containerIds,
        journeyId: journeyItem.journeyId
      })
      if (journeyItem.roadmaps) {
        this.roadmaps = journeyItem.roadmaps
      }
    }
  }
  setCity () {
    if (this.getCityService.cityData.length === 0) {
      this.getCityService.getCity().subscribe(res => {
        if (res.respCode === '00000') {
          this.getCityService.setCity(res.cityList)
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
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (!this.validateForm.valid) return
    let newValue = this.validateForm.value
    newValue.startTime = this.transformDate(this.validateForm.value.startTime)
    newValue.endTime = this.transformDate(this.validateForm.value.endTime)
    if (this.roadmaps.length === 0) {
      this.message.info('Please set the itinerary')
      return
    }
    if (this.type === 1) {
      this.upDateJourney.emit({
        obj: this.validateForm.value,
        roadmaps: this.roadmaps
      })
    } else {
      this.addJourney.emit({
        obj: this.validateForm.value,
        roadmaps: this.roadmaps
      });
    }
  }
  transformDate (date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

}
