import { Injectable } from '@angular/core';
import { ContainerItem } from '../../model/container-item/container-item';
import { ContainerListBody } from '../../model/container-list-body/container-list-body';
import { HttpService } from '../http/http.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { Observable } from 'rxjs';
import HTTP_URL from '../../datas/http-url.data';

@Injectable({
  providedIn: 'root'
})
export class ContainerListService {
  containerData: ContainerItem[] = []
  queryData: ContainerItem[] = []
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
  getAllContainer () {
    this.getContainerList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
    }).subscribe(res => {
      console.log(res)
      const newData = res.containers.map(item => {
        return {
          containerId: item.containerId,
          containerName: item.containerName,
          enterpriseId: item.enterpriseId,
          deviceId: item.deviceId,
          state: item.state,
          createDate: item.createDate,
          updateDate: item.updateDate,
          latitude: item.latitude,
          longitude: item.longitude,
          isOpen: false,
          journeryId: item.journeryId,
          rulesetName: item.rulesetName,
          rulesetId: item.rulesetId,
          checked: false,
          disabled: false
        }
      })  
      this.setContainerData(newData)
    });
  }
  queryContainer (enterpriseId: number) {
    let params: any = {
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseId: enterpriseId
    }
    this.getContainerList(params).subscribe(res => {
      const newData = res.containers.map(item => {
        return {
          containerId: item.containerId,
          containerName: item.containerName,
          enterpriseId: item.enterpriseId,
          deviceId: item.deviceId,
          state: item.state,
          createDate: item.createDate,
          updateDate: item.updateDate,
          latitude: item.latitude,
          isOpen: false,
          longitude: item.longitude,
          journeryId: item.journeryId,
          rulesetName: item.rulesetName,
          rulesetId: item.rulesetId,
          checked: false,
          disabled: false
        }
      })  
      this.queryData = newData;
    });
  }
  getContainerList (body: ContainerListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getContainerList, body)
  }
  setContainerData (data: ContainerItem[]): void {
    this.containerData = data
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
  addContainer (item: ContainerItem): void {
    this.containerData = [ ...this.containerData, item];
  }
  deleteContainer (): void {
    // 删除一个
    this.containerData = this.containerData.filter(d => d.checked !== true);
  }
  updateContainer (item: ContainerItem): void {
    let newContainer: ContainerItem[] = this.containerData;
    newContainer.forEach((i: ContainerItem) => {
      if (i.containerId === item.containerId) {
        i.containerName = item.containerName,
        i.enterpriseId = item.enterpriseId,
        i.rulesetName = item.rulesetName
        i.rulesetId = item.rulesetId
      }
    })
    this.containerData = newContainer
  }
  setOpen (item: ContainerItem, isopen: boolean) {
    let newContainer: ContainerItem[] = this.containerData;
    newContainer.forEach((i: ContainerItem) => {
      if (i.containerId === item.containerId) {
        i.isOpen = isopen
      }
    })
    this.containerData = newContainer
  }
}
