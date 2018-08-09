import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseQueryComponent } from './enterprise-query.component';

describe('EnterpriseQueryComponent', () => {
  let component: EnterpriseQueryComponent;
  let fixture: ComponentFixture<EnterpriseQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
