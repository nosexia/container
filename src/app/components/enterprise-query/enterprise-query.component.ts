import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { QueryType } from '../../model/query-type/query-type';
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';
@Component({
  selector: 'app-enterprise-query',
  templateUrl: './enterprise-query.component.html',
  styleUrls: ['./enterprise-query.component.less']
})
export class EnterpriseQueryComponent implements OnInit {
  validateForm: FormGroup;
  oneSelect: Boolean = true;
  // 查询按钮是否在加载中, 默认在加载中
  isLoadingBtn: Boolean = false;
  @Input () queryType: QueryType[];
  @Output() queryInput: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private enterpriseListService: EnterpriseListService
  ) {
    if (this.enterpriseListService.enterpriseData.length === 0) {
      this.enterpriseListService.getAllEnterprise()
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      enterpriseId: [ null ],
      checks: [ null, Validators.required ],
      query: [ null ]
    });
  }

  submitForm(): void {
    // if (!this.validateForm.valid) return
    this.queryInput.emit(this.validateForm.value);
  }
  
  checksChange (value: string): void {
    
  }

  hideOneSelect () {
    this.oneSelect = false;
  }

}
