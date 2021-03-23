import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaViewComponent } from './qa-view.component';

describe('QaViewComponent', () => {
  let component: QaViewComponent;
  let fixture: ComponentFixture<QaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
