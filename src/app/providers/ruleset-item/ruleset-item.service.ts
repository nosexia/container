import { Injectable } from '@angular/core';
import { StorageService } from '../../providers/storage-type/storage.service';
import { HttpService } from '../http/http.service';
import { RulesetItem } from '../../model/ruleset-item/ruleset-item';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class RulesetItemService {
  rulesetData: RulesetItem[] = [];
  queryData: RulesetItem[] = [];
  dataTotal: number = 3;
  allChecked = false;
  indeterminate = false;
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) { }
  checkAll(value: boolean): void {
    // this.displayData.forEach(data => {
    //   if (!data.disabled) {
    //     data.checked = value;
    //   }
    // });
    // this.refreshStatus();
  }
  queryRulesetList (reqpage: number) {
    let params: any;
      params = {
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId,
        reqPage: reqpage,
        pageSize: 10
      }
    this.getRulesetList(params).subscribe(res => {
      const newData = res.data.map(item => {
        return {
          createDate: item.createDate,
          enterpriseId: item.enterpriseId,
          groupId: item.groupId,
          groupName: item.groupName,
          opUserId: item.opUserId,
          pageSize: item.pageSize,
          reqPage: item.reqPage,
          respCode: item.respCode,
          ruleGroupRels: item.ruleGroupRels,
          status: item.status,
          token: item.token,
          checked: false,
          disabled: false
        }
      })  
      this.rulesetData = newData;
    });
  }
  addRuleGroupList (enterpriseId:String ,groupName:String,ruleGroupRels:Array<any>) {
    let params: any;
      params = {
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId,
        enterpriseId: enterpriseId,
        groupName: groupName,
        GroupRels:ruleGroupRels
      }
    this.addRuleGroup(params).subscribe(res => {
        
    });
  }
  addRuleGroup(body: RulesetItem): Observable<any>{
    return this.httpService.post(HTTP_URL.addRuleGroup, body)
  }

  getRulesetList (body: RulesetItem): Observable<any> {
    return this.httpService.post(HTTP_URL.groupList, body)
  }
  refreshStatus() {
    // const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    // const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    // this.allChecked = allChecked;
    // this.indeterminate = (!allChecked) && (!allUnChecked);
  }
  addContainer (item: RulesetItem): void {
    this.rulesetData = [ ...this.rulesetData, item];
  }
  updateContainer (item: RulesetItem): void {
    let newContainer: RulesetItem[] = this.rulesetData;
    newContainer.forEach((i: RulesetItem) => {

    })
    this.rulesetData = newContainer
  }
}
