import { TestBed, inject } from '@angular/core/testing';

import { HompageService } from './hompage.service';

describe('HompageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HompageService]
    });
  });

  it('should be created', inject([HompageService], (service: HompageService) => {
    expect(service).toBeTruthy();
  }));
});
