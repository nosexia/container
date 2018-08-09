import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceOnlyRightComponent } from './device-only-right.component';

describe('DeviceOnlyRightComponent', () => {
  let component: DeviceOnlyRightComponent;
  let fixture: ComponentFixture<DeviceOnlyRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceOnlyRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceOnlyRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
