import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonLdComponent } from './json-ld.component';

describe('JsonLdComponent', () => {
  let component: JsonLdComponent;
  let fixture: ComponentFixture<JsonLdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonLdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonLdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
