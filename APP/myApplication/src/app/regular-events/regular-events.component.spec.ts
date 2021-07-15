import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularEventsComponent } from './regular-events.component';

describe('RegularEventsComponent', () => {
  let component: RegularEventsComponent;
  let fixture: ComponentFixture<RegularEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
