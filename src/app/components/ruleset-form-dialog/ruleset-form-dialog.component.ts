import { Component, OnInit ,Output,EventEmitter, Input} from '@angular/core';
import { RulesetItem } from '../../model/ruleset-item/ruleset-item';
import { RuleListService } from '../../providers/rule-list/rule-list.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';
import { ContainerListService } from '../../providers/container-list/container-list.service';
import { DeviceListService } from '../../providers/device-list/device-list.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-ruleset-form-dialog',
  templateUrl: './ruleset-form-dialog.component.html',
  styleUrls: ['./ruleset-form-dialog.component.less']
})
export class RulesetFormDialogComponent implements OnInit {
   
  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  @Output() upDateRuleSetList: EventEmitter<RulesetItem> = new EventEmitter();
  @Output() addRuleSetList: EventEmitter<RulesetItem> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    public ruleListService: RuleListService,
    private enterpriseListService: EnterpriseListService,
    private storageService: StorageService
  ) { }
  ngOnInit() {
    this.validateForm = this.fb.group({
      groupId: [null],
      groupName: [ null , [Validators.required ] ],
      ruleGroupRels: [ null, [Validators.required] ],
      groupType: [ null, [Validators.required] ]
    });
  }
  getAllRuleList(groupId: Number) {
    // 选择是哪种类型，是container为1， device为2
    if (groupId) {
      groupId = 2;
    } else {
      groupId = 1;
    } 
    this.ruleListService.getAllRuleList(groupId);
  }
  // 0是add，1是更新信息
  showModal(item: RulesetItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;
    this.validateForm.reset();
    if (typePrams === 0) {
      this.enterpriseListService.getAllEnterprise();
      this.validateForm.reset();
    } else if (typePrams === 1) {
      console.log('修改');
      // this.ruleListService.getAllRuleList();
      this.ruleListService.getRuleList({
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId,
        groupId: item.groupId,
        groupType: item.groupType
      }).subscribe(res => {
        let newRuleData = res.ruleConfigs.map(i => {
          return i.sensorName
        })
        let array_unique = newRuleData.filter((element, index, array) => {
          return array.indexOf(element) === index;
        });
        // console.log(res.ruleConfigs)
        // console.log(this.ruleListService.ruleData)
        this.validateForm.patchValue({
          groupId: item.groupId,
          groupName: item.groupName,
          ruleGroupRels: array_unique,
          groupType: item.groupType,
        })
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

  handleCancel(): void {
    this.isVisible = false;
  }
  submitForm(): void {
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[ i ].markAsDirty();
    //   this.validateForm.controls[ i ].updateValueAndValidity();
    // }
    this.isVisible = false;
    if (!this.validateForm.valid) return
    if (this.type === 1) {
      this.upDateRuleSetList.emit(this.validateForm.value);
    } else {
      this.addRuleSetList.emit(this.validateForm.value);
    }
  }
}
