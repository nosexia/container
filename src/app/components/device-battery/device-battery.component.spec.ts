import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceBatteryComponent } from './device-battery.component';

describe('DeviceBatteryComponent', () => {
  let component: DeviceBatteryComponent;
  let fixture: ComponentFixture<DeviceBatteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceBatteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
