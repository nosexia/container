import { TestBed, inject } from '@angular/core/testing';

import { UserSessionStorageService } from './user-session-storage.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSessionStorageService]
    });
  });

  it('should be created', inject([UserSessionStorageService], (service: UserSessionStorageService) => {
    expect(service).toBeTruthy();
  }));
});

