import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RuleItem } from '../../model/rule-item/rule-item';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-rule-form-dialog',
  templateUrl: './rule-form-dialog.component.html',
  styleUrls: ['./rule-form-dialog.component.less']
})
export class RuleFormDialogComponent implements OnInit {

  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  @Output() upDateRule: EventEmitter<RuleItem> = new EventEmitter();
  @Output() addRule: EventEmitter<RuleItem> = new EventEmitter();
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      // containerName: ['', [ Validators.minLength(3), Validators.maxLength(15) ] ],
      // enterpriseId: [ '', [ Validators.required] ],
      // containerId: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ] ],
      // deviceId: [{value: '', disabled: true}],
      // state: [{value: '', disabled: true}]
    });
  }
  // 0是add，1是更新信息
  showModal(ruleItem: RuleItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;
    if (!ruleItem) {
      this.validateForm.reset(); 
    } else {
      // this.validateForm.patchValue({
      //   containerName: containerItem.containerName,
      //   enterpriseId: containerItem.enterpriseId,
      //   containerId: containerItem.containerId,
      //   deviceId: containerItem.deviceId,
      //   state: containerItem.state
      // })
      // this.validateForm.get('containerId').disable();
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
    // if (this.type === 1) {
    //   this.validateForm.get('containerId').enable();
    //   this.upDateContainer.emit(this.validateForm.value);
    // } else {
    //   this.addContainer.emit(this.validateForm.value);
    // }
  }

}
