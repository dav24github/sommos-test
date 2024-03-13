import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFoodComponent } from './available-food.component';

describe('AvailableFoodComponent', () => {
  let component: AvailableFoodComponent;
  let fixture: ComponentFixture<AvailableFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableFoodComponent]
    });
    fixture = TestBed.createComponent(AvailableFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
