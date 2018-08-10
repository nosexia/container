import { TestBed, inject } from '@angular/core/testing';

import { HomeTypeService } from './home-type.service';

describe('HomeTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeTypeService]
    });
  });

  it('should be created', inject([HomeTypeService], (service: HomeTypeService) => {
    expect(service).toBeTruthy();
  }));
});
