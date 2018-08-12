import { TestBed, inject } from '@angular/core/testing';

import { ContainerAllSocketService } from './container-all-socket.service';

describe('ContainerAllSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerAllSocketService]
    });
  });

  it('should be created', inject([ContainerAllSocketService], (service: ContainerAllSocketService) => {
    expect(service).toBeTruthy();
  }));
});
