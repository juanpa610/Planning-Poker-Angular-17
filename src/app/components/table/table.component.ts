import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Card, User } from '@gameInterface';
import { GameService } from '@gameService';
import { LoadingService } from '@loadingService';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {

  hasRevealCards: boolean = false;
  isSelectCard: boolean = false;
  usersBack: User[] = [];
  users: User[] = [];
  nameUser: string = '';
  user: User = {
    id: 0,
    name: '',
    score: '0',
    role: 'player',
  };

  constructor(private gameService: GameService, private loadingService: LoadingService) { }

  async ngOnInit() {
    await this.getUsersToGame();

    this.gameService.isSelectedCar$.subscribe((value: boolean) => {
      this.isSelectCard = value;
    });

    this.gameService.userName$.subscribe((naUser) => {
      this.nameUser = naUser;
      this.users = [];
      this.addUserToListGame();
    });

    this.gameService.cardScore$.subscribe((card: Card) => {
      this.setScoreUser(card);
    });
  }

  setScoreUser(card: Card) {
    this.users.filter((user) => {
      if (user.role == 'playerOwner') {
        user.score = card.score;
      }
    });
  }

  revealCards() {
    this.loadingService.show();
    setTimeout(() => {
      this.hasRevealCards = true;
      this.gameService.setRevealCards(this.hasRevealCards);
      this.gameService.sendUsersCardsScore(this.users);
      this.loadingService.hide();
    }, 1000);
  }

  newGame () {
    this.loadingService.show();
    setTimeout(() => {
      this.hasRevealCards = false;
      this.gameService.setRevealCards(this.hasRevealCards);
      this.loadingService.hide();
      this.gameService.resetIsSelectedCard(this.hasRevealCards);
    }, 1000);
  }

  getAcronyNameUser(name: string): string {
    if (!name) return 'EX';
    let nameCapitalized = '';
    const nameUserSplit = name.split(' ');

    if (nameUserSplit.length >= 2) {
      nameCapitalized = nameUserSplit[0].charAt(0) + nameUserSplit[1].charAt(0);
    } else {

      nameCapitalized = name.length > 1
        ? name.substring(0, 2)
        : name.substring(0, 1);
    }
    return nameCapitalized;
  }

  getUsersToGame() {
    return new Promise<void>((resolve, reject) => {
      this.gameService.getUsersGame().subscribe((users: User[]) => {
        this.usersBack = users.map((_user: User) => {
          return _user
        });

        resolve();
      });
    });
  }

  addUserToListGame() {
    this.users = [...this.usersBack];

    const idUser = this.users.length + 1;
    let nameUser = this.nameUser;
    const roleUser = this.gameService.roleUser;

    this.user = {
      id: idUser,
      score: '0',
      name: nameUser,
      role: roleUser,
    }

    this.users.push(this.user);
    this.setClassNameUsers();
  }

  setClassNameUsers() {
    let userCopy = [...this.users];

    const userViewer = userCopy.filter((user: User) => user.role == 'viewer');
    const userOwner = userCopy.filter((user: User) => user.role == 'playerOwner');

    let listUserWithoutViewer = this.users.splice(this.users.indexOf(userViewer[0]), 1);
    let listUserWithoutOwner = this.users.splice(this.users.indexOf(userOwner[0]), 1);

    this.users.push(listUserWithoutViewer[0], listUserWithoutOwner[0]);

    this.users.map((user: User, i) => {
      user.className = `table-poker__card--${user.role}`
      if (user.role === 'player') user.className = `${user.className} nth-child-${i + 1}`;
    });

  }

}
