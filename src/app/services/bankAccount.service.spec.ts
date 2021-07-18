import { TestBed } from '@angular/core/testing';

import { BankAccountService } from './bankaccount.service';

describe('BankaccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankAccountService = TestBed.get(BankAccountService);
    expect(service).toBeTruthy();
  });
});
