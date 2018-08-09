import { TestBed, inject } from '@angular/core/testing';

import { RuleListService } from './rule-list.service';

describe('RuleListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuleListService]
    });
  });

  it('should be created', inject([RuleListService], (service: RuleListService) => {
    expect(service).toBeTruthy();
  }));
});
