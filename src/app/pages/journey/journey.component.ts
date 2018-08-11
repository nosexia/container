import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../providers/storage-type/storage.service';
import { JourneyItem } from '../../model/journey-item/journey-item';
import { JourneyListService } from '../../providers/journey-list/journey-list.service';
import { JourneyFormDialogComponent } from '../../components/journey-form-dialog/journey-form-dialog.component';
import { UpdateJourneyService } from '../../providers/update-journey/update-journey.service';
import { QueryType } from '../../model/query-type/query-type';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EnterpriseQueryComponent } from '../../components/enterprise-query/enterprise-query.component';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.less']
})
export class JourneyComponent implements OnInit {

  @ViewChild(JourneyFormDialogComponent)
  private journeyFormDialogComponent: JourneyFormDialogComponent;

  @ViewChild(EnterpriseQueryComponent)
  private enterpriseQueryComponent: EnterpriseQueryComponent;
  isShow: boolean = true;
  public queryType: QueryType[] = [
    {
      label: 'deviceId',
      value: '0'
    },
    {
      label: 'containerId',
      value: '1'
    },
    {
      label: 'status',
      value: '2'
    },
    {
      label: 'journeyId',
      value: '3'
    }
  ]
  constructor(
    public journeyListService: JourneyListService,
    private storageService: StorageService,
    private updateJourneyService: UpdateJourneyService,
    private message: NzMessageService,
    private router: Router,
    private terminalListService: TerminalListService,
    private allMapService: AllMapService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getAllJourney()
  }
  activeView (isShow: boolean) {
    this.isShow = isShow;
  }
  setJourney (id: number) {
    this.terminalListService.actionEnRoute(id);
    this.allMapService.DallShows = false
    this.router.navigate([''])
  }
  createBasicMessage(): void {
    this.message.info('To be developed');
  }
  journeyStart (id: number): void {
    this.journeyListService.nowJourney (0, {
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      journeyId: id
    })
    .subscribe(res => {
      if (res.respCode === '00000') {
        if (res.failure === '5') {
          this.message.info('未准备好的个数')
        } else {
          this.journeyListService.setStartJourny(id)
        }
      } else if (res.respCode === '00004') {
        this.message.info('Containers are not all ready')
      }
    })
  }
  journeyEnd (id: number): void {
    this.journeyListService.nowJourney (1, {
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      journeyId: id
    })
    .subscribe(res => {
      if (res.respCode === '00000') {
        if (res.failure === '5') {
          this.message.info('Unprepared number')
        } else {
          this.journeyListService.setEndJourny(id)
        }
      }
    })
  }
  queryJourney (params: any) {
    this.journeyListService.getJourneyList(params).subscribe(res => {
      const newData = res.journeys.map(item => {
        return {
          enterpriseId: item.enterpriseId,
          journeyId: item.journeyId,
          from: item.from,
          fromCity: item.fromCity,
          to: item.to,
          toCity: item.toCity,
          startTime: item.startTime,
          endTime: item.endTime,
          status: item.status,
          createDate: item.createDate,
          updateDate: item.updateDate,
          opUserId: item.opUserId,
          fromLatitude: item.fromLatitude,
          fromLongitude: item.fromLongitude,
          toLatitude: item.toLatitude,
          toLongitude: item.toLongitude,
          containerIds: item.containerIds,
          checked: false,
          disabled: false,
          inRoute: item.inRoute   // 0  表示表示不在途中，1表示在途中
        }
      })  
      this.journeyListService.setJourneyData(newData)
    })
  }
    
  getAllJourney () {
    this.journeyListService.getJourneyList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
    }).subscribe(res => {
      const newData = res.journeys.map(item => {
        return {
          enterpriseId: item.enterpriseId,
          journeyId: item.journeyId,
          from: item.from,
          fromCity: item.fromCity,
          to: item.to,
          toCity: item.toCity,
          startTime: item.startTime,
          endTime: item.endTime,
          status: item.status,
          createDate: item.createDate,
          updateDate: item.updateDate,
          opUserId: item.opUserId,
          fromLatitude: item.fromLatitude,
          fromLongitude: item.fromLongitude,
          toLatitude: item.toLatitude,
          toLongitude: item.toLongitude,
          containerIds: item.containerArray,
          roadmaps: item.roadmaps,
          checked: false,
          disabled: false,
          inRoute: item.inRoute
        }
      })  
      this.journeyListService.setJourneyData(newData)
    });
  }
  queryInput (value: any) {
    if (!value.query) {
      this.getAllJourney()
    } else {
      if (value.checks === '0') {
        this.queryJourney({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          deviceId: value.query
        })
      } else if (value.checks === '1') {
        this.queryJourney({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          containerId: value.query
        })
      } if (value.checks === '2') {
        this.queryJourney({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          status: value.query
        })
      } if (value.checks === '3') {
        this.queryJourney({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          journeyId: value.query
        })
      }
      // this.journeyOne(value)
    }
  }
  journeyOne (value: any) {
    this.journeyListService.journeyOne({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      journeyId: value.query
    }).subscribe(res => {
      if (res.journey === null) {
        this.journeyListService.setJourneyData([])
      } else {
        const item = res.journey;
        let newData: JourneyItem[] = []
        newData.push({
          enterpriseId: item.enterpriseId,
          journeyId: item.journeyId,
          from: item.from,
          fromCity: item.fromCity,
          to: item.to,
          toCity: item.toCity,
          startTime: item.startTime,
          endTime: item.endTime,
          status: item.status,
          createDate: item.createDate,
          updateDate: item.updateDate,
          opUserId: item.opUserId,
          fromLatitude: item.fromLatitude,
          fromLongitude: item.fromLongitude,
          toLatitude: item.toLatitude,
          toLongitude: item.toLongitude,
          containerIds: item.containerIds,
          roadmaps: item.roadmaps,
          checked: false,
          disabled: false,
          inRoute: item.inRoute
        });
        this.journeyListService.setJourneyData(newData)
      }
    });
  }
  dialogOpen (item: JourneyItem, typePrams: Number): void {
    if (typePrams === 1) {
      if (item.status === 0) {
        this.journeyFormDialogComponent.showModal(item, typePrams);
      }
    } else {
      this.journeyFormDialogComponent.showModal(item, typePrams);
    }
  }
  upDateJourney (nitem: any): void {
    let item = nitem.obj
    item.roadmaps = nitem.roadmaps
    let containerIds: string = '';
    item.containerIds.forEach((i) => {
      containerIds += i + ','
    })
    this.updateJourneyService.upDateJourney({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      journeyId: item.journeyId,
      from: item.from,
      to: item.to,
      startTime: item.startTime,
      endTime: item.endTime,
      containerIds: containerIds,
      roadmaps: item.roadmaps
    }).subscribe(res => {
      if (res.respCode === '00000') {
        let newItem: JourneyItem  = item;
        newItem.fromCity = res.journey.fromCity;
        newItem.toCity = res.journey.toCity;
        this.journeyListService.updateJournet(newItem);
        this.journeyFormDialogComponent.isVisible = false;
      }
    });
  }
  addJourney (nitem: any) :void {
    let item = nitem.obj
    item.roadmaps = nitem.roadmaps
    let containerIds: string = '';
    item.containerIds.forEach((i) => {
      containerIds += i + ','
    })
    this.updateJourneyService.addJourney({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      from: item.from,
      to: item.to,
      startTime: item.startTime,
      endTime: item.endTime,
      containerIds: containerIds,
      roadmaps: item.roadmaps
    })
    .subscribe(res => {
      if (res.respCode === '00000') {
        this.journeyListService.addJourney({
          enterpriseId: item.enterpriseId,
          journeyId: item.journeyId,
          from: item.from,
          fromCity: item.fromCity,
          to: item.to,
          toCity: item.toCity,
          startTime: item.startTime,
          endTime: item.endTime,
          status: item.status,
          createDate: item.createDate,
          updateDate: item.updateDate,
          opUserId: item.opUserId,
          fromLatitude: item.fromLatitude,
          fromLongitude: item.fromLongitude,
          toLatitude: item.toLatitude,
          toLongitude: item.toLongitude,
          containerIds: item.containerIds,
          checked: false,
          disabled: false
        });
        this.message.create('success', `This is a message of success`);
        this.enterpriseQueryComponent.submitForm();
        this.journeyFormDialogComponent.isVisible = false;
      }
    });
  }
  deleteJourney (journeyId: Number): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.updateJourneyService.deleteJourney({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          journeyId: journeyId
        })
        .subscribe(res => {
          if (res.respCode === '00000') {
            this.journeyListService.deleteJourney();
            this.message.create('success', `This is a message of success`);          
            this.enterpriseQueryComponent.submitForm();
          }
        });
      }})
  }

}
