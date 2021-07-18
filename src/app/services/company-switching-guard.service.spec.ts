import { TestBed } from '@angular/core/testing';

import { CompanySwitchingGuardService } from './company-switching-guard.service';

describe('CompanySwitchingGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanySwitchingGuardService = TestBed.get(CompanySwitchingGuardService);
    expect(service).toBeTruthy();
  });
});
