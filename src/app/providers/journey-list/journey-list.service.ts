import { Injectable } from '@angular/core';
import { JourneyItem } from '../../model/journey-item/journey-item';
import { HttpService } from '../http/http.service';
import { GetJourneyListBody } from '../../model/get-journey-list-body/get-journey-list-body';
import { DeleteJourneyBody } from '../../model/delete-journey-body/delete-journey-body';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { StorageService } from '../../providers/storage-type/storage.service';

@Injectable({
  providedIn: 'root'
})
export class JourneyListService {

  journeyData: JourneyItem[] = [];
  queryData: JourneyItem[] = []
  dataTotal: number = 3;
  allChecked = false;
  indeterminate = false;
  private displayData = [];
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) { }
  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  journeyOne (body: DeleteJourneyBody): Observable<any> {
    return this.httpService.post(HTTP_URL.journeyOne, body)
  }
  getJourneyList (body: GetJourneyListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getJourneyList, body)
  }
  setJourneyData (data: JourneyItem[]): void {
    this.journeyData = data
  }
  addJourney (item: JourneyItem): void {
    this.journeyData = [ ...this.journeyData, item];
  }
  deleteJourney (): void {
    // 删除一个
    this.journeyData = this.journeyData.filter(d => d.checked !== true);
  }
  updateJournet (item: JourneyItem): void {
    let newJournet: JourneyItem[] = this.journeyData;
    newJournet.forEach((i, index) => {
      if (i.journeyId === item.journeyId) {
        i.from = item.from,
        i.to = item.to,
        i.fromCity = item.fromCity,
        i.toCity = item.toCity,
        i.startTime = item.startTime,
        i.endTime = item.endTime,
        i.containerIds = item.containerIds
        i.roadmaps = item.roadmaps
      }
    })
    this.journeyData = newJournet
  }
  nowJourney (type: number, body: any) : Observable<any> {
    if (type === 0) {
      return this.httpService.post(HTTP_URL.startJourney, body)
    } else {
      return this.httpService.post(HTTP_URL.endJourney, body)
    }
  }
  setStartJourny (id: number) {
    this.journeyData.forEach(item => {
      if (item.journeyId === id) {
        item.status = 2
      } 
    })
  }
  setEndJourny (id: number) {
    this.journeyData.forEach(item => {
      if (item.journeyId === id) {
        item.status = 0
      } 
    })
  }
  queryJourneys (enterpriseId: number) {
    this.getJourneyList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseId: enterpriseId
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
          disabled: false
        }
      })  
      this.queryData = newData
    });
  }
}
