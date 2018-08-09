import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGoogleMapComponent } from './device-google-map.component';

describe('DeviceGoogleMapComponent', () => {
  let component: DeviceGoogleMapComponent;
  let fixture: ComponentFixture<DeviceGoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceGoogleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
