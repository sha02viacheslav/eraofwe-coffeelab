import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EraOfWeComponent } from './era-of-we.component';

describe('EraOfWeComponent', () => {
  let component: EraOfWeComponent;
  let fixture: ComponentFixture<EraOfWeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EraOfWeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EraOfWeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
