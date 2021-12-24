import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArticleComponent } from './category-article.component';

describe('CategoryArticleComponent', () => {
  let component: CategoryArticleComponent;
  let fixture: ComponentFixture<CategoryArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
