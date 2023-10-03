import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberFinderComponent } from './number-finder.component';

describe('NumberFinderComponent', () => {
  let component: NumberFinderComponent;
  let fixture: ComponentFixture<NumberFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberFinderComponent]
    });
    fixture = TestBed.createComponent(NumberFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
