import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../providers/storage-type/storage.service';
import { EnterpriseItem } from '../../model/enterprise-item/enterprise-item';
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';
import { EnterpriseFormDialogComponent } from '../../components/enterprise-form-dialog/enterprise-form-dialog.component';
import { UpdateEnterpriseService } from '../../providers/update-enterprise/update-enterprise.service';
import { QueryType } from '../../model/query-type/query-type'
import { EnterpriseQueryComponent } from '../../components/enterprise-query/enterprise-query.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.less']
})
export class EnterpriseListComponent implements OnInit {

  @ViewChild(EnterpriseFormDialogComponent)
  private enterpriseFormDialogComponent: EnterpriseFormDialogComponent;
  @ViewChild(EnterpriseQueryComponent)
  private enterpriseQueryComponent: EnterpriseQueryComponent;
  public queryType: QueryType[] = [
    {
      label: 'enterpriseName',
      value: '0'
    },
    {
      label: 'contactName',
      value: '1'
    },
    {
      label: 'contactNo',
      value: '2'
    },
    {
      label: 'email',
      value: '3'
    },
    {
      label: 'enterpriseId',
      value: '4'
    }
  ]
  constructor(
    public enterpriseListService: EnterpriseListService,
    private storageService: StorageService,
    private updateEnterpriseService: UpdateEnterpriseService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { 
    
  }

  ngOnInit() {
    this.enterpriseQueryComponent.hideOneSelect();
    this.enterpriseListService.getAllEnterprise();
  }
  queryInput (value: any) {
    if (!value.query) {
      this.enterpriseListService.getAllEnterprise()
    } else {
      this.enterpriseQueryComponent.isLoadingBtn = true;
      if (value.checks === '0') {
        this.enterpriseListService.queryEnterprise({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseName: value.query
        })
      } else if (value.checks === '1') {
        this.enterpriseListService.queryEnterprise({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          contactName: value.query
        })
      } if (value.checks === '2') {
        this.enterpriseListService.queryEnterprise({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          contactNo: value.query
        })
      } if (value.checks === '3') {
        this.enterpriseListService.queryEnterprise({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          email: value.query
        })
      }  if (value.checks === '4') {
        this.enterpriseListService.queryEnterprise({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.query
        })
      }
      this.enterpriseQueryComponent.isLoadingBtn = false;
    }
  }
  enterpriseOne (value: any) {
    this.enterpriseListService.enterpriseOne({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseId: value.query
    }).subscribe(res => {
      if (res.enterprise === null) {
        this.enterpriseListService.setEnterpriseData([])
      } else {
        const item = res.enterprise;
        let newData: EnterpriseItem[] = []
        newData.push({
          enterpriseName: item.enterpriseName,
          contactName: item.contactName,
          contactNo: item.contactNo,
          email: item.email,
          enterpriseId: item.enterpriseId,
          viewType: item.viewType,
          checked: false,
          disabled: false
        });
        this.enterpriseListService.setEnterpriseData(newData)
      }
    });
  }
  dialogOpen (item: EnterpriseItem, typePrams: Number): void {
    this.enterpriseFormDialogComponent.showModal(item, typePrams);
  }
  upDateEnterprise (item: EnterpriseItem): void {
    this.updateEnterpriseService.upDateEnterprise({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseName: item.enterpriseName,
      contactName: item.contactName,
      contactNo: item.contactNo,
      email: item.email,
      enterpriseId: item.enterpriseId,
      viewType: item.viewType
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.enterpriseListService.updateEnterprise(item);
        this.enterpriseFormDialogComponent.isVisible = false;
        this.enterpriseQueryComponent.submitForm();
        // this.enterpriseFormDialogComponent.handleCancel();
      }
    });
  }
  addEnterprise (item: EnterpriseItem): void {
    this.updateEnterpriseService.addEnterprise({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseName: item.enterpriseName,
      contactName: item.contactName,
      contactNo: item.contactNo,
      email: item.email,
      viewType: item.viewType
    })
    .subscribe(res => {
      if (res.respCode === '00000') {
        this.message.create('success', `This is a message of success`);
        this.enterpriseQueryComponent.submitForm();
        this.enterpriseFormDialogComponent.isVisible = false;
      } else {
        this.message.create('error', `This is a message of error`);
      }
    });
  }
  deleteEnterprise (enterpriseId: Number): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.updateEnterpriseService.deleteEnterprise({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: enterpriseId
        })
        .subscribe(res => {
          if (res.respCode === '00000') { 
            this.message.create('success', `This is a message of success`);          
            this.enterpriseListService.deleteEnterprise();
            this.enterpriseQueryComponent.submitForm();
          } else if (res.respCode === '00006') {
            this.message.create('error', 'Conflict: object refrenced!');
          }
        })
      }
    });
  }

}
