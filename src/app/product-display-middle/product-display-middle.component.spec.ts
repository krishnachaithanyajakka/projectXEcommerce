import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayMiddleComponent } from './product-display-middle.component';

describe('ProductDisplayMiddleComponent', () => {
  let component: ProductDisplayMiddleComponent;
  let fixture: ComponentFixture<ProductDisplayMiddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDisplayMiddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
