import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleFormDialogComponent } from './rule-form-dialog.component';

describe('RuleFormDialogComponent', () => {
  let component: RuleFormDialogComponent;
  let fixture: ComponentFixture<RuleFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
