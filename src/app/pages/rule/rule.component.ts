import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RuleListService } from '../../providers/rule-list/rule-list.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { RuleItem } from '../../model/rule-item/rule-item'
import { UpdateRuleService } from '../../providers/update-rule/update-rule.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.less']
})
export class RuleComponent implements OnInit {
  isVisible: Boolean = false;
  ruleData: any[] = [];
  groupId: number;
  disabled: boolean = false
  constructor (
    public ruleListService: RuleListService,
    private storageService: StorageService,
    private updateRuleService: UpdateRuleService,
    private message: NzMessageService
  ) {
    
  }

  ngOnInit() {
    // this.getRuleList();
  }
  handleCancel () {
    this.isVisible = false
  }
  showView (data: any[], groupId: number, disabled: boolean) {
    this.isVisible = true
    this.ruleData = data
    this.groupId = groupId
    this.disabled = disabled
  }
  getRuleList (): void {
    this.ruleListService.getRuleList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId
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
      this.ruleListService.setRuleData(newData)
    });
  }
  upDateRule (item: RuleItem): void {
    this.updateRuleService.upDateRule({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      groupId: this.groupId,
      confId: item.confId,
      ruleValue: Number(item.ruleValue)
    }).subscribe(res => {
      if (res.respCode === '00000') {
        this.message.success('The rule value was modified successfully.');
      }
    });
  }
  changValue (item: RuleItem): void {
    this.upDateRule(item)
  }
}
