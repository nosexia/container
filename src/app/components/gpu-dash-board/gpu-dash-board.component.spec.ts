import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuDashBoardComponent } from './gpu-dash-board.component';

describe('GpuDashBoardComponent', () => {
  let component: GpuDashBoardComponent;
  let fixture: ComponentFixture<GpuDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpuDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpuDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
