import { Injectable } from '@angular/core';
import { CityItem } from '../../model/city-item/city-item';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { StorageService } from '../../providers/storage-type/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GetCityService {
  cityData: CityItem[] = []
  lineList: any[] = []
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) { }

  getCity () {
    return this.httpService.get(HTTP_URL.city)
  }
  setCity (data: CityItem[]): void {
    this.cityData = data
  }
  getLine () {
    return this.httpService.post(HTTP_URL.list, {
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
    })
  }
  addLine (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.addLine, body)
  }
  setLine (data: any[]) {
    this.lineList = data
  }

}
