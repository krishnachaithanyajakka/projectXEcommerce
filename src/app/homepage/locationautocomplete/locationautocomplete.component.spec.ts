import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationautocompleteComponent } from './locationautocomplete.component';

describe('LocationautocompleteComponent', () => {
  let component: LocationautocompleteComponent;
  let fixture: ComponentFixture<LocationautocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationautocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
