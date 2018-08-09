import { TestBed, inject } from '@angular/core/testing';

import { VehicleInformationService } from './vehicle-information.service';

describe('VehicleInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleInformationService]
    });
  });

  it('should be created', inject([VehicleInformationService], (service: VehicleInformationService) => {
    expect(service).toBeTruthy();
  }));
});
