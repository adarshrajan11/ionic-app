import { TestBed } from '@angular/core/testing';

import { CheckCategoryService } from './check-category.service';

describe('CheckCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckCategoryService = TestBed.get(CheckCategoryService);
    expect(service).toBeTruthy();
  });
});
