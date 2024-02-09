import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordscrambleComponent } from './wordscramble.component';

describe('WordscrambleComponent', () => {
  let component: WordscrambleComponent;
  let fixture: ComponentFixture<WordscrambleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordscrambleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordscrambleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
