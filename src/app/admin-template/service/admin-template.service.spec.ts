import { TestBed, inject } from '@angular/core/testing';

import { AdminTemplateService } from './admin-template.service';

describe('AdminTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminTemplateService]
    });
  });

  it('should be created', inject([AdminTemplateService], (service: AdminTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
