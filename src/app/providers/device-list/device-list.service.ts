import { Injectable } from '@angular/core';
import { DeviceItem } from '../../model/device-item/device-item';
import { HttpService } from '../http/http.service';
import { GetDeviceListBody } from '../../model/get-device-list-body/get-device-list-body';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { StorageService } from '../../providers/storage-type/storage.service';
import { NzModalService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  deviceData: DeviceItem[] = []
  dataTotal: number = 3;
  allChecked = false;
  indeterminate = false;
  displayData = [];
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private modalService: NzModalService
  ) { }
  getICCID (iccid: string) {
    this.getIccidJson({
      token: this.storageService.getStorage.token,
      iccid: iccid
    }).subscribe(res => {
      if (res.respCode === '00000') {
        if (res.data) {
          let options = JSON.parse(res.data);
          let contentText = '';
          for(let key in options){
            contentText += key + '=' + options[key] + '<br>';
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
            nzContent: '',
            nzOkText: 'Close',
            nzCancelText: null
          })
        }
      }
    })
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
  getAllDevice () {
    this.getDeviceList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
    }).subscribe(res => {
      const newData = res.devices.map(item => {
        return {
          updateDate: item.updateDate,
          enterpriseId: item.enterpriseId,
          deviceId: item.deviceId,
          imei: item.imei,
          imsi: item.imsi,
          networkModuleSn: item.networkModuleSn,
          iccid: item.iccid,
          status: item.state,
          deviceName: item.deviceName,
          latitude: item.latitude,
          longitude: item.longitude,
          rulesetName: item.rulesetName,
          rulesetId: item.rulesetId,
          simName: item.simName,
          isOpen: false,
          checked: false,
          disabled: false
        }
      })  
      this.setDeviceData(newData)
    });
  }
  deviceOne (body: GetDeviceListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.deviceOne, body)
  }
  getDeviceList (body: GetDeviceListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getDeviceList, body)
  }
  searchDignostics (id: any): Observable<any> {
    return this.httpService.post(HTTP_URL.dignostics, {
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      deviceId: id
    })
  }
  getIccidJson (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.deviceCtdUsages, body)
  }
  setDeviceData (data: DeviceItem[]): void {
    this.deviceData = data
  }
  // 按照 Angular 的设计，当需要对 nzData 中  的数据进行增删时需要使用以下操作，使用 push 或者 splice 修改 nzData 的数据不会生效
  // 增加数据
  // this.dataSet = [ ...this.dataSet, {
  //   key    : `${this.i}`,
  //   name   : `Edward King ${this.i}`,
  //   age    : '32',
  //   address: `London, Park Lane no. ${this.i}`
  // }];
  // 删除数据
  // this.dataSet = this.dataSet.filter(d => d.key !== i);
  addDevice (item: DeviceItem): void {
    this.deviceData = [ ...this.deviceData, item];
  }
  deleteDevice (): void {
    // 删除一个
    this.deviceData = this.deviceData.filter(d => d.checked !== true);
  }
  updateDevice (item: DeviceItem): void {
    let newDevice: DeviceItem[] = this.deviceData;
    newDevice.forEach((i: DeviceItem) => {
      if (i.deviceId === item.deviceId) {
        i.deviceName = item.deviceName,
        i.enterpriseId = item.enterpriseId
        i.rulesetName = item.rulesetName
        i.rulesetId = item.rulesetId,
        i.iccid = item.iccid
      }
    })
    this.deviceData = newDevice
  }
  setOpen (item: DeviceItem, isopen: boolean) {
    let newDevices: DeviceItem[] = this.deviceData;
    newDevices.forEach((i: DeviceItem) => {
      if (i.deviceId === item.deviceId) {
        i.isOpen = isopen
      }
    })
    this.deviceData = newDevices
  }
}
