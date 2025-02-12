import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Card, Role, User } from '@gameInterface';
import { users } from '../mocks/users';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(service.roleUser).toBe('playerOwner')
  });

  it('should set new game name', () => {
    const newGame = 'Sprint 33';
    
    let spynewGame = jest.spyOn(service, 'newGame');
    
    service.newGame(newGame);
    service.gameName$.subscribe((game) => {
      expect(game).toBe(newGame);
    })
    expect(spynewGame).toHaveBeenCalledWith(newGame);
  });

  it('should update name user and emit new value', () => {
    const newName = 'Sprint 33';

    service.userName$.subscribe((name) => {
      expect(name).toBe(newName);
    });

    service.setUserName(newName);
  });

  it('should set role user', () => {
    const newRole: Role = 'player';

    let spySetRoleUser = jest.spyOn(service, 'setRoleUser');

    service.setRoleUser(newRole);
    expect(service.roleUser).toBe(newRole);
    expect(spySetRoleUser).toHaveBeenCalledWith(newRole);
  });

  it('should meit card score ', () => {
    let cardMock: Card = {
      score: '5',
      selected : false
    }

    service.cardScore$.subscribe((card) => {
      expect(card).toEqual(cardMock);
    });

    service.setCartScore(cardMock);
  });

  it('should ', () => {
    let usersMock : User[] = users.users;
    service.getUsersGame().subscribe((users) =>  {
      expect(users.length).toEqual(usersMock.length);
    });

    let req = httpMock.expectOne('/../assets/files/users.json');

    expect(req.request.method).toBe('GET');
    req.flush(usersMock);
  });

});
