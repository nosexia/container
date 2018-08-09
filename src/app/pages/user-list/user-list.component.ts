import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../providers/storage-type/storage.service';
import { UserItem } from '../../model/user-item/user-item';
import { UserListService } from '../../providers/user-list/user-list.service';
import { UserFormDialogComponent } from '../../components/user-form-dialog/user-form-dialog.component';
import { UpdateUserService } from '../../providers/update-user/update-user.service';
import { Md5 } from "md5-typescript";
import { QueryType } from '../../model/query-type/query-type';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { GetUserListBody } from '../../model/get-user-list-body/get-user-list-body'
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {

  @ViewChild(UserFormDialogComponent)
  private userFormDialogComponent: UserFormDialogComponent;
  public queryType: QueryType[] = [
    {
      label: 'username',
      value: '0'
    },
    {
      label: 'contactPhone',
      value: '1'
    },
    {
      label: 'email',
      value: '2'
    }
  ]
  constructor (
    public userListService: UserListService,
    private storageService: StorageService,
    private updateUserService: UpdateUserService,
    private message: NzMessageService,
    private modalService: NzModalService,
  ) {
  }
  ngOnInit() {
   this.getAllUser(); 
  }
  queryInput (value: any) {
    if (!value.query) {
      this.getAllUser()
    } else {
      if (value.checks === '0') {
        this.queryUser({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          username: value.query,
          enterpriseId: value.enterpriseId
        })
      } else if (value.checks === '1') {
        this.queryUser({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          contactPhone: value.query,
          enterpriseId: value.enterpriseId
        })
      } if (value.checks === '2') {
        this.queryUser({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          email: value.query,
          enterpriseId: value.enterpriseId
        })
      } 
      // this.userOne(value)
    }
  }
  userOne (value: any) {
    this.userListService.userOne({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      userId: value.query
    }).subscribe(res => {
      if (res.rerespCode === '00000') {
        if (res.user === null) {
          this.userListService.setUserData([])
        } else {
          const item = res.user;
          let newData: UserItem[] = []
          newData.push({
              username: item.username,
              userId: item.userId,
              password: item.password,
              enterpriseId: item.enterpriseId,
              group: item.group,
              firstName: item.firstName,
              lastName: item.lastName,
              status: item.status,
              opUserId: item.opUserId,
              contactPhone: item.contactPhone,
              email: item.email,
              checked: false,
              disabled: false
          });
          this.userListService.setUserData(newData)
        }
      }
    });
  }
  getAllUser () {
    this.userListService.getUserList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
    }).subscribe(res => {
      const newData = res.users.map(item => {
        return {
          username: item.username,
          userId: item.userId,
          password: item.password,
          enterpriseId: item.enterpriseId,
          group: item.group,
          firstName: item.firstName,
          lastName: item.lastName,
          status: item.status,
          opUserId: item.opUserId,
          contactPhone: item.contactPhone,
          email: item.email,
          checked: false,
          disabled: false
        }
      })
      this.userListService.setUserData(newData);
    });
  }
  queryUser (params: GetUserListBody) {
    this.userListService.getUserList(params).subscribe(res => {
      const newData = res.users.map(item => {
        return {
          username: item.username,
          userId: item.userId,
          password: item.password,
          enterpriseId: item.enterpriseId,
          group: item.group,
          firstName: item.firstName,
          lastName: item.lastName,
          status: item.status,
          opUserId: item.opUserId,
          contactPhone: item.contactPhone,
          email: item.email,
          checked: false,
          disabled: false
        }
      })
      this.userListService.setUserData(newData)
    });
  }
  dialogOpen (item: UserItem, typePrams: Number): void {
    this.userFormDialogComponent.showModal(item, typePrams);
  }
  upDateUser (item: UserItem): void {
    this.updateUserService.upDateUser({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId.toString(),
      enterpriseName: item.enterpriseName.toString(),
      enterpriseId: item.enterpriseId.toString(),
      password: Md5.init(item.password),
      username: item.username,
      userId: item.userId,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      contactPhone: item.contactPhone,
      group: item.group
    }).subscribe(res => {
      if (res.respCode === '00000') {
        // this.userListService.updateUser(item);
        this.userFormDialogComponent.isVisible = false;
        this.message.create('success', `This is a message of success`);
        this.getAllUser();
      }
    });
  }
  addUser (item: UserItem): void {
    debugger;
    this.updateUserService.addUser({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId.toString(),
      enterpriseId: item.enterpriseId.toString(),
      username: item.username,
      password: item.password ? Md5.init(item.password) : '',
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      contactPhone: item.contactPhone,
      group: item.group
    })
    .subscribe(res => {
      if (res.respCode === '00000') {
        this.userListService.addUser({
          username: item.username,
          password: item.password,
          enterpriseId: item.enterpriseId,
          group: item.group,
          firstName: item.firstName,
          lastName: item.lastName,
          status: item.status,
          contactPhone: item.contactPhone,
          email: item.email,
          userId: res.user.userId,
          checked: false,
          disabled: false
        })
      }
      this.userFormDialogComponent.isVisible = false;
      this.message.create('success', `This is a message of success`);
      this.getAllUser();
    });
  }
  deleteUser (userId: Number): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.updateUserService.deleteUser({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId.toString(),
          userId: userId
        })
        .subscribe(res => {
          if (res.respCode === '00000') {
            this.message.create('success', `This is a message of success`);
            this.getAllUser();
            // this.userListService.deleteUser();
          }
        });
      }})
  }

}
