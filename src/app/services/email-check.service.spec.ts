import { TestBed } from '@angular/core/testing';

import { EmailCheckService } from './email-check.service';

describe('EmailCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailCheckService = TestBed.get(EmailCheckService);
    expect(service).toBeTruthy();
  });
});
