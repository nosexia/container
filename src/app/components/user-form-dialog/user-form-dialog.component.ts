import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserItem } from '../../model/user-item/user-item';
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.less']
})
export class UserFormDialogComponent implements OnInit {
  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  @Output() upDateUser: EventEmitter<UserItem> = new EventEmitter();
  @Output() addUser: EventEmitter<UserItem> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private enterpriseListService: EnterpriseListService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      enterpriseId: [ { value: '', disabled: true } , [ Validators.required ] ],
      username: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(15) ] ],
      password: [ '' , [ Validators.required, Validators.minLength(3), Validators.maxLength(15) ] ],
      firstName: [null],
      lastName: [null],
      email: [null, [ Validators.email ] ],
      contactPhone: [null],
      group: [null],
      userId: ['']
    });
  }
  // 0是add，1是更新信息
  showModal(userItem: UserItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;
    if (!userItem) {
      this.validateForm.reset();
      this.validateForm.get('enterpriseId').enable()
    } else {
      this.validateForm.get('enterpriseId').disable();
      this.validateForm.patchValue({
        enterpriseId: userItem.enterpriseId,
        username: userItem.username,
        password: '',
        firstName: userItem.firstName,
        lastName: userItem.lastName,
        email: userItem.email,
        contactPhone: userItem.contactPhone,
        group: userItem.group,
        userId: userItem.userId
      })
    }
  }
  transform(id: any, args?: any): String {
    if (id === 0) return 'Super Enterprise';
    if (this.enterpriseListService.enterpriseData.length === 0) return 'Super Enterprise';
    const newId = this.enterpriseListService.enterpriseData.filter((item) => {
      return item.enterpriseId === id
    })
    if (newId.length === 0) return 'Super Enterprise'
    return newId[0].enterpriseName
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
    this.validateForm.get('enterpriseId').enable()
    this.type === 1 ? this.upDateUser.emit(this.validateForm.value) : this.addUser.emit(this.validateForm.value);
  }

}
