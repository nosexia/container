import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLineDialogComponent } from './add-line-dialog.component';

describe('AddLineDialogComponent', () => {
  let component: AddLineDialogComponent;
  let fixture: ComponentFixture<AddLineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
