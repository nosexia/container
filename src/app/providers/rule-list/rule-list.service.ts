import { Injectable } from '@angular/core';
import { RuleItem } from '../../model/rule-item/rule-item';
import { RuleListBody } from '../../model/rule-list-body/rule-list-body';
import { HttpService } from '../http/http.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class RuleListService {

  ruleData: RuleItem[] = []
  dataTotal: number = 3;
  allChecked = false;
  indeterminate = false;
  displayData = [];
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
  getAllRuleList (groupId: Number): void {
    this.getRuleList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      groupId: groupId
    }).subscribe(res => {
      const newData = res.ruleConfigs.map((item: RuleItem) => {
        return {
          ruleName: item.ruleName,
          enterpriseId: item.enterpriseId,
          sensorName: item.sensorName,
          sensorTag: item.sensorTag,
          ruleTag: item.ruleTag,
          ruleLen: item.ruleLen,
          ruleValue: item.ruleValue,
          unit: item.unit,
          confId: item.confId,
          checked: false,
          disabled: false
        }
      })
      this.setRuleData(newData)
    });
  }
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  getRuleList (body: RuleListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getRuleList, body)
  }

  deleteRuleGroup(body: RuleListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.deleteRuleGroup, body)
  }
  setRuleData (data: RuleItem[]): void {
    this.ruleData = data
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

}
