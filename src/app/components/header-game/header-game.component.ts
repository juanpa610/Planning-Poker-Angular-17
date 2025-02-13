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

  userName: string = '';
  gameName: string = '';

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.getNames();
  }

  getNames() {
    this.gameService.userName$.subscribe((userName: string) => {
      this.userName = userName.trim();
    });

    this.gameService.gameName$.subscribe((gameName: string) => {
      this.gameName = gameName.trim();
    });
  }

  getAcronyUserName(): string {

    if (!this.userName) return 'EX';
    let nameCapitalized = '';
    const userNameSplit = this.userName.split(' ');

    if (userNameSplit.length >= 2) {
      nameCapitalized = userNameSplit[0].charAt(0) + userNameSplit[1].charAt(0);
    } else {

      nameCapitalized = this.userName.length > 1
        ? this.userName.substring(0, 2)
        : this.userName.substring(0, 1);
    }
    return nameCapitalized;
  }

}
