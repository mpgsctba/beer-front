import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBeerComponent } from './card-beer.component';

describe('CardBeerComponent', () => {
  let component: CardBeerComponent;
  let fixture: ComponentFixture<CardBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBeerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
