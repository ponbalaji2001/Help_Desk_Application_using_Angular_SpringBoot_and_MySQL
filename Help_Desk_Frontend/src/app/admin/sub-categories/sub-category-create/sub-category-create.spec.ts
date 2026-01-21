import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryCreate } from './sub-category-create';

describe('SubCategoryCreate', () => {
  let component: SubCategoryCreate;
  let fixture: ComponentFixture<SubCategoryCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
