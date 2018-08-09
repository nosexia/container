import { TestBed, inject } from '@angular/core/testing';

import { MemoryStatusService } from './memory-status.service';

describe('MemoryStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryStatusService]
    });
  });

  it('should be created', inject([MemoryStatusService], (service: MemoryStatusService) => {
    expect(service).toBeTruthy();
  }));
});
