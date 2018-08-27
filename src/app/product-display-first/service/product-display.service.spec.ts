import { TestBed, inject } from '@angular/core/testing';

import { ProductDisplayService } from './product-display.service';

describe('ProductDisplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDisplayService]
    });
  });

  it('should be created', inject([ProductDisplayService], (service: ProductDisplayService) => {
    expect(service).toBeTruthy();
  }));
});
