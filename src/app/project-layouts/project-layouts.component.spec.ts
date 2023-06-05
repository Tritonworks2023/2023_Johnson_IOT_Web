import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLayoutsComponent } from './project-layouts.component';

describe('ProjectLayoutsComponent', () => {
  let component: ProjectLayoutsComponent;
  let fixture: ComponentFixture<ProjectLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
