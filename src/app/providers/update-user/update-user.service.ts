import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
import { UpdateUserBody } from '../../model/update-user-body/update-user-body';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private httpService: HttpService) { }
  // 更新数据
  upDateUser (body: UpdateUserBody): Observable<any> {
    return this.httpService.post(HTTP_URL.editUser, body)
  }
  // 添加数据
  addUser (body: UpdateUserBody): Observable<any> {
    return this.httpService.post(HTTP_URL.addUser, body)
  }
  // 删除一条数据
  deleteUser (body: UpdateUserBody): Observable<any> {
    return this.httpService.post(HTTP_URL.deleteUser, body)
  }
  // 删除多个数据待开发中

}
