import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpatComponent } from './epat.component';

describe('EpatComponent', () => {
  let component: EpatComponent;
  let fixture: ComponentFixture<EpatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
