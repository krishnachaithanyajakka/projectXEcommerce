import { TestBed, inject } from '@angular/core/testing';

import { AwssettingsService } from './awssettings.service';

describe('AwssettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwssettingsService]
    });
  });

  it('should be created', inject([AwssettingsService], (service: AwssettingsService) => {
    expect(service).toBeTruthy();
  }));
});
