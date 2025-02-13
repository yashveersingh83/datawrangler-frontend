import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationrequestComponent } from './informationrequest.component';

describe('InformationrequestComponent', () => {
  let component: InformationrequestComponent;
  let fixture: ComponentFixture<InformationrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationrequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
