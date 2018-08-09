import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { UpdateJourneyBody } from '../../model/update-journey-body/update-journey-body';
import { DeleteJourneyBody } from '../../model/delete-journey-body/delete-journey-body';

@Injectable({
  providedIn: 'root'
})
export class UpdateJourneyService {

  constructor(private httpService: HttpService) { }
  // 更新数据
  upDateJourney (body: UpdateJourneyBody): Observable<any> {
    return this.httpService.post(HTTP_URL.editJourney, body)
  }
  // 添加数据
  addJourney (body: UpdateJourneyBody): Observable<any> {
    return this.httpService.post(HTTP_URL.addJourney, body)
  }
  // 删除一条数据
  deleteJourney (body: DeleteJourneyBody): Observable<any> {
    return this.httpService.post(HTTP_URL.deleteJourney, body)
  }
  // 删除多个数据待开发中
}
