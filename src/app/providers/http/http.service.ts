import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common"; 
import { Observable } from "rxjs/Observable";
import { Md5 } from "md5-typescript";
import { StorageService } from '../../providers/storage-type/storage.service';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../../environments/environment';
import { httpOptions, httpOptionsForm } from '../../datas/http-options.data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpClient: HttpClient, 
    private datePipe: DatePipe,
    private message: NzMessageService,
    private storageService: StorageService
  ) { 
    
  }
  get(url: string): Observable<any> {
    return this.httpClient.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  post(url: string , body: Object): Observable<any> {
    let newUrl: string = url;
    // /rest/1.1/User/login
    if (url !== '/rest/1.1/User/login') {
      // 定义时间yyyyMMddHHmmss
      let timestamp: string = this.datePipe.transform(new Date(), "yyyyMMddHHmmss");
      let token: String = this.storageService.getStorage.token
      // 签名
      let sig: String = Md5.init(`${token + timestamp}`)
      if (environment.production) {
        newUrl = 'https://api.attaplogistics.com' + url + '?sig=' + sig + '&timestamps=' + timestamp;
      } else {
        newUrl = url + '?sig=' + sig + '&timestamps=' + timestamp;
      }
      return this.httpClient.post(newUrl, body, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
    } else {
      // newUrl = 'http://47.75.196.34:3009/login';
      if (environment.production) {
        newUrl = 'https://api.attaplogistics.com';
        return this.httpClient.post(newUrl, body, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
      } else {
        // let newH = httpOptionsForm.headers.set('Authorization', 'my-new-auth-token')
        // return this.httpClient.post('http://47.75.196.34:3009/login', body, httpOptions)
        return this.httpClient.post(newUrl, body, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
      }
    }
  }
  delete(url: string, body: Object): Observable<any> {
    let newUrl: string = url;
    if (url !== '/userLogin') {
      // 定义时间yyyyMMddHHmmss
      const timestamp: string = this.datePipe.transform(new Date(), "yyyyMMddHHmmss");
      const token: String = this.storageService.getStorage.token
      // 签名
      const sig: String = Md5.init(`${token + timestamp}`)
      newUrl = url + '?sig=' + sig + '&timestamps' + timestamp;
    }
    return this.httpClient.delete(newUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  put(url: string, body: Object): Observable<any> {
    let newUrl: string = url;
    const timestamp: string = this.datePipe.transform(new Date(), "yyyyMMddHHmmss");
    const token: String = this.storageService.getStorage.token;
    const sig: String = Md5.init(`${token + timestamp}`);
    newUrl = url + '?sig=' + sig + '&timestamps' + timestamp;
  return this.httpClient.put(newUrl, body, httpOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
        throw new Error('Bad response status: ' + res.status);
    }
    let body = {};
    if (res.status !== 204) {
        body = res;
    }
    return body || {};
  }

  private handleError(error: any) {
      const errMsg = error.statusText || 'Server error';
      //console.error(JSON.stringify(error));
      // this.message.create('error', errMsg);
      return Observable.throw(errMsg);
  }
}
