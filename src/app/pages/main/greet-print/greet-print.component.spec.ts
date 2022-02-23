import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetPrintComponent } from './greet-print.component';

describe('GreetPrintComponent', () => {
  let component: GreetPrintComponent;
  let fixture: ComponentFixture<GreetPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreetPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
