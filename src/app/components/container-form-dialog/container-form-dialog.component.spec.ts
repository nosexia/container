import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormDialogComponent } from './container-form-dialog.component';

describe('ContainerFormDialogComponent', () => {
  let component: ContainerFormDialogComponent;
  let fixture: ComponentFixture<ContainerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
