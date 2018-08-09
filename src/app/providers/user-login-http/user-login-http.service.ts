import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { UserLoginBody } from '../../model/user-login-body/user-login-body'
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';
@Injectable({
  providedIn: 'root'
})
export class UserLoginHttpService {
  constructor(
    private httpService: HttpService
  ) { }

  userLogin (body: UserLoginBody): Observable<any> {
    return this.httpService.post(HTTP_URL.userLogin, body)
  }

}
