import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SimItem } from '../../model/sim-item/sim-item'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-sim-form-dialog',
  templateUrl: './sim-form-dialog.component.html',
  styleUrls: ['./sim-form-dialog.component.less']
})
export class SimFormDialogComponent implements OnInit {
  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  private validateForm: FormGroup;
  private type: Number;
  @Output() upDateSim: EventEmitter<SimItem> = new EventEmitter();
  @Output() addSim: EventEmitter<SimItem> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      simName: [ null, [ Validators.required ] ],
      iccid: [ null, [ Validators.required ] ],
      imsi: [ null, [ Validators.required ] ],
      id: [ null ]
    });
  }
  // 0是add，1是更新信息
  showModal(simItem: SimItem, typePrams: Number): void {
    this.type = typePrams;
    this.isVisible = true;
    if (!simItem) {
      this.validateForm.reset(); 
    } else {
      this.validateForm.patchValue({
        simName: simItem.simName,
        iccid: simItem.iccid,
        imsi: simItem.imsi,
        id: simItem.id
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
    console.log(this.validateForm.value);
    this.type === 1 ? this.upDateSim.emit(this.validateForm.value) : this.addSim.emit(this.validateForm.value);
    this.isVisible = false;
  }


}
