import { TestBed, inject } from '@angular/core/testing';

import { UserLocalStorageService } from './user-local-storage.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLocalStorageService]
    });
  });

  it('should be created', inject([UserLocalStorageService], (service: UserLocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
