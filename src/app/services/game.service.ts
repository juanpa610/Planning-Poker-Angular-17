import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Card, Role, User } from '../interfaces/game.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _userName: string = 'loading';
  private _roleUser: Role = 'playerOwner';

  private _userNameSubject = new BehaviorSubject<string>(this._userName);
  userName$ = this._userNameSubject.asObservable();

  private _roleUserSubject = new BehaviorSubject<Role>(this._roleUser);
  roleUser$ = this._roleUserSubject.asObservable();

  private cardSubject = new Subject<Card>();
  cardScore$ = this.cardSubject.asObservable();

  private isSelectedcardSubject = new Subject<boolean>();
  isSelectedCar$ = this.isSelectedcardSubject.asObservable();

  private hasRevealedCardsSubject = new Subject<boolean>();
  hasRevealedCards$ = this.hasRevealedCardsSubject.asObservable();

  private gameNameSubject = new BehaviorSubject<string>('Sprint 32');
  gameName$ = this.gameNameSubject.asObservable();

  private _usersCardsScoreSubject = new Subject<User[]>();
  usersCardsScore$ = this._usersCardsScoreSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  newGame(gameName: string) {
    this.gameNameSubject.next(gameName);
  }

  setUserName(userName: string) {
    this._userNameSubject.next(userName);
  }

  setRevealCards(value: boolean) {
    this.hasRevealedCardsSubject.next(value);
  }

  setRoleUser(roleUser: Role) {
    this._roleUser = roleUser;
    this._roleUserSubject.next(roleUser);
  }

  get roleUser() {
    return this._roleUser;
  }

  setCartScore(card: Card) {
    this.cardSubject.next(card);
    this.isSelectedcardSubject.next(true);
  }

  resetIsSelectedCard(value: boolean) {
    this.isSelectedcardSubject.next(value);
  }

  sendUsersCardsScore(usersCards : User[]) {
    this._usersCardsScoreSubject.next(usersCards);
  }

  getUsersGame(): Observable<User[]> {
    return this.http.get<{ users: User[] }>('/../assets/files/users.json').pipe(
      map((response) =>
        response.users
      )
    )
  }

}
