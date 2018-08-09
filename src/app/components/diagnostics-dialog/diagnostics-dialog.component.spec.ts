import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsDialogComponent } from './diagnostics-dialog.component';

describe('DiagnosticsDialogComponent', () => {
  let component: DiagnosticsDialogComponent;
  let fixture: ComponentFixture<DiagnosticsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
