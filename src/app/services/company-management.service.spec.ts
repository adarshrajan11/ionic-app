import { TestBed } from '@angular/core/testing';

import { CompanyManagementService } from './company-management.service';

describe('CompanyManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyManagementService = TestBed.get(CompanyManagementService);
    expect(service).toBeTruthy();
  });
});
