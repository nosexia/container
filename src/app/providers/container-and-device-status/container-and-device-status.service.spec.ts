import { TestBed, inject } from '@angular/core/testing';

import { ContainerAndDeviceStatusService } from './container-and-device-status.service';

describe('ContainerAndDeviceStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerAndDeviceStatusService]
    });
  });

  it('should be created', inject([ContainerAndDeviceStatusService], (service: ContainerAndDeviceStatusService) => {
    expect(service).toBeTruthy();
  }));
});
