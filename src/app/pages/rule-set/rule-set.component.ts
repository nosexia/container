import { Component, OnInit, ViewChild } from '@angular/core';
import { RulesetListService } from '../../providers/ruleset-list/ruleset-list.service';
import { RulesetItem } from '../../model/ruleset-item/ruleset-item'
import { RulesetFormDialogComponent } from '../../components/ruleset-form-dialog/ruleset-form-dialog.component';
import { RuleComponent } from '../rule/rule.component';
import { RuleListService } from '../../providers/rule-list/rule-list.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-rule-set',
  templateUrl: './rule-set.component.html',
  styleUrls: ['./rule-set.component.less']
})
export class RuleSetComponent implements OnInit {
  
  @ViewChild(RulesetFormDialogComponent)
  private rulesetFormDialogComponent: RulesetFormDialogComponent;
  @ViewChild(RuleComponent)
  private ruleComponent: RuleComponent;
  constructor(
    private ruleListService: RuleListService,
    public rulesetListService: RulesetListService,
    private storageService: StorageService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { }
  // activeView (isShow: boolean) {
  //   this.isShow = isShow;
  // }
  ngOnInit() {
    this.rulesetListService.getAllRuleList();
    // this.rulesetItemService.queryRulesetList(1)
    // this.ruleListService.getAllRuleList()
  }
  deleteRule () {
    this.rulesetListService.deleteRuleItem()
  }
  upDateRuleSetList (item: RulesetItem) {
    let newItem = item;
    let newRuleGroupRels = item.ruleGroupRels.map(i => {
      return {
        sensorName: i
      }
    })
    newItem.ruleGroupRels = newRuleGroupRels;
    this.rulesetListService.updateRuleGroupList(newItem);
  }
  addRuleSetList (item: RulesetItem) {
    let newItem = item;
    let newRuleGroupRels = item.ruleGroupRels.map(i => {
      return {
        sensorName: i
      }
    })
    newItem.ruleGroupRels = newRuleGroupRels;
    // this.rulesetListService.addRuleGroupList(item);

    this.rulesetListService.addRuleGroup({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseId: 0,
      groupName: item.groupName,
      ruleGroupRels: item.ruleGroupRels,
      groupType: item.groupType
    }).subscribe(res => {
      this.message.create('success', `This is a message of success`);
      this.rulesetListService.getAllRuleList();
    });
  }
  dialogOpen (item, typePrams): void {
    if (typePrams === 1) {
      if (item.groupName === 'Container default' || item.groupName === 'Device default') return
    }
    this.rulesetFormDialogComponent.showModal(item, typePrams);
  }
  activeData (data, disabled) {
    debugger;
    this.ruleListService.getRuleList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      groupId: data.groupId
    }).subscribe(res => {
      const newData = res.ruleConfigs.map((item: any) => {
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
          groupType: item.groupType,
          checked: false,
          disabled: false,
          valueRange: item.valueRange
        }
      })
      this.ruleComponent.showView(newData, data.groupId, disabled)
    })
  }

  deleteRuleGroup (groupId: Number): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete item?</i>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk   : () => {
        this.rulesetListService.deleteRuleGroup({
          token: this.storageService.getStorage.token,
          opUserId: this.storageService.getStorage.userId,
          groupId: groupId
          }).subscribe(res => {
            this.message.create('success', `This is a message of success`);
            this.rulesetListService.getAllRuleList();
          })
      }})
  }
}