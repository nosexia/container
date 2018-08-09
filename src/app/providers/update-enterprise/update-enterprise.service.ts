import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { GetEnterpriseListBody } from '../../model/get-enterprise-list-body/get-enterprise-list-body';

@Injectable({
  providedIn: 'root'
})
export class UpdateEnterpriseService {

  constructor(private httpService: HttpService) { }
  // 更新数据
  upDateEnterprise (body: GetEnterpriseListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.editEnterprise, body)
  }
  // 添加数据
  addEnterprise (body: GetEnterpriseListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.addEnterprise, body)
  }
  // 删除一条数据
  deleteEnterprise (body: GetEnterpriseListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.deleteEnterprise, body)
  }
  // 删除多个数据待开发中
}
