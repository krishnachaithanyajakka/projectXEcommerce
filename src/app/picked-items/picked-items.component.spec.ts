import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedItemsComponent } from './picked-items.component';

describe('PickedItemsComponent', () => {
  let component: PickedItemsComponent;
  let fixture: ComponentFixture<PickedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
