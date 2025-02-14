

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardOptionsComponent } from './card-options.component';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';
import { By } from '@angular/platform-browser';
import { Card, User } from '@gameInterface';
import { users } from '../../mocks/users';

describe('CardOptionsComponent', () => {
  let component: CardOptionsComponent;
  let fixture: ComponentFixture<CardOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionsComponent],
      providers: [
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

  it('should assing role user through the observable roleUser$', () => {
    fixture.detectChanges();
    gameServiceMock.setRoleUser('viewer');

    expect(component.roleUser).toBe('viewer');
  });

  it('should assing flag hasRevealedCards through the observable hasRevealedCards$', () => {
    jest.spyOn(component, 'calculateAverageCards');

    fixture.detectChanges();

    const revealCards = true;
    const usersCards: User[] = users.users;
    gameServiceMock.setRevealCards(revealCards);
    gameServiceMock.sendUsersCardsScore(usersCards);

    expect(component.hasRevealedCards).toBe(true);
    expect(component.calculateAverageCards).toHaveBeenCalledWith(usersCards);
  });

  it('should unselect all cardFibonacciOptions when hasRevealedCards$ is false', () => {
    gameServiceMock.setRevealCards(false);

    fixture.detectChanges();
    expect(component.hasRevealedCards).toBe(false);

    component.cardFibonacciOptions.forEach((card) => {
      expect(card.selected).toBe(false);
    });
  });

  it('should render card options in the DOM', () => {
    fixture.detectChanges();

    let cardsContainer = fixture.debugElement.queryAll(By.css('.options__cards__button'));

    expect(cardsContainer).toBeTruthy();
    expect(cardsContainer.length).toBe(component.cardFibonacciOptions.length);
  });

  it('should set card.selected to true and send card to gameService ', () => {
    let cardMock: Card = {
      score: '☕',
      selected: false
    };

    component.selectCard(cardMock);
    expect(cardMock.selected).toBeTruthy();
    expect(gameServiceMock.setCartScore).toHaveBeenCalledWith(cardMock);
  });

   it('should calculate the correct average and score count', () => {
    const usersCards: User[] = [
      {"id": 1,"score": '3',"name": "Oscar","role" : "viewer"},
      {"id": 1,"score": '3',"name": "Oscar","role" : "player"},
      {"id": 1,"score": '5',"name": "Oscar","role" : "player"},
      {"id": 1,"score": '?',"name": "Oscar","role" : "player"},
      {"id": 1,"score": '☕',"name": "Oscar","role" : "player"}
    ];

    component.calculateAverageCards(usersCards);
    expect(component.scoreQuestion).toEqual(['?']);
    expect(component.averageScore).toBe('Coffee break!');
    expect(component.scoreCount).toEqual({
      '3': 1,
      '5': 1
    });
  });

  it('should calculate the correct average when no coffee break is present', () => {
    const usersCards: User[] = [
      {"id": 1,"score": '1',"name": "Oscar","role" : "viewer"},
      {"id": 1,"score": '0',"name": "Oscar","role" : "player"},
      {"id": 1,"score": '1',"name": "Oscar","role" : "player"},
      {"id": 1,"score": '?',"name": "Oscar","role" : "player"},
      {"id": 1,"score": '5',"name": "Oscar","role" : "player"}
    ];

    component.calculateAverageCards(usersCards);

    expect(component.scoreQuestion).toEqual(['?']);
    expect(component.averageScore).toBe('2.00');
    expect(component.scoreCount).toEqual({
      '1': 1,
      '0': 1,
      '5': 1
    });
  });

});
