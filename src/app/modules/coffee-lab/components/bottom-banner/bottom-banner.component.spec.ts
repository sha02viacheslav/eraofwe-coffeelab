import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBannerComponent } from './bottom-banner.component';

describe('BottomBannerComponent', () => {
  let component: BottomBannerComponent;
  let fixture: ComponentFixture<BottomBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
