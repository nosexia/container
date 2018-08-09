import { TestBed, inject } from '@angular/core/testing';

import { DeviceBatteryService } from './device-battery.service';

describe('DeviceBatteryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceBatteryService]
    });
  });

  it('should be created', inject([DeviceBatteryService], (service: DeviceBatteryService) => {
    expect(service).toBeTruthy();
  }));
});
