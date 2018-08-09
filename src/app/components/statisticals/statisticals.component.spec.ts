import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalsComponent } from './statisticals.component';

describe('StatisticalsComponent', () => {
  let component: StatisticalsComponent;
  let fixture: ComponentFixture<StatisticalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
