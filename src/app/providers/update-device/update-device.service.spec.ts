import { TestBed, inject } from '@angular/core/testing';

import { UpdateDeviceService } from './update-device.service';

describe('UpdateDeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateDeviceService]
    });
  });

  it('should be created', inject([UpdateDeviceService], (service: UpdateDeviceService) => {
    expect(service).toBeTruthy();
  }));
});
