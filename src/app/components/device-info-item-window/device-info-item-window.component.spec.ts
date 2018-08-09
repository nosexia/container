import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInfoItemWindowComponent } from './device-info-item-window.component';

describe('DeviceInfoItemWindowComponent', () => {
  let component: DeviceInfoItemWindowComponent;
  let fixture: ComponentFixture<DeviceInfoItemWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInfoItemWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInfoItemWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
