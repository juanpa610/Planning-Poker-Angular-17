import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Card, Role, User } from '../interfaces/game.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _nameGame : string = 'Sprint 32';
  private _nameUser : string = 'loading';
  private _roleUser : Role = 'playerOwner';

  private _nameUserSubject = new BehaviorSubject<string>(this._nameUser); 
  _nameUserscore$ = this._nameUserSubject.asObservable();

  private cardSubject = new Subject<Card>(); 
  cardScore$ = this.cardSubject.asObservable();

  constructor(private http: HttpClient ) { 
  }

  newGame(nameGame: string) {
    this._nameGame = nameGame;
  }
  
  get nameGame () {
    return this._nameGame;
  }
  setNameUser(nameUser: string) {
    this._nameUser = nameUser;
    this._nameUserSubject.next(this._nameUser);
  }
  
  get nameUser () {
    return this._nameUser;
  }

  setRoleUser(roleUser: Role) {
    this._roleUser = roleUser;
  }

  get roleUser () {
    return this._roleUser;
  }

  setCartScore(card: Card) {
    this.cardSubject.next(card);
  }

  getUsersGame() : Observable<User[]>{
    return this.http.get<{ users: User[] }>('/../assets/files/users.json').pipe(
      map((response) =>
        response.users
      )
    )
  }

}
