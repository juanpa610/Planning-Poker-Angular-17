import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card, Role, User } from '@gameInterface';
import { GameService } from '@gameService';


interface Score {
  [key: string]: number
}

@Component({
  selector: 'app-card-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-options.component.html',
  styleUrl: './card-options.component.scss',
})
export class CardOptionsComponent implements OnInit {

  roleUser: Role = 'player';
  hasRevealedCards: boolean = false;
  cardFibonacciOptions: Card[] = [
    { score: '0', selected: false },
    { score: '1', selected: false },
    { score: '3', selected: false },
    { score: '5', selected: false },
    { score: '8', selected: false },
    { score: '13', selected: false },
    { score: '21', selected: false },
    { score: '34', selected: false },
    { score: '55', selected: false },
    { score: '89', selected: false },
    { score: '?', selected: false },
    { score: '☕', selected: false }
  ];
  averageScore: number | string = 0;
  scoreCount: Score = {};
  scoreQuestion: string[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.roleUser$.subscribe((roleUser) => {
      this.roleUser = roleUser;
    });

    this.gameService.hasRevealedCards$.subscribe((hasRevealedCard) => {
      this.hasRevealedCards = hasRevealedCard;
      if (hasRevealedCard) {
        this.gameService.usersCardsScore$.subscribe((usersCards: User[]) => {
          this.calculateAverageCards(usersCards)
        });
      } else {
        for (let index = 0; index < this.cardFibonacciOptions.length; index++) {
          this.cardFibonacciOptions[index].selected = false;
        }
      }
    });
  }

  selectCard(card: Card) {
    card.selected = true;
    this.gameService.setCartScore(card);
  }

  calculateAverageCards(usersCards: User[]) {
    let usersCardsToFilter = [...usersCards.filter(users => users.role != 'viewer')];

    let scoreCoffeeBreak = usersCardsToFilter.filter(users => users.score == '☕');
    this.scoreQuestion = usersCardsToFilter
      .filter((users: User) => users.score == '?')
      .map(user => user.score);

      console.log(this.scoreQuestion)

    let scoresNumbers = usersCardsToFilter
      .filter(users => users.score != '?' && users.score != '☕')
      .map(user => Number(user.score));

    let sumScores: number = scoresNumbers.reduce((sum, score) => sum + score, 0);
    let average = sumScores / scoresNumbers.length;

    this.averageScore = scoreCoffeeBreak.length ? 'Coffee break!' : average.toFixed(2);

    const scoreCount: Record<string, number> = {};

    scoresNumbers.forEach(score => {
      if (scoreCount[score]) {
        scoreCount[score] = scoreCount[score] + 1;
      } else {
        scoreCount[score] = 1;
      }
    });

    this.scoreCount = scoreCount;
  }
}
