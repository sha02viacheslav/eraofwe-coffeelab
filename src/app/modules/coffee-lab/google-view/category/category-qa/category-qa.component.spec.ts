import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQAComponent } from './category-qa.component';

describe('CategoryQAComponent', () => {
  let component: CategoryQAComponent;
  let fixture: ComponentFixture<CategoryQAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryQAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
