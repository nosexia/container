import { TestBed, inject } from '@angular/core/testing';

import { ContainerListService } from './container-list.service';

describe('ContainerListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerListService]
    });
  });

  it('should be created', inject([ContainerListService], (service: ContainerListService) => {
    expect(service).toBeTruthy();
  }));
});
