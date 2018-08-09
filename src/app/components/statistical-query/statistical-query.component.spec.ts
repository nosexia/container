import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalQueryComponent } from './statistical-query.component';

describe('StatisticalQueryComponent', () => {
  let component: StatisticalQueryComponent;
  let fixture: ComponentFixture<StatisticalQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
