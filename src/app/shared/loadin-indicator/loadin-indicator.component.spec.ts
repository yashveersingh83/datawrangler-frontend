import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadinIndicatorComponent } from './loadin-indicator.component';

describe('LoadinIndicatorComponent', () => {
  let component: LoadinIndicatorComponent;
  let fixture: ComponentFixture<LoadinIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadinIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadinIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
