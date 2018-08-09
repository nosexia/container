import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { UpdateContainerBody } from '../../model/update-container-body/update-container-body';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class UpdateContainerService {

  constructor(private httpService: HttpService) { }
    // 更新数据
    upDateContainer (body: UpdateContainerBody): Observable<any> {
      return this.httpService.post(HTTP_URL.editContainer, body)
    }
    // 添加数据
    addContainer (body: UpdateContainerBody): Observable<any> {
      return this.httpService.post(HTTP_URL.addContainer, body)
    }
    // 删除一条数据
    deleteContainer (body: UpdateContainerBody): Observable<any> {
      return this.httpService.post(HTTP_URL.deleteContainer, body)
    }
}
