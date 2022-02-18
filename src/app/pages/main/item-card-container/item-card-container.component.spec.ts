import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardContainerComponent } from './item-card-container.component';

describe('ItemCardContainerComponent', () => {
  let component: ItemCardContainerComponent;
  let fixture: ComponentFixture<ItemCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
