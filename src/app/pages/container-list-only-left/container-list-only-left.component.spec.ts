import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerListOnlyLeftComponent } from './container-list-only-left.component';

describe('ContainerListOnlyLeftComponent', () => {
  let component: ContainerListOnlyLeftComponent;
  let fixture: ComponentFixture<ContainerListOnlyLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerListOnlyLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerListOnlyLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
