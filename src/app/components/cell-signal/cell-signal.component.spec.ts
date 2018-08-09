import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellSignalComponent } from './cell-signal.component';

describe('CellSignalComponent', () => {
  let component: CellSignalComponent;
  let fixture: ComponentFixture<CellSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
