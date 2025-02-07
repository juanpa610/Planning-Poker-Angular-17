import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '@gameService';

@Component({
  selector: 'app-header-game',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './header-game.component.html',
  styleUrl: './header-game.component.scss',
})
export class HeaderGameComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  ngOnInit() {
  }

  getAcronyNameUser(): string {
    if (!this.gameService.nameUser) return 'EX';
    let nameCapitalized = '';
    const nameUserSplit = this.gameService.nameUser.split(' ');

    if (nameUserSplit.length >= 2) {
      nameCapitalized = nameUserSplit[0].charAt(0) + nameUserSplit[1].charAt(0);
    } else {
      
      nameCapitalized = this.gameService.nameUser.length > 1 
        ?  this.gameService.nameUser.substring(0,2)
        :  this.gameService.nameUser.substring(0,1) ;
    }
    return nameCapitalized;
  }

}
