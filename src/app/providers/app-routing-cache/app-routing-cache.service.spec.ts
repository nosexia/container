import { TestBed, inject } from '@angular/core/testing';

import { AppRoutingCacheService } from './app-routing-cache.service';

describe('AppRoutingCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppRoutingCacheService]
    });
  });

  it('should be created', inject([AppRoutingCacheService], (service: AppRoutingCacheService) => {
    expect(service).toBeTruthy();
  }));
});
