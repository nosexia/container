import { Injectable } from '@angular/core';
import { SimItem } from '../../model/sim-item/sim-item';
import { SimListBody } from '../../model/sim-list-body/sim-list-body';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { StorageService } from '../../providers/storage-type/storage.service';
import HTTP_URL from '../../datas/http-url.data';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class SimListService {
  simListData: SimItem[] = [];
  selectData: SimItem[] = [];
  dataTotal: number = 30;
  allChecked = false;
  indeterminate = false;
  displayData = [];
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { }
  getAllList () {  
    this.requestAllData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.setSimData(res.data)
      }
    })

  }
  selectList () {  
    this.requestAllData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      status: 0
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.selectData = res.data
      }
    })

  }
  addSimItem (item: any) {
    this.requestAddItem({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      simName: item.simName,
      iccid: item.iccid,
      imsi: item.imsi
    }).subscribe(res => {
      if (res.respCode === '00000') {
        res.data[0].checked = false
        res.data[0].disabled = false
        this.updateDevice(res.data[0]);
        this.addSim(res.data[0]);
      }
    })
  }
  updateDevice (item: any): void {
    let newDevice: SimItem[] = this.simListData;
    newDevice.forEach((i: SimItem) => {
      if (i.id === item.id) {
        i.simName = item.simName,
        i.iccid = item.iccid,
        i.imsi = item.imsi
      }
    })
    this.simListData = newDevice
  }
  deleteSimItem () {
    let checkdItem: SimItem[] = this.simListData.filter(d => d.checked === true);
    if (checkdItem.length >= 2 || checkdItem.length <= 0) return
    this.requestDeleteSimItem({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      id: checkdItem[0].id
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.deleteSim()
      } else if (res.respCode === '00006') {
        this.message.error('Unable to delete!')
      }
    })
  }
  upSimItem (item: any) {
    this.requestUpSimItem({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      id: item.id,
      simName: item.simName,
      iccid: item.iccid,
      imsi: item.imsi
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.updateDevice(item);
      }
    })
  } 
  requestDeleteSimItem (body: any) :Observable<any> {
    return this.httpService.post(HTTP_URL.deleteSim, body)
  }
  requestUpSimItem (body: any) :Observable<any> {
    return this.httpService.post(HTTP_URL.updateSim, body)
  }
  getICCID (iccid: string) {
    this.getIccidJson({
      token: this.storageService.getStorage.token,
      iccid: iccid
    }).subscribe(res => {
      console.log(res)
      if (res.respCode === '00000') {
        if (res.data) {
          let options = JSON.parse(res.data);
          let contentText = '';
          for(let key in options){
            if (key === 'ctdDataUsage') {
              contentText += 'The amount of data used (' + options[key] + ') since the beginning of the billing cycle;<br>';
            }
            if (key === 'ctdSMSUsage') {
              contentText += 'A count of the mobile-originated and mobileterminated messages since the beginning of the billing cycle.<br>';
            }
          }
          this.modalService.confirm({
            nzTitle: 'Info',
            nzContent: contentText,
            nzOkText: 'Close',
            nzCancelText: null
          })
        } else {
          this.modalService.confirm({
            nzTitle: 'Info',
            nzContent: 'Not Data',
            nzOkText: 'Close',
            nzCancelText: null
          })
        }
      }
    })
  }
  setSimData (data: SimItem[]) {
    this.simListData = data
  }
  addSim (item: SimItem): void {
    this.simListData = [ ...this.simListData, item];
  }
  deleteSim (): void {
    // 删除一个
    this.simListData = this.simListData.filter(d => d.checked !== true);
  }
  requestAllData (body: SimListBody) :Observable<any> {
    return this.httpService.post(HTTP_URL.simList, body)
  }
  requestAddItem (body: any) {
    return this.httpService.post(HTTP_URL.addSim, body)
  }
  getIccidJson (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.deviceCtdUsages, body)
  }
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
}
