import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpracticeComponent } from './wordpractice.component';

describe('WordpracticeComponent', () => {
  let component: WordpracticeComponent;
  let fixture: ComponentFixture<WordpracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordpracticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
