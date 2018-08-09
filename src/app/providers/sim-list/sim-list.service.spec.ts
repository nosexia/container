import { TestBed, inject } from '@angular/core/testing';

import { SimListService } from './sim-list.service';

describe('SimListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimListService]
    });
  });

  it('should be created', inject([SimListService], (service: SimListService) => {
    expect(service).toBeTruthy();
  }));
});
