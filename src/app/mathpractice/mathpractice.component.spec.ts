import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathpracticeComponent } from './mathpractice.component';

describe('MathpracticeComponent', () => {
  let component: MathpracticeComponent;
  let fixture: ComponentFixture<MathpracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathpracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
