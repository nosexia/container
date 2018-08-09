import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFormDialogComponent } from './device-form-dialog.component';

describe('DeviceFormDialogComponent', () => {
  let component: DeviceFormDialogComponent;
  let fixture: ComponentFixture<DeviceFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
