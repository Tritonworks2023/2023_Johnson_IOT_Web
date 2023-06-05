import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbatComponent } from './abat.component';

describe('AbatComponent', () => {
  let component: AbatComponent;
  let fixture: ComponentFixture<AbatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
