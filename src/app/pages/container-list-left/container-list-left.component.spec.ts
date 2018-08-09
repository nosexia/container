import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerListLeftComponent } from './container-list-left.component';

describe('ContainerListLeftComponent', () => {
  let component: ContainerListLeftComponent;
  let fixture: ComponentFixture<ContainerListLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerListLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerListLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
