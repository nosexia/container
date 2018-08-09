import { TestBed, inject } from '@angular/core/testing';

import { AccelerationService } from './acceleration.service';

describe('AccelerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccelerationService]
    });
  });

  it('should be created', inject([AccelerationService], (service: AccelerationService) => {
    expect(service).toBeTruthy();
  }));
});
