import { BehaviorSubject, of } from 'rxjs';
import * as users  from '../users';


const  nameUserSubjectnew = new BehaviorSubject<string>('loading');

export const gameServiceMock = {
    nameGame: 'Mock Game',
    nameUser: 'Mock User',
    users: users,
    roleUser: 'playerOwner',
    someMethod: jest.fn().mockReturnValue('Mock Value'),
    anotherMethod: jest.fn().mockResolvedValue('Mock Async Value'),
    getUsersGame : jest.fn().mockReturnValue(of('./users.json')),

    _nameUserSubject: nameUserSubjectnew ,
    _nameUserscore$: nameUserSubjectnew.asObservable(),

    setNameUser: jest.fn((name: string) => {
        gameServiceMock._nameUserSubject!.next(name); 
    }),
};