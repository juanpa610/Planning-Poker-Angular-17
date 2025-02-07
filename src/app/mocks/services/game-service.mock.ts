import { BehaviorSubject, of, Subject } from 'rxjs';
import * as users  from '../users';
import { Card } from '@gameInterface';


const nameUserSubjectnew = new BehaviorSubject<string>('loading');
const cardSubject = new Subject<Card>(); 
  

export const gameServiceMock = {
    nameGame: 'Mock Game',
    nameUser: 'Mock User',
    users: users,
    roleUser: 'playerOwner',
    _nameUserSubject: nameUserSubjectnew ,
    _nameUserscore$: nameUserSubjectnew.asObservable(),
    cardSubject : cardSubject,
    cardScore$ : cardSubject.asObservable(),
    someMethod: jest.fn().mockReturnValue('Mock Value'),
    anotherMethod: jest.fn().mockResolvedValue('Mock Async Value'),
    getUsersGame : jest.fn().mockReturnValue(of('./users.json')),
    setCartScore : jest.fn((card: Card) => {
        gameServiceMock.cardSubject!.next(card); 
    }),
    setNameUser: jest.fn((name: string) => {
        gameServiceMock._nameUserSubject!.next(name); 
    }),
};