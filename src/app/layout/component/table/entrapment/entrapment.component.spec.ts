import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrapmentComponent } from './entrapment.component';

describe('EntrapmentComponent', () => {
  let component: EntrapmentComponent;
  let fixture: ComponentFixture<EntrapmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrapmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrapmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
