import { Injectable } from '@angular/core';
import { UserItem } from '../../model/user-item/user-item';
import { HttpService } from '../http/http.service';
import { GetUserListBody } from '../../model/get-user-list-body/get-user-list-body';
import { Md5 } from "md5-typescript";
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  userData: UserItem[] = []
  dataTotal: number = 3;
  allChecked = false;
  indeterminate = false;
  private displayData = [];
  constructor(
    private httpService: HttpService
  ) { }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  getUserList (body: GetUserListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getUserList, body)
  }
  userOne (body: GetUserListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.userOne, body)
  }
  setUserData (data: UserItem[]): void {
    this.userData = data
  }
  // 按照 Angular 的设计，当需要对 nzData 中  的数据进行增删时需要使用以下操作，使用 push 或者 splice 修改 nzData 的数据不会生效
  // 增加数据
  // this.dataSet = [ ...this.dataSet, {
  //   key    : `${this.i}`,
  //   name   : `Edward King ${this.i}`,
  //   age    : '32',
  //   address: `London, Park Lane no. ${this.i}`
  // }];
  // 删除数据
  // this.dataSet = this.dataSet.filter(d => d.key !== i);
  addUser (item: UserItem): void {
    this.userData = [ ...this.userData, item];
  }
  deleteUser (): void {
    // 删除一个
    this.userData = this.userData.filter(d => d.checked !== true);
  }
  updateUser (item: UserItem): void {
    let newUser: UserItem[] = this.userData
    newUser.forEach((i: UserItem) => {
      if (i.userId === item.userId) {
        i.enterpriseId = item.enterpriseId
        i.password === item.password ? i.password = Md5.init(item.password) : i.password = ''
        i.username = item.username
        i.userId = item.userId
        i.firstName = item.firstName
        i.lastName = item.lastName
        i.email = item.email
        i.contactPhone = item.contactPhone
        i.group = item.group
      }
    })
    this.userData = newUser
  }
}
