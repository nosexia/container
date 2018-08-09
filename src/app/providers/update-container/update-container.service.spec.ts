import { TestBed, inject } from '@angular/core/testing';

import { UpdateContainerService } from './update-container.service';

describe('UpdateContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateContainerService]
    });
  });

  it('should be created', inject([UpdateContainerService], (service: UpdateContainerService) => {
    expect(service).toBeTruthy();
  }));
});
