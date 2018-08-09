import { TestBed, inject } from '@angular/core/testing';

import { HumidityService } from './humidity.service';

describe('HumidityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HumidityService]
    });
  });

  it('should be created', inject([HumidityService], (service: HumidityService) => {
    expect(service).toBeTruthy();
  }));
});
