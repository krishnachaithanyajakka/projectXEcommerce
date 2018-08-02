import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequirementComponent } from './product-requirement.component';

describe('ProductRequirementComponent', () => {
  let component: ProductRequirementComponent;
  let fixture: ComponentFixture<ProductRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
