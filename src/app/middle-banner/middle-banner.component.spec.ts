import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleBannerComponent } from './middle-banner.component';

describe('MiddleBannerComponent', () => {
  let component: MiddleBannerComponent;
  let fixture: ComponentFixture<MiddleBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
