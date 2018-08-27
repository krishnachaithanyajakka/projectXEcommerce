import { TestBed, inject } from '@angular/core/testing';

import { MiddleBannerService } from './middle-banner.service';

describe('MiddleBannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiddleBannerService]
    });
  });

  it('should be created', inject([MiddleBannerService], (service: MiddleBannerService) => {
    expect(service).toBeTruthy();
  }));
});
