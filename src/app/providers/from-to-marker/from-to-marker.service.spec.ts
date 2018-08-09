import { TestBed, inject } from '@angular/core/testing';

import { FromToMarkerService } from './from-to-marker.service';

describe('FromToMarkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FromToMarkerService]
    });
  });

  it('should be created', inject([FromToMarkerService], (service: FromToMarkerService) => {
    expect(service).toBeTruthy();
  }));
});
