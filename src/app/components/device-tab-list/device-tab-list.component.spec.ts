import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTabListComponent } from './device-tab-list.component';

describe('DeviceTabListComponent', () => {
  let component: DeviceTabListComponent;
  let fixture: ComponentFixture<DeviceTabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
