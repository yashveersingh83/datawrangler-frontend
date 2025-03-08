import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequestAddComponent } from './info-request-add.component';

describe('InfoRequestAddComponent', () => {
  let component: InfoRequestAddComponent;
  let fixture: ComponentFixture<InfoRequestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoRequestAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
