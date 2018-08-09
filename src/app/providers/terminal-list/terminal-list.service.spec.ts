import { TestBed, inject } from '@angular/core/testing';

import { TerminalListService } from './terminal-list.service';

describe('TerminalListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalListService]
    });
  });

  it('should be created', inject([TerminalListService], (service: TerminalListService) => {
    expect(service).toBeTruthy();
  }));
});
