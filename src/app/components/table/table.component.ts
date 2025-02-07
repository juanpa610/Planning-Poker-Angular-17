import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '@gameInterface';
import { GameService } from '@gameService';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {

  users: User[] = [];
  user: User = {
    id: 0,
    name: '',
    score: 0,
    role: 'player',
  };

  constructor(private gameService: GameService) { }

  async ngOnInit() {
    await this.getUsersToGame();

    this.addUserToListGame();
    this.gameService._nameUserscore$.subscribe((name) => {
      if (name !== 'loading') this.addUserToListGame();
    });

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
        this.users = users.map((_user: User) => {
          return _user
        });

        resolve();
      });
    });
  }

  addUserToListGame() {
    const idUser = this.users.length + 1;
    const nameUser = this.gameService.nameUser;

    const roleUser = this.gameService.roleUser;

    this.user = {
      id: idUser,
      score: 0,
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
