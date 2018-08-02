import { TestBed, inject } from '@angular/core/testing';

import { ProductRequirementService } from './product-requirement.service';

describe('ProductRequirementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductRequirementService]
    });
  });

  it('should be created', inject([ProductRequirementService], (service: ProductRequirementService) => {
    expect(service).toBeTruthy();
  }));
});
