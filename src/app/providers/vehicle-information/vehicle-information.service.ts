import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { StorageService } from '../storage-type/storage.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleInformationService {
  data: object = {
    deviceName: '',
    status: 0,
    gpsTime: new Date(),
    startTime: new Date(),
    longitude: 0,
    latitude: 0,
    simiccid: 0,
    simimsi: 0,
    modulesn: '',
    moduleimei: 0,
    cellinfo: ''
  }
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) { }
  setParams (params: string, value: any) {
    this.data[params] = value
  }
  queryStatus (type: number, item: any) {
    // 0是contianer 1是device
    this.getReqMyData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      deviceType: type,
      terminalId: type === 0 ? item.containerId : item.deviceId
    })
    .subscribe(res => {
      if (res.respCode !== '00000') {
        console.log('获取状态失败')
        return false
      }
    })
  }
  getReqMyData (body: any): Observable<any>  {
    return this.httpService.post(HTTP_URL.reqMyData, body)
  }
}
