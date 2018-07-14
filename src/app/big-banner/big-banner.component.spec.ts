import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBannerComponent } from './big-banner.component';

describe('BigBannerComponent', () => {
  let component: BigBannerComponent;
  let fixture: ComponentFixture<BigBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
