import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseAllSocketService } from './enterprise-all-socket.service';

describe('EnterpriseAllSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseAllSocketService]
    });
  });

  it('should be created', inject([EnterpriseAllSocketService], (service: EnterpriseAllSocketService) => {
    expect(service).toBeTruthy();
  }));
});
