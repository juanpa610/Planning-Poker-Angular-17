import { BehaviorSubject, of, Subject } from 'rxjs';
import * as users from '../users';
import { Card, Role, User } from '@gameInterface';


const _userNameSubject = new BehaviorSubject<string>('loading');
const _roleUserSubject = new BehaviorSubject<Role>('playerOwner');
const cardSubject = new Subject<Card>();
const isSelectedcardSubject = new Subject<boolean>();
const hasRevealedCardsSubject = new Subject<boolean>();
const gameNameSubject = new BehaviorSubject<string>('Sprint 32');
const _usersCardsScoreSubject = new Subject<User[]>();

export const gameServiceMock = {
    nameGame: 'Mock Game',
    nameUser: 'Mock User',
    users: users,
    _roleUser: 'playerOwner',
    _userNameSubject: _userNameSubject,
    userName$: _userNameSubject.asObservable(),
    cardSubject: cardSubject,
    cardScore$: cardSubject.asObservable(),
    _roleUserSubject: _roleUserSubject,
    roleUser$: _roleUserSubject.asObservable(),
    isSelectedcardSubject: isSelectedcardSubject,
    isSelectedCar$: isSelectedcardSubject.asObservable(),
    hasRevealedCardsSubject: hasRevealedCardsSubject,
    hasRevealedCards$: hasRevealedCardsSubject.asObservable(),
    gameNameSubject: gameNameSubject,
    gameName$: gameNameSubject.asObservable(),
    _usersCardsScoreSubject: _usersCardsScoreSubject,
    usersCardsScore$: _usersCardsScoreSubject.asObservable(),
    newGame: jest.fn((gameName: string) => {
        gameServiceMock.gameNameSubject.next(gameName);
    }),
    setUserName: jest.fn((name: string) => {
        gameServiceMock._userNameSubject!.next(name);
    }),
    setRevealCards: jest.fn((value: boolean) => {
        gameServiceMock.hasRevealedCardsSubject.next(value);
    }),
    setRoleUser: jest.fn((roleUser: Role) => {
        gameServiceMock._roleUser = roleUser;
        gameServiceMock._roleUserSubject.next(roleUser);
    }),
    roleUser: jest.fn(() => { }),
    setCartScore: jest.fn((card: Card) => {
        gameServiceMock.cardSubject!.next(card);
    }),
    resetIsSelectedCard: jest.fn((value: boolean) => {
        gameServiceMock.isSelectedcardSubject.next(value);
    }),
    sendUsersCardsScore: jest.fn((usersCards: User[]) => {
        gameServiceMock._usersCardsScoreSubject.next(usersCards);
    }),
    getUsersGame: jest.fn().mockReturnValue(of('./users.json')),
};

gameServiceMock.roleUser = jest.fn().mockReturnValue(gameServiceMock._roleUser);