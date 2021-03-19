import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleViewComponent } from './google-view.component';

describe('GoogleViewComponent', () => {
  let component: GoogleViewComponent;
  let fixture: ComponentFixture<GoogleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
