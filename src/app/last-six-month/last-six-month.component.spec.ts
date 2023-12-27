import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSixMonthComponent } from './last-six-month.component';

describe('LastSixMonthComponent', () => {
  let component: LastSixMonthComponent;
  let fixture: ComponentFixture<LastSixMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastSixMonthComponent]
    });
    fixture = TestBed.createComponent(LastSixMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
