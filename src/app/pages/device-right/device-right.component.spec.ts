import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRightComponent } from './device-right.component';

describe('DeviceRightComponent', () => {
  let component: DeviceRightComponent;
  let fixture: ComponentFixture<DeviceRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
