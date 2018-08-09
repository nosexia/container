import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerListDeviceComponent } from './container-list-device.component';

describe('ContainerListDeviceComponent', () => {
  let component: ContainerListDeviceComponent;
  let fixture: ComponentFixture<ContainerListDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerListDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerListDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
