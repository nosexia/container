import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAddPolylinesComponent } from './map-add-polylines.component';

describe('MapAddPolylinesComponent', () => {
  let component: MapAddPolylinesComponent;
  let fixture: ComponentFixture<MapAddPolylinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAddPolylinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAddPolylinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
