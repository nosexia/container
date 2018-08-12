import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ContainerListService } from '../../providers/container-list/container-list.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { ContainerFormDialogComponent } from '../../components/container-form-dialog/container-form-dialog.component';
import { ContainerItem } from '../../model/container-item/container-item'
import { UpdateContainerService } from '../../providers/update-container/update-container.service';
import { QueryType } from '../../model/query-type/query-type'
import { AllMapService } from '../../providers/all-map/all-map.service';
import { Router } from '@angular/router';
import { AddLineDialogComponent } from '../../components/add-line-dialog/add-line-dialog.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EnterpriseQueryComponent } from '../../components/enterprise-query/enterprise-query.component';
import { HomeTypeService } from '../../providers/home-type/home-type.service'
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnDestroy {
  @ViewChild(ContainerFormDialogComponent)
  private containerFormDialogComponent: ContainerFormDialogComponent;

  @ViewChild(AddLineDialogComponent)
  private addLineDialogComponent: AddLineDialogComponent;

  @ViewChild(EnterpriseQueryComponent)
  private enterpriseQueryComponent: EnterpriseQueryComponent;

  isShow: boolean = true;
  private timer: Subscription = null;
  public queryType: QueryType[] = [
    {
      label: 'containerId',
      value: '0'
    }
  ]
  constructor (
    public containerListService: ContainerListService,
    private storageService: StorageService,
    private updateContainerService: UpdateContainerService,
    public allMapService: AllMapService,
    private router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
    private homeTypeService: HomeTypeService
  ) {
    
  }
  ngOnDestroy () {
    if (this.timer) {
      // 清除定时器
      this.timer.unsubscribe()
    }
  }
  ngOnInit() {
    this.containerListService.getAllContainer();
    this.timer = interval(5000).subscribe(val => {
      this.containerListService.getAllContainer();
    })
  }
  pushHomeDialog (id: string) {
    this.addLineDialogComponent.showModal(id);
  }
  showContaner (item: any) {
    this.homeTypeService.showAllCD = true
    this.homeTypeService.showRight = false
    this.router.navigate([''])
  } 
  showDevice (item: any) {
    console.log(item)
    this.allMapService.setShow(true)
  }
  activeView (isShow: boolean) {
    this.isShow = isShow;
  }
  queryInput (value: any) {
    if (!value.query) {
      this.containerListService.getAllContainer()
    } else {
      if (value.checks === '0') {
        this.queryContainer({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: value.enterpriseId,
            containerId: value.query
        })
      }
    }
  }
  queryContainer (params: any) {
    this.containerListService.getContainerList(params).subscribe(res => {
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
          journeryId: item.journeryId,
          rulesetName: item.rulesetName,
          rulesetId: item.rulesetId,
          isOpen: false,
          checked: false,
          disabled: false
        }
      })  
      this.containerListService.setContainerData(newData)
    });
  }
  queryEnterpriseId (value: any) {
    this.containerListService.getContainerList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseId: value
    }).subscribe(res => {
      if (res.respCode === '00000') {
        if (res.containers.length === 0) {
          this.containerListService.setContainerData([])
        } else {
          const newData: ContainerItem[] = res.containers.map(item => {
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
              journeryId: item.journeryId,
              rulesetName: item.rulesetName,
              rulesetId: item.rulesetId,
              isOpen: false,
              checked: false,
              disabled: false
            }
          })
          this.containerListService.setContainerData(newData);
        }
      }
    });
  }
  queryContainerId (value: any) {
    this.containerListService.getContainerList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      containerId: value
    }).subscribe(res => {
      if (res.respCode === '00000') {
        if (res.containers.length === 0) {
          this.containerListService.setContainerData([])
        } else {
          const newData: ContainerItem[] = res.containers.map(item => {
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
          this.containerListService.setContainerData(newData);
        }
      }
    });
  }
  dialogOpen (item: ContainerItem, typePrams: Number): void {
    this.containerFormDialogComponent.showModal(item, typePrams);
  }
  addContainer (item: ContainerItem): void {
    this.updateContainerService.addContainer({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId.toString(),
      enterpriseId: item.enterpriseId,
      containerId: item.containerId,
      containerName: item.containerName,
      rulesetId: item.rulesetId
    })
    .subscribe(res => {
      if (res.respCode === '00000') {
        this.containerListService.addContainer({
          containerId: item.containerId,
          containerName: item.containerName,
          enterpriseId: item.containerId,
          deviceId: res.container.deviceId,
          state: res.container.state,
          createDate: res.container.createDate,
          updateDate: res.container.updateDate,
          latitude: res.container.latitude,
          longitude: res.container.longitude,
          rulesetName: item.rulesetName,
          rulesetId: item.rulesetId,
          isOpen: false,
          checked: false,
          disabled: false
        })
      }
      this.message.create('success', `This is a message of success`);
      this.enterpriseQueryComponent.submitForm();
      this.containerFormDialogComponent.isVisible = false;
    });
  }
  upDateContainer (item: ContainerItem): void {
    this.updateContainerService.upDateContainer({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId.toString(),
      enterpriseId: item.enterpriseId,
      containerId: item.containerId,
      containerName: item.containerName,
      rulesetName: item.rulesetName,
      rulesetId: item.rulesetId,
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.containerListService.updateContainer(res.container);
        this.message.create('success', `This is a message of success`);
        this.enterpriseQueryComponent.submitForm();
        this.containerFormDialogComponent.isVisible = false;
      }
    });
  }
  deleteContainer (containerId: Number): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.updateContainerService.deleteContainer({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId.toString(),
          containerId: containerId
        })
        .subscribe(res => {
          if (res.respCode === '00000') {
            this.containerListService.deleteContainer();
            this.message.create('success', `This is a message of success`); 
            this.enterpriseQueryComponent.submitForm();
          }
        });
      }})
  }
}