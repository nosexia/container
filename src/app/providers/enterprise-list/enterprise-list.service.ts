import { Injectable } from '@angular/core';
import { EnterpriseItem } from '../../model/enterprise-item/enterprise-item';
import { HttpService } from '../http/http.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { GetEnterpriseListBody } from '../../model/get-enterprise-list-body/get-enterprise-list-body';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseListService {

  enterpriseData: EnterpriseItem[] = []
  dataTotal: number = 3;
  allChecked = false;
  indeterminate = false;
  private displayData = [];
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
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
  queryEnterprise (params: GetEnterpriseListBody) {
    this.getEnterpriseList(params).subscribe(res => {
      const newData = res.enterprises.map(item => {
        return {
          enterpriseName: item.enterpriseName,
          contactName: item.contactName,
          contactNo: item.contactNo,
          email: item.email,
          enterpriseId: item.enterpriseId,
          viewType: item.viewType,
          checked: false,
          disabled: false
        }
      })  
      this.setEnterpriseData(newData)
    });
  }
  getAllEnterprise () {
    this.getEnterpriseList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
    }).subscribe(res => {
      const newData = res.enterprises.map(item => {
        return {
          enterpriseName: item.enterpriseName,
          contactName: item.contactName,
          contactNo: item.contactNo,
          email: item.email,
          enterpriseId: item.enterpriseId,
          viewType: item.viewType,
          checked: false,
          disabled: false
        }
      })  
      this.setEnterpriseData(newData)
    });
  }
  enterpriseOne (body: GetEnterpriseListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.enterpriseOne, body)
  }
  getEnterpriseList (body: GetEnterpriseListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getEnterpriseList, body)
  }
  setEnterpriseData (data: EnterpriseItem[]): void {
    this.enterpriseData = data
  }
  addEnterprise (item: EnterpriseItem): void {
    this.enterpriseData = [ ...this.enterpriseData, item];
  }
  deleteEnterprise (): void {
    // 删除一个
    this.enterpriseData = this.enterpriseData.filter(d => d.checked !== true);
  }
  updateEnterprise (item: EnterpriseItem): void {
    let newEnterprise: EnterpriseItem[] = this.enterpriseData;
    newEnterprise.forEach((i, index) => {
      if (i.enterpriseId === item.enterpriseId) {
        i.enterpriseName = item.enterpriseName
        i.contactName = item.contactName,
        i.contactNo = item.contactNo,
        i.email = item.email,
        i.enterpriseId = item.enterpriseId,
        i.checked = item.checked,
        i.disabled = item.disabled
      }
    })
    this.enterpriseData = newEnterprise
  }
}
