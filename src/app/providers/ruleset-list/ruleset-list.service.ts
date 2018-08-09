import { Injectable } from '@angular/core';
import { RulesetItem } from '../../model/ruleset-item/ruleset-item';
import { HttpService } from '../http/http.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class RulesetListService {
  setRuleData: RulesetItem[] = []
  setDeviceRuleData: RulesetItem[] = []
  setContainerRuleData: RulesetItem[] = []
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
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  getAllRuleList () {
    this.getRuleList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
    }).subscribe(res => {
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
          groupType: item.groupType,
          status: item.status,
          checked: false,
          disabled: false,
          isenable: item.isenable,    // 0表示在使用， 1表示不使用
          isdefault: item.isdefault    // 0 不是默认  1是默认
        }
      })
      this.setRuleDatas(newData)
    });
  }
  getDeviceRuleList () {
    debugger;
    // groupType = 0  container
    // groupType = 1  device
    this.getRuleList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      groupType: 2
    }).subscribe(res => {
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
          groupType: item.groupType,
          status: item.status,
          checked: false,
          disabled: false
        }
      })
      this.setDeviceRuleData = newData;
    });
  }
  getContainerRuleList () {
    this.getRuleList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      groupType: 1
    }).subscribe(res => {
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
          groupType: item.groupType,
          status: item.status,
          checked: false,
          disabled: false
        }
      })
      this.setContainerRuleData = newData;
    });
  }
  // queryContainer (journeyId: number) {
  //   let params: any;
  //   if (journeyId === -1) {
  //     params = {
  //       token: this.storageService.getStorage.token,
  //       opUserId: this.storageService.getStorage.userId
  //     }
  //   } else {
  //     params = {
  //       token: this.storageService.getStorage.token,
  //       opUserId: this.storageService.getStorage.userId,
  //       journeyId: journeyId
  //     }
  //   }
  //   this.getContainerList(params).subscribe(res => {
  //     const newData = res.containers.map(item => {
  //       return {
  //         containerId: item.containerId,
  //         containerName: item.containerName,
  //         enterpriseId: item.enterpriseId,
  //         deviceId: item.deviceId,
  //         state: item.state,
  //         createDate: item.createDate,
  //         updateDate: item.updateDate,
  //         latitude: item.latitude,
  //         isOpen: false,
  //         longitude: item.longitude,
  //         journeryId: item.journeryId,
  //         checked: false,
  //         disabled: false
  //       }
  //     })  
  //     this.queryData = newData;
  //   });
  // }
  getRuleList (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.groupList, body)
  }
  setRuleDatas (data: RulesetItem[]): void {
    this.setRuleData = data
    console.log(this.setRuleData);
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
  addRule (item: RulesetItem): void {
    this.setRuleData = [ ...this.setRuleData, item];
  }
  addRuleGroupList (items: RulesetItem) {
    this.addRuleGroup({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseId: 0,
      groupName: items.groupName,
      ruleGroupRels: items.ruleGroupRels,
      groupType: items.groupType
    }).subscribe(res => {
      let newData = res.ruleGroup;
      newData.checked = false
      newData.disabled = false
      this.addRule(newData);
    });
  }
  updateRuleGroupList (item: RulesetItem) {
    // if (item.status) {
      let params: any = {
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId,
        enterpriseId: 0,
        groupId: item.groupId,
        groupName: item.groupName,
        ruleGroupRels: item.ruleGroupRels,
        groupType: item.groupType,
        status: 0
      }
    // } else {
    //   var params: any = {
    //     token: this.storageService.getStorage.token,
    //     opUserId: this.storageService.getStorage.userId,
    //     enterpriseId: item.enterpriseId,
    //     groupName: item.groupName,
    //     ruleGroupRels: item.ruleGroupRels
    //   }
    // }
    this.editRuleGroup(params).subscribe(res => {
      let newData = res.ruleGroup;
      newData.checked = false
      newData.disabled = false
      this.setRuleData.forEach(i => {
        if (i.groupId === newData.groupId) {
          console.log(i)
          i.groupName = newData.groupName
          i.groupType = newData.groupType
        }
      })
    });
  }
  addRuleGroup(body: any): Observable<any>{
    return this.httpService.post(HTTP_URL.addRuleGroup, body)
  }
  editRuleGroup (body: any): Observable<any>{
    return this.httpService.post(HTTP_URL.editRuleGroup, body)
  }
  deleteRuleGroup(body: any): Observable<any>{
    return this.httpService.post(HTTP_URL.deleteRuleGroup, body);
  }
  queryRule (body: any): Observable<any>{
    return this.httpService.post(HTTP_URL.getRuleList, body)
  }
  editStatus (item: any): void {
    this.editRuleGroup({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      status: 1,
      groupId: item.groupId
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.updateRule(item)
      }
    });
  }
  // deleteContainer (): void {
    // 删除一个
    // this.containerData = this.containerData.filter(d => d.checked !== true);
  // }
  updateRule (item: RulesetItem): void {
    let newRule: RulesetItem[] = this.setRuleData;
    newRule.forEach((i: RulesetItem) => {
      if (i.groupId === item.groupId) {
        i.status = 1
      } else {
        i.status = 0
      }
    })
    this.setRuleData = newRule
  }
  requestdeleteRule () {

  }
  deleteRuleItem (): void {
    // 删除一个
    this.setRuleData = this.setRuleData.filter(d => d.checked !== true);
  }
  // setOpen (item: ContainerItem, isopen: boolean) {
  //   let newContainer: ContainerItem[] = this.containerData;
  //   newContainer.forEach((i: ContainerItem) => {
  //     if (i.containerId === item.containerId) {
  //       i.isOpen = isopen
  //     }
  //   })
  //   this.containerData = newContainer
  // }
}
