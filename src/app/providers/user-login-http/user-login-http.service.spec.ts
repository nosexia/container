import { TestBed, inject } from '@angular/core/testing';

import { UserLoginHttpService } from './user-login-http.service';

describe('UserLoginHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoginHttpService]
    });
  });

  it('should be created', inject([UserLoginHttpService], (service: UserLoginHttpService) => {
    expect(service).toBeTruthy();
  }));
});
