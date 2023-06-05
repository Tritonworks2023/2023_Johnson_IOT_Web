import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Down2LiftsComponent } from './down2-lifts.component';

describe('Down2LiftsComponent', () => {
  let component: Down2LiftsComponent;
  let fixture: ComponentFixture<Down2LiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Down2LiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Down2LiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
