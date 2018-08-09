import { TestBed, inject } from '@angular/core/testing';

import { UpdateUserService } from './update-user.service';

describe('UpdateDeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateUserService]
    });
  });

  it('should be created', inject([UpdateUserService], (service: UpdateUserService) => {
    expect(service).toBeTruthy();
  }));
});
