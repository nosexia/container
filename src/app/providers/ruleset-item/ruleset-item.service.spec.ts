import { TestBed, inject } from '@angular/core/testing';

import { RulesetItemService } from './ruleset-item.service';

describe('RulesetItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RulesetItemService]
    });
  });

  it('should be created', inject([RulesetItemService], (service: RulesetItemService) => {
    expect(service).toBeTruthy();
  }));
});
