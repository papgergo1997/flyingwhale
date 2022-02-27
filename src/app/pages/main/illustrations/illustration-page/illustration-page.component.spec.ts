import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationPageComponent } from './illustration-page.component';

describe('IllustrationPageComponent', () => {
  let component: IllustrationPageComponent;
  let fixture: ComponentFixture<IllustrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
