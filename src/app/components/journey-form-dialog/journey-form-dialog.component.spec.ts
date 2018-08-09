import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyFormDialogComponent } from './journey-form-dialog.component';

describe('JourneyFormDialogComponent', () => {
  let component: JourneyFormDialogComponent;
  let fixture: ComponentFixture<JourneyFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
