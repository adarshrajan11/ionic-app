import { TestBed } from '@angular/core/testing';

import { CheckRequestService } from './check-request.service';

describe('CheckRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckRequestService = TestBed.get(CheckRequestService);
    expect(service).toBeTruthy();
  });
});
