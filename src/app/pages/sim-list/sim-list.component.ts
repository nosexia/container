import { Component, OnInit, ViewChild } from '@angular/core';
import { SimItem } from '../../model/sim-item/sim-item';
import { SimListService } from '../../providers/sim-list/sim-list.service';
import { SimFormDialogComponent } from '../../components/sim-form-dialog/sim-form-dialog.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { StorageService } from '../../providers/storage-type/storage.service';
@Component({
  selector: 'app-sim-list',
  templateUrl: './sim-list.component.html',
  styleUrls: ['./sim-list.component.less']
})
export class SimListComponent implements OnInit {
  @ViewChild(SimFormDialogComponent)
  private simFormDialogComponent: SimFormDialogComponent;
  constructor(
    public simListService: SimListService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.simListService.getAllList();
  }
  upDateSim (item: any) {
    this.simListService.requestUpSimItem({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      id: item.id,
      simName: item.simName,
      iccid: item.iccid,
      imsi: item.imsi
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.message.create('success', `This is a message of success`);
        this.simListService.getAllList();       
      }
    })
  }
  deleteSim (id: Number) {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.simListService.requestDeleteSimItem({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          id: id
        }).subscribe(res => {
          if (res.respCode === '00000') {
            this.message.create('success', `This is a message of success`);
            this.simListService.getAllList();
          } else if (res.respCode === '00006') {
            this.message.error('Unable to delete!')
          }
        })
      }})
  }
  addSim (item: any) {
    this.simListService.requestAddItem({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      simName: item.simName,
      iccid: item.iccid,
      imsi: item.imsi
    }).subscribe(res => {
      this.message.create('success', `This is a message of success`);
      this.simListService.getAllList();
    })
  }
  dialogOpen (item: SimItem, typePrams: Number): void {
    this.simFormDialogComponent.showModal(item, typePrams);
  }

}
