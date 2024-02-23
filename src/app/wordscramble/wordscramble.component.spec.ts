import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordscrambleComponent } from './wordscramble.component';

describe('WordscrambleComponent', () => {
  let component: WordscrambleComponent;
  let fixture: ComponentFixture<WordscrambleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordscrambleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordscrambleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
