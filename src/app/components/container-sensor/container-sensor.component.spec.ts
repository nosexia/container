import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSensorComponent } from './container-sensor.component';

describe('ContainerSensorComponent', () => {
  let component: ContainerSensorComponent;
  let fixture: ComponentFixture<ContainerSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
