import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBarComponent } from './slider-bar.component';

describe('SliderBarComponent', () => {
  let component: SliderBarComponent;
  let fixture: ComponentFixture<SliderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
