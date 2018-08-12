import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';
import { ContainerListService } from '../../providers/container-list/container-list.service';
@Component({
  selector: 'app-statistical-query',
  templateUrl: './statistical-query.component.html',
  styleUrls: ['./statistical-query.component.less']
})
export class StatisticalQueryComponent implements OnInit {

  validateForm: FormGroup;
  oneSelect: Boolean = true;
  type: number = 0;
  @Output() queryInput: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private enterpriseListService: EnterpriseListService,
    public containerListService: ContainerListService
  ) {
    if (this.enterpriseListService.enterpriseData.length === 0) {
      this.enterpriseListService.getAllEnterprise()
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      enterpriseId: [ null ],
      containerId: [ null ]
    });
  }

  hideOneSelect () {
    this.oneSelect = false;
  }
  checkEnterprise (id: number): void {
    // 联动清楚
    if (null === id) {
      this.validateForm.reset();
      return;
    }
    this.containerListService.queryContainer(id);
  }
  checkContainer (id: string): void {
    console.log(id)
  }
  submitForm(): void {
    this.type = 0;
    this.queryInput.emit(this.validateForm.value);
  }
  queryTable (): void {
    // if (!this.validateForm.valid) return
    this.queryInput.emit(this.validateForm.value);
  }

}
