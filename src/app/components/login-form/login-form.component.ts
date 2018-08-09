import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})

export class LoginFormComponent implements OnInit {
  @Output() onLoginFormValue = new EventEmitter<FormGroup>();
  validateForm: FormGroup;
  isLoading: Boolean = false;
  constructor(private fb: FormBuilder) {
  }

  submitForm (): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (!this.validateForm.valid) return
    this.btnLoadOne();
    this.onLoginFormValue.emit(this.validateForm);
  }
  btnLoadOne (): void {
    this.isLoading = true;
    setTimeout(_ => {
      this.isLoading = false;
    }, 1000);
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      passWord: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }
}
