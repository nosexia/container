import { TestBed, inject } from '@angular/core/testing';

import { JourneyListService } from './journey-list.service';

describe('JourneyListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JourneyListService]
    });
  });

  it('should be created', inject([JourneyListService], (service: JourneyListService) => {
    expect(service).toBeTruthy();
  }));
});
