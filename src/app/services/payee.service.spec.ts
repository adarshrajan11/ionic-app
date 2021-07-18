import { TestBed } from '@angular/core/testing';

import { PayeeService } from './payee.service';

describe('PayeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayeeService = TestBed.get(PayeeService);
    expect(service).toBeTruthy();
  });
});
