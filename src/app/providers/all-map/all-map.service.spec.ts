import { TestBed, inject } from '@angular/core/testing';

import { AllMapService } from './all-map.service';

describe('AllMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllMapService]
    });
  });

  it('should be created', inject([AllMapService], (service: AllMapService) => {
    expect(service).toBeTruthy();
  }));
});
