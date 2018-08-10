import { TestBed, inject } from '@angular/core/testing';

import { ContainerSocketService } from './container-socket.service';

describe('ContainerSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerSocketService]
    });
  });

  it('should be created', inject([ContainerSocketService], (service: ContainerSocketService) => {
    expect(service).toBeTruthy();
  }));
});
