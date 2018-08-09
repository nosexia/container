import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimFormDialogComponent } from './sim-form-dialog.component';

describe('SimFormDialogComponent', () => {
  let component: SimFormDialogComponent;
  let fixture: ComponentFixture<SimFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
