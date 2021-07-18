import { TestBed } from '@angular/core/testing';

import { MailCheckService } from './mail-check.service';

describe('MailCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailCheckService = TestBed.get(MailCheckService);
    expect(service).toBeTruthy();
  });
});
