import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankfillerComponent } from './blankfiller.component';

describe('BlankfillerComponent', () => {
  let component: BlankfillerComponent;
  let fixture: ComponentFixture<BlankfillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankfillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankfillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
