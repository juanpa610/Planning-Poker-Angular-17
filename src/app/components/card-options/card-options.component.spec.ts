

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardOptionsComponent } from './card-options.component';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';
import { By } from '@angular/platform-browser';
import { Card } from '@gameInterface';

describe('CardOptionsComponent', () => {
  let component: CardOptionsComponent;
  let fixture: ComponentFixture<CardOptionsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ CardOptionsComponent ],
      providers :  [
        {
          provide: GameService,
          useValue: gameServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render card options in the DOM',() => {
    fixture.detectChanges();

    let cardsContainer = fixture.debugElement.queryAll(By.css('.options__cards__button'));

    expect(cardsContainer).toBeTruthy();
    expect(cardsContainer.length).toBe(component.cardFibonacciOptions.length);
  });

  it('should end card to gameService ', () => {
    let cardMock: Card = {
      score: '☕',
      selected: false
    };

    component.selectCard(cardMock);

    expect(gameServiceMock.setCartScore).toHaveBeenCalledWith(cardMock);
  });

  it('should ', () => {
  
  });
  
  
});
