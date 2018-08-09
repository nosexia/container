import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseFormDialogComponent } from './enterprise-form-dialog.component';

describe('EnterpriseFormDialogComponent', () => {
  let component: EnterpriseFormDialogComponent;
  let fixture: ComponentFixture<EnterpriseFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
