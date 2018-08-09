import { TestBed, inject } from '@angular/core/testing';

import { CpuStatusService } from './cpu-status.service';

describe('CpuStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpuStatusService]
    });
  });

  it('should be created', inject([CpuStatusService], (service: CpuStatusService) => {
    expect(service).toBeTruthy();
  }));
});
