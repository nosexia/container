import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdTabRightComponent } from './cd-tab-right.component';

describe('CdTabRightComponent', () => {
  let component: CdTabRightComponent;
  let fixture: ComponentFixture<CdTabRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdTabRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdTabRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
