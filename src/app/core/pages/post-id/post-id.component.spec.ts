import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIdComponent } from './post-id.component';

describe('PostIdComponent', () => {
  let component: PostIdComponent;
  let fixture: ComponentFixture<PostIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostIdComponent]
    });
    fixture = TestBed.createComponent(PostIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
