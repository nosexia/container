import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { UpdateDeviceBody } from '../../model/update-device-body/update-device-body';

@Injectable({
  providedIn: 'root'
})
export class UpdateDeviceService {

  constructor(private httpService: HttpService) { }
    // 更新数据
    upDateDevice (body: UpdateDeviceBody): Observable<any> {
      return this.httpService.post(HTTP_URL.upDateDevice, body)
    }
    // 添加数据
    addDevice (body: UpdateDeviceBody): Observable<any> {
      return this.httpService.post(HTTP_URL.addDevice, body)
    }
    // 删除一条数据
    deleteDevice (body: UpdateDeviceBody): Observable<any> {
      return this.httpService.post(HTTP_URL.deleteDevice, body)
    }
    // 删除多个数据待开发中

    // 删除sim数据
    delBand (body: UpdateDeviceBody): Observable<any> {
      return this.httpService.post(HTTP_URL.delBand, body)
    }
}
