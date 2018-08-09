import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EnterpriseItem } from '../../model/enterprise-item/enterprise-item';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-enterprise-form-dialog',
  templateUrl: './enterprise-form-dialog.component.html',
  styleUrls: ['./enterprise-form-dialog.component.less']
})
export class EnterpriseFormDialogComponent implements OnInit {

  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  @Output() upDateEnterprise: EventEmitter<EnterpriseItem> = new EventEmitter();
  @Output() addEnterprise: EventEmitter<EnterpriseItem> = new EventEmitter();
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      enterpriseName: [ '', [ Validators.required ] ],
      contactName: [ '', [ Validators.required ] ],
      contactNo: [ '', [ Validators.required ] ],
      email: [null, [ Validators.email ]],
      enterpriseId: [null]
    });
  }
  // 0是add，1是更新信息
  showModal(enterpriseItem: EnterpriseItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;
    if (!enterpriseItem) {
      this.validateForm.reset(); 
    } else {
      this.validateForm.patchValue({
        enterpriseName: enterpriseItem.enterpriseName,
        contactName: enterpriseItem.contactName,
        contactNo: enterpriseItem.contactNo,
        email: enterpriseItem.email,
        enterpriseId: enterpriseItem.enterpriseId
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
    this.type === 1 ? this.upDateEnterprise.emit(this.validateForm.value) : this.addEnterprise.emit(this.validateForm.value);
  }

}
