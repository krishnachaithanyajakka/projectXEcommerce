import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayFirstComponent } from './product-display-first.component';

describe('ProductDisplayFirstComponent', () => {
  let component: ProductDisplayFirstComponent;
  let fixture: ComponentFixture<ProductDisplayFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDisplayFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
