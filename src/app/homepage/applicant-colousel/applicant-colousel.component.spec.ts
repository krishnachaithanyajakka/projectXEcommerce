import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantColouselComponent } from './applicant-colousel.component';

describe('ApplicantColouselComponent', () => {
  let component: ApplicantColouselComponent;
  let fixture: ComponentFixture<ApplicantColouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantColouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantColouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
