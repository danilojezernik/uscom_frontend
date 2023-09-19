import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostComponent } from './dialog-post.component';

describe('DialogComponent', () => {
  let component: DialogPostComponent;
  let fixture: ComponentFixture<DialogPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogPostComponent]
    });
    fixture = TestBed.createComponent(DialogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
