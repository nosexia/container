import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { DeviceListService } from '../../providers/device-list/device-list.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { DeviceItem } from '../../model/device-item/device-item';
import { DeviceFormDialogComponent } from '../../components/device-form-dialog/device-form-dialog.component';
import { UpdateDeviceService } from '../../providers/update-device/update-device.service';
import { QueryType } from '../../model/query-type/query-type';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { SimListService } from '../../providers/sim-list/sim-list.service'
import { DiagnosticsDialogComponent } from '../../components/diagnostics-dialog/diagnostics-dialog.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EnterpriseQueryComponent } from '../../components/enterprise-query/enterprise-query.component';
import { HomeTypeService } from '../../providers/home-type/home-type.service'
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.less']
})
export class DeviceComponent implements OnInit {
  @ViewChild(DeviceFormDialogComponent)
  private deviceFormDialogComponent: DeviceFormDialogComponent;
  @ViewChild(DiagnosticsDialogComponent)
  private diagnosticsDialogComponent: DiagnosticsDialogComponent;
  @ViewChild(EnterpriseQueryComponent)
  private enterpriseQueryComponent: EnterpriseQueryComponent;
  public queryType: QueryType[] = [
    {
      label: 'DeviceID',
      value: '0'
    },
    {
      label: 'Module-IMEI',
      value: '1'
    },
    {
      label: 'Module-SN',
      value: '2'
    },
    {
      label: 'SIM-ICCID',
      value: '3'
    },
    {
      label: 'SIM-IMEI',
      value: '4'
    }
  ]
  isShow: boolean = true;
  constructor (
    public deviceListService: DeviceListService,
    private storageService: StorageService,
    private updateDeviceService: UpdateDeviceService,
    public allMapService: AllMapService,
    private router: Router,
    private simListService: SimListService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private homeTypeService: HomeTypeService
  ) {
  }
  ngOnInit() {
    this.getAllDevice();
    window.setInterval(() => {
      this.getAllDevice();
    }, 20000)
  }
  diagnostics (data: any) {
    this.deviceListService.searchDignostics(data.deviceId).subscribe(res => {
      if ('00005' === res.respCode) {
        this.message.create('error', `device lost`);
        return;
      }
      if (res.device.diagnosisInfo) {
        this.diagnosticsDialogComponent.showModals(data, res.device.diagnosisInfo);        
      } else {
        this.diagnosticsDialogComponent.showModals(data, null);  
      }
    })
  }
  showContaner (item: any) {
    this.allMapService.setShow(true)
  } 
  showDevice (item: any) {
    this.homeTypeService.showAllCD = true
    this.homeTypeService.showRight = false
    this.router.navigate([''])
  }
  activeView (isShow: boolean) {
    this.isShow = isShow;
  }
  queryInput (value: any) {
    if (!value.query) {
      this.getAllDevice()
    } else {
      if (value.checks === '0') {
        this.queryDevice({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          deviceId: value.query
        })
      } else if (value.checks === '1') {
        this.queryDevice({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          imei: value.query
        })
      } if (value.checks === '2') {
        this.queryDevice({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          networkModuleSn: value.query
        })
      } if (value.checks === '3') {
        this.queryDevice({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          iccid: value.query
        })
      }  if (value.checks === '4') {
        this.queryDevice({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: value.enterpriseId,
          imsi: value.query
        })
      }
    }
  }
  queryDevice (params: any) {
    this.deviceListService.getDeviceList(params).subscribe(res => {
      const newData = res.devices.map(item => {
        return {
          updateDate: item.updateDate,
          enterpriseId: item.enterpriseId,
          deviceId: item.deviceId,
          imei: item.imei,
          imsi: item.imsi,
          networkModuleSn: item.networkModuleSn,
          iccid: item.iccid,
          status: item.state,
          deviceName: item.deviceName,
          latitude: item.latitude,
          longitude: item.longitude,
          rulesetName: item.rulesetName,
          rulesetId: item.rulesetId,
          diagnosisInfo: item.diagnosisInfo,
          isOpen: false,
          checked: false,
          disabled: false
        }
      })  
      this.deviceListService.setDeviceData(newData)
    });
  }
  getAllDevice () {
    this.deviceListService.getDeviceList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
    }).subscribe(res => {
      const newData = res.devices.map(item => {
        return {
          updateDate: item.updateDate,
          enterpriseId: item.enterpriseId,
          deviceId: item.deviceId,
          imei: item.imei,
          imsi: item.imsi,
          networkModuleSn: item.networkModuleSn,
          iccid: item.iccid,
          status: item.state,
          simName: item.simName,
          deviceName: item.deviceName,
          rulesetName: item.rulesetName,
          rulesetId: item.rulesetId,
          latitude: item.latitude,
          longitude: item.longitude,
          diagnosisInfo: item.diagnosisInfo,
          isOpen: false,
          checked: false,
          disabled: false
        }
      })
      this.deviceListService.setDeviceData(newData)
    });
  }
  deviceOne (value: any) {
    this.deviceListService.deviceOne({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      deviceId: value.query
    }).subscribe(res => {
      if (res.respCode === '00000') {
        if (res.device === null) {
          this.deviceListService.setDeviceData([])
        } else {
          const item = res.device;
          let newData: DeviceItem[] = []
          newData.push({
            updateDate: item.updateDate,
            enterpriseId: item.enterpriseId,
            deviceId: item.deviceId,
            imei: item.imei,
            imsi: item.imsi,
            networkModuleSn: item.networkModuleSn,
            iccid: item.iccid,
            status: item.state,
            simName: item.simName,
            deviceName: item.deviceName,
            rulesetName: item.rulesetName,
            rulesetId: item.rulesetId,
            latitude: item.latitude,
            longitude: item.longitude,
            diagnosisInfo: item.diagnosisInfo,
            isOpen: false,
            checked: false,
            disabled: false
          });
          this.deviceListService.setDeviceData(newData);
        }
      }
    });
  }
  dialogOpen (item: DeviceItem, typePrams: Number): void {
    this.deviceFormDialogComponent.showModal(item, typePrams);
  }
  upDateDevice (item: DeviceItem): void {
    console.log(item);
    this.simListService.selectData.forEach(ix => {
      if (item.iccid === ix.iccid) {
          this.updateDeviceService.upDateDevice({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: item.enterpriseId,
            deviceId: item.deviceId,
            deviceName: item.deviceName,
            iccid: item.iccid,
            imsi: ix.imsi,
            rulesetId: item.rulesetId,
          }).subscribe(res => {
            if (res.respCode === '00000') {
              this.deviceListService.updateDevice(res.device);
              this.message.create('success', `This is a message of success`);
              this.enterpriseQueryComponent.submitForm();
              this.deviceFormDialogComponent.isVisible = false;
            }
          });
      }
    })
  }
  addDevice (item: DeviceItem): void {
    this.simListService.selectData.forEach(ix => {
      if (item.iccid === ix.iccid) {
        this.updateDeviceService.addDevice({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          enterpriseId: item.enterpriseId,
          deviceName: item.deviceName,
          deviceId: item.deviceId,
          rulesetId: item.rulesetId,
          iccid: item.iccid,
          imsi: ix.imsi
        })
        .subscribe(res => {
          if (res.respCode === '00000') {
            this.deviceListService.addDevice({
              enterpriseId: item.enterpriseId,
              deviceName: item.deviceName,
              deviceId: item.deviceId,
              imei: null,
              networkModuleSn: null,
              iccid: item.iccid,
              imsi: null,
              status: 0,
              updateDate: null,
              isOpen: false,
              checked: false,
              rulesetName: item.rulesetName,
              rulesetId: item.rulesetId,
              latitude: item.latitude,
              simName: item.simName,
              longitude: item.longitude,
              diagnosisInfo: item.diagnosisInfo,
              disabled: false
            })
          }
          this.message.create('success', `This is a message of success`);
          this.enterpriseQueryComponent.submitForm();
          this.deviceFormDialogComponent.isVisible = false;          
        });
      }
    })
  }
  deleteDevice (deviceId: Number): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.updateDeviceService.deleteDevice({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          deviceId: deviceId
        })
        .subscribe(res => {
          if (res.respCode === '00000') {
            this.deviceListService.deleteDevice();
            this.message.create('success', `This is a message of success`);          
            this.enterpriseQueryComponent.submitForm();
          }
        });
      }
    })
  }

  delBand (deviceId: Number): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.updateDeviceService.delBand({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          deviceId: deviceId
        })
        .subscribe(res => {
          if (res.respCode === '00000') {
            this.message.create('success', `This is a message of success`); 
            this.enterpriseQueryComponent.submitForm();
          }
        });
      }})
  }
}