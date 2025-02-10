import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card, Role, User } from '@gameInterface';
import { GameService } from '@gameService';

@Component({
  selector: 'app-card-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-options.component.html',
  styleUrl: './card-options.component.scss',
})
export class CardOptionsComponent implements OnInit {

  rolUser: Role = 'player';
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

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.roleUser$.subscribe((roleUser) => {
      this.rolUser = roleUser;
    });

    this.gameService.hasRevealedCards$.subscribe((value) => {
      this.hasRevealedCards = value;

      this.gameService.usersCardsScore$.subscribe((usersCards: User[]) => {
        this.calculateAverageCards(usersCards)
      });
    });
  }

  selectCard(card: Card) {
    let curentSelectedCard = this.cardFibonacciOptions.find(card => card.selected);
    // if (curentSelectedCard) curentSelectedCard.selected = false;
    if (curentSelectedCard) {
      let indexSelectedCard = this.cardFibonacciOptions.indexOf(curentSelectedCard);
      this.cardFibonacciOptions[indexSelectedCard]!.selected = false;
    }
    card.selected = true;
    this.gameService.setCartScore(card);
  }

  selectCardRandom() {
    const indexRandom = Math.floor(Math.random() * this.cardFibonacciOptions.length);
    const score = this.cardFibonacciOptions[indexRandom].score;
    const scoreFinal = score == '?' || score == '☕' ? score : parseInt(score);
    // console.log(scoreFinal);
  }

  calculateAverageCards(usersCards: User[]) {
    let scores = usersCards
      .filter(users => users.role != 'viewer')
      .map(user => Number(user.score));

    console.log(scores)

    let sumScores: number = scores.reduce((sum, score) => sum + score, 0);
    let average = sumScores / scores.length;

    const scoresCount: Record<string, number> = {};

    scores.forEach(score => {
      if (scoresCount[score]) {
        scoresCount[score] = scoresCount[score] + 1
      } else {
        scoresCount[score] = 1
      }
    });

    console.log(scoresCount,  average.toFixed(2));

    // TODO: Validar cuando es NaN OJO
  }

}
