import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInfoWindowComponent } from './container-info-window.component';

describe('ContainerInfoWindowComponent', () => {
  let component: ContainerInfoWindowComponent;
  let fixture: ComponentFixture<ContainerInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
