import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeLabComponent } from './coffee-lab.component';

describe('CoffeeLabComponent', () => {
  let component: CoffeeLabComponent;
  let fixture: ComponentFixture<CoffeeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
