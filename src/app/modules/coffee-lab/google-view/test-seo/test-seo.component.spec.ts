import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSeoComponent } from './test-seo.component';

describe('TestSeoComponent', () => {
  let component: TestSeoComponent;
  let fixture: ComponentFixture<TestSeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
