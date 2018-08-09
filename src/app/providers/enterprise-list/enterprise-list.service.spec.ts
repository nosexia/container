import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseListService } from './enterprise-list.service';

describe('EnterpriseListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseListService]
    });
  });

  it('should be created', inject([EnterpriseListService], (service: EnterpriseListService) => {
    expect(service).toBeTruthy();
  }));
});
