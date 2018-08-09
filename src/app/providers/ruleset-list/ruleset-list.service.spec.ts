import { TestBed, inject } from '@angular/core/testing';

import { RulesetListService } from './ruleset-list.service';

describe('RulesetListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RulesetListService]
    });
  });

  it('should be created', inject([RulesetListService], (service: RulesetListService) => {
    expect(service).toBeTruthy();
  }));
});
