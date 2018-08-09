import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInfoWindowComponent } from './device-info-window.component';

describe('DeviceInfoWindowComponent', () => {
  let component: DeviceInfoWindowComponent;
  let fixture: ComponentFixture<DeviceInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
