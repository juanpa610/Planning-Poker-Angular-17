import { BehaviorSubject } from "rxjs";

const  loadingSubject = new BehaviorSubject<string>('loading');

export const loadingServiceMock = {
    loadingSubject: loadingSubject ,
    loading$: loadingSubject.asObservable(),

    show: jest.fn((name: string) => {
        loadingServiceMock.loadingSubject.next(name); 
    }),
    hide: jest.fn((name: string) => {
        loadingServiceMock.loadingSubject.next(name); 
    })
};