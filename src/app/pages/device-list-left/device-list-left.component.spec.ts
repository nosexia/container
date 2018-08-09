import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListLeftComponent } from './device-list-left.component';

describe('DeviceListLeftComponent', () => {
  let component: DeviceListLeftComponent;
  let fixture: ComponentFixture<DeviceListLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
