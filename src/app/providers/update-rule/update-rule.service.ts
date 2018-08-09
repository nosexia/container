import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { UpdateRuleBody } from '../../model/update-rule-body/update-rule-body';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class UpdateRuleService {

  constructor(private httpService: HttpService) { }
    // 更新数据
    upDateRule (body: UpdateRuleBody): Observable<any> {
      return this.httpService.post(HTTP_URL.editRule, body)
    }

}
