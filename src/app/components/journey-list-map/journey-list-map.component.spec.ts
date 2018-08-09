import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyListMapComponent } from './journey-list-map.component';

describe('JourneyListMapComponent', () => {
  let component: JourneyListMapComponent;
  let fixture: ComponentFixture<JourneyListMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
