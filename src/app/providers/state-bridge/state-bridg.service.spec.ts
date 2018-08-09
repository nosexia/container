import { TestBed, inject } from '@angular/core/testing';

import { StateBridgService } from './state-bridg.service';

describe('StateBridgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateBridgService]
    });
  });

  it('should be created', inject([StateBridgService], (service: StateBridgService) => {
    expect(service).toBeTruthy();
  }));
});
