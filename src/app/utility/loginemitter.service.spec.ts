import { TestBed, inject } from '@angular/core/testing';

import { LoginemitterService } from './loginemitter.service';

describe('LoginemitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginemitterService]
    });
  });

  it('should be created', inject([LoginemitterService], (service: LoginemitterService) => {
    expect(service).toBeTruthy();
  }));
});
