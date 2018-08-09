import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContainerItem } from '../../model/container-item/container-item';
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';
import { RulesetListService } from '../../providers/ruleset-list/ruleset-list.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-container-form-dialog',
  templateUrl: './container-form-dialog.component.html',
  styleUrls: ['./container-form-dialog.component.less']
})
export class ContainerFormDialogComponent implements OnInit {

  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  @Output() upDateContainer: EventEmitter<ContainerItem> = new EventEmitter();
  @Output() addContainer: EventEmitter<ContainerItem> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private enterpriseListService: EnterpriseListService,
    private rulesetListService: RulesetListService
  ) {
    if (this.enterpriseListService.enterpriseData.length === 0) {
      this.enterpriseListService.getAllEnterprise()
    }
    if (this.rulesetListService.setContainerRuleData.length === 0) {
      this.rulesetListService.getContainerRuleList();
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      containerName: ['', [ Validators.required ] ],
      enterpriseId: [ '', [ Validators.required ] ],
      containerId: [ null, [ Validators.required] ],
      deviceId: [{value: '', disabled: true}],
      state: [{value: '', disabled: true}],
      rulesetId: [ '', [ Validators.required ] ]
    });
  }
  // 0是add，1是更新信息
  showModal(containerItem: ContainerItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;

    if (!containerItem) {
      this.validateForm.reset(); 
    } else {
      this.validateForm.patchValue({
        containerName: containerItem.containerName,
        enterpriseId: containerItem.enterpriseId,
        containerId: containerItem.containerId,
        deviceId: containerItem.deviceId,
        state: containerItem.state,
        rulesetId: containerItem.rulesetId
      })
      this.validateForm.get('containerId').disable();
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
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (!this.validateForm.valid) return
    if (this.type === 1) {
      this.validateForm.get('containerId').enable();
      this.upDateContainer.emit(this.validateForm.value);
    } else {
      this.addContainer.emit(this.validateForm.value);
    }
  }

}
