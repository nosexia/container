import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListOnlyLeftComponent } from './device-list-only-left.component';

describe('DeviceListOnlyLeftComponent', () => {
  let component: DeviceListOnlyLeftComponent;
  let fixture: ComponentFixture<DeviceListOnlyLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListOnlyLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListOnlyLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
