import { TestBed, inject } from '@angular/core/testing';

import { UpdateEnterpriseService } from './update-enterprise.service';

describe('UpdateEnterpriseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateEnterpriseService]
    });
  });

  it('should be created', inject([UpdateEnterpriseService], (service: UpdateEnterpriseService) => {
    expect(service).toBeTruthy();
  }));
});
