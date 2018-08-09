import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetFormDialogComponent } from './ruleset-form-dialog.component';

describe('RulesetFormDialogComponent', () => {
  let component: RulesetFormDialogComponent;
  let fixture: ComponentFixture<RulesetFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesetFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
