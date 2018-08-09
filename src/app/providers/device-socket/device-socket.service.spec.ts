import { TestBed, inject } from '@angular/core/testing';

import { DeviceSocketService } from './device-socket.service';

describe('DeviceSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceSocketService]
    });
  });

  it('should be created', inject([DeviceSocketService], (service: DeviceSocketService) => {
    expect(service).toBeTruthy();
  }));
});
