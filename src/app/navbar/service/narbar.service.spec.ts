import { TestBed, inject } from '@angular/core/testing';

import { NarbarService } from './narbar.service';

describe('NarbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NarbarService]
    });
  });

  it('should be created', inject([NarbarService], (service: NarbarService) => {
    expect(service).toBeTruthy();
  }));
});
