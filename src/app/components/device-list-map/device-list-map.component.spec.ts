import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListMapComponent } from './device-list-map.component';

describe('DeviceListMapComponent', () => {
  let component: DeviceListMapComponent;
  let fixture: ComponentFixture<DeviceListMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
