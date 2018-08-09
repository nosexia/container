import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DeviceItem } from '../../model/device-item/device-item'
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';
import { RulesetListService } from '../../providers/ruleset-list/ruleset-list.service';
import { SimListService } from '../../providers/sim-list/sim-list.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-device-form-dialog',
  templateUrl: './device-form-dialog.component.html',
  styleUrls: ['./device-form-dialog.component.less']
})
export class DeviceFormDialogComponent implements OnInit {
  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  @Output() upDateDevice: EventEmitter<DeviceItem> = new EventEmitter();
  @Output() addDevice: EventEmitter<DeviceItem> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private enterpriseListService: EnterpriseListService,
    private rulesetListService: RulesetListService,
    private simListService: SimListService
  ) {
    if (this.enterpriseListService.enterpriseData.length === 0) {
      this.enterpriseListService.getAllEnterprise()
    }
    if (this.rulesetListService.setDeviceRuleData.length === 0) {
      this.rulesetListService.getDeviceRuleList();
    }

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      deviceId: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(19) ] ],
      deviceName: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ] ],
      enterpriseId: [ '', [ Validators.required ] ],
      imei: [null],
      networkModuleSn: [null],
      iccid: [null, [ Validators.required ] ],
      imsi: [ null ],
      status: [{value: '', disabled: true}],
      updateDate: [{value: '', disabled: true}],
      rulesetId: [ '', [ Validators.required ] ]
    });
  }
  // 0是add，1是更新信息
  showModal(deviceItem: DeviceItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;
    this.simListService.selectList();
    if (!deviceItem) {
      this.validateForm.reset(); 
    } else {
      this.validateForm.patchValue({
        deviceId: deviceItem.deviceId,
        deviceName: deviceItem.deviceName,
        enterpriseId: deviceItem.enterpriseId,
        imei: deviceItem.imei,
        networkModuleSn: deviceItem.networkModuleSn,
        iccid: deviceItem.iccid,
        imsi: deviceItem.imsi,
        status: deviceItem.status,
        updateDate: deviceItem.updateDate,
        rulesetId: deviceItem.rulesetId
      })
    }
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(event: Event): void {
    this.isVisible = false;
    event.preventDefault();
  }
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (!this.validateForm.valid) return
    this.type === 1 ? this.upDateDevice.emit(this.validateForm.value) : this.addDevice.emit(this.validateForm.value);
  }

}
