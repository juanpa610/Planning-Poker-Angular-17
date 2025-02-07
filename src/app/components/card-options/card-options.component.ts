import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from '@gameInterface';
import { GameService } from '@gameService';

@Component({
  selector: 'app-card-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-options.component.html',
  styleUrl: './card-options.component.scss',
})
export class CardOptionsComponent  implements OnInit {

  cardFibonacciOptions: Card[] = [
    { score: '0'  },
    { score: '1'  },
    { score: '3'  },
    { score: '5'  },
    { score: '8'  },
    { score: '13' },
    { score: '21' },
    { score: '34' },
    { score: '55' },
    { score: '89' },
    { score: '?'  },
    { score: '☕' },
  ];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    // this.selectCardRandom();
  }

  selectCard( card : Card) {
    this.gameService.setCartScore(card)
  }


  selectCardRandom() {
    const indexRandom = Math.floor(Math.random() * this.cardFibonacciOptions.length);
    const score = this.cardFibonacciOptions[indexRandom].score;
    const scoreFinal = score == '?' || score == '☕' ? score : parseInt(score);
    // console.log(scoreFinal);
  }

}
