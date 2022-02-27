import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TShirtPageComponent } from './t-shirt-page.component';

describe('TShirtPageComponent', () => {
  let component: TShirtPageComponent;
  let fixture: ComponentFixture<TShirtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TShirtPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TShirtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
