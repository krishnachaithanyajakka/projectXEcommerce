import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigSalesTabsComponent } from './big-sales-tabs.component';

describe('BigSalesTabsComponent', () => {
  let component: BigSalesTabsComponent;
  let fixture: ComponentFixture<BigSalesTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigSalesTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigSalesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
