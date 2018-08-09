import { TestBed, inject } from '@angular/core/testing';

import { UpdateJourneyService } from './update-journey.service';

describe('UpdateJourneyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateJourneyService]
    });
  });

  it('should be created', inject([UpdateJourneyService], (service: UpdateJourneyService) => {
    expect(service).toBeTruthy();
  }));
});
