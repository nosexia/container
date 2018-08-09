import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerListMapComponent } from './container-list-map.component';

describe('ContainerListMapComponent', () => {
  let component: ContainerListMapComponent;
  let fixture: ComponentFixture<ContainerListMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
