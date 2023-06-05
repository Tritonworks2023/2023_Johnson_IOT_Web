import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftStatusComponent } from './lift-status.component';

describe('LiftStatusComponent', () => {
  let component: LiftStatusComponent;
  let fixture: ComponentFixture<LiftStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiftStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
