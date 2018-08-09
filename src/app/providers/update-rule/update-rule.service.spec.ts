import { TestBed, inject } from '@angular/core/testing';

import { UpdateRuleService } from './update-rule.service';

describe('UpdateRuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateRuleService]
    });
  });

  it('should be created', inject([UpdateRuleService], (service: UpdateRuleService) => {
    expect(service).toBeTruthy();
  }));
});
